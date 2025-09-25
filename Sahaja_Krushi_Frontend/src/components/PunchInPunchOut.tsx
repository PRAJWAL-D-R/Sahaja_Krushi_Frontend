import React, { useEffect, useState } from "react";
import { Clock, ChevronDown, CheckCircle } from "lucide-react";
import {
  employeePunchingDetails,
  punchAttendance,
} from "../lib/network/attendanceApi";
import SuccessModal from "./SuccessModel";
import ErrorModal from "./ErrorModal";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { formatReadableDate } from "../lib/utils";
import {
  startLoading,
  stopLoading,
} from "../store/features/globalConstant/loadingSlice";
import { EmployeePunchingContent } from "../lib/interface/attendance";
import usesessionStorageUserData from "../lib/hooks/useLocalStorageUserData";

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatDuration = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hrs ${minutes} min`;
};

type AttendanceLog = {
  id: number;
  attendanceId: number;
  date: string;
  shiftId: number | null;
  deviceId: number | null;
  recordType: string;
  punchType: "PunchIn" | "PunchOut";
  createdAt: string;
  updatedAt: string;
};

const PunchInPunchOut: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employeeId: localEmployeeId } = usesessionStorageUserData();
  const [isPunchedIn, setIsPunchedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [showAttendanceLogs, setShowAttendanceLogs] = React.useState(false);

  const [attendanceDataFromApi, setAttendanceDataFromApi] =
    useState<EmployeePunchingContent>();

  // Success modal state
  const [successModal, setSuccessModal] = React.useState<{
    open: boolean;
    title: string;
    subtitle?: string;
  }>({
    open: false,
    title: "",
    subtitle: "",
  });

  // Error modal state
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    title: string;
    subtitle?: string;
  }>({
    open: false,
    title: "",
    subtitle: "",
  });

  // Effect to fetch attendance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const response = await employeePunchingDetails(localEmployeeId);
        setAttendanceDataFromApi(response.content);

        // Set punch in status based on API data
        if (
          response.content &&
          response.content.punchInTime &&
          !response.content.punchOutTime
        ) {
          setIsPunchedIn(true);
        } else {
          setIsPunchedIn(false);
        }
      } catch (error) {
        console.log("errors", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch, localEmployeeId]);

  function calculateTotalWorkDuration(logs: AttendanceLog[]): string {
    // Sort logs by date
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let totalMilliseconds = 0;
    let lastPunchIn: Date | null = null;

    for (const log of sortedLogs) {
      if (log.punchType === "PunchIn") {
        lastPunchIn = new Date(log.date);
      } else if (log.punchType === "PunchOut" && lastPunchIn) {
        const punchOut = new Date(log.date);
        totalMilliseconds += punchOut.getTime() - lastPunchIn.getTime();
        lastPunchIn = null;
      }
    }

    // Convert milliseconds to hours, minutes, seconds
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  // Update current duration if punched in
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPunchedIn && attendanceDataFromApi?.punchInTime) {
      interval = setInterval(() => {
        // Force a re-render to update the duration display
        setAttendanceDataFromApi({ ...attendanceDataFromApi });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPunchedIn, attendanceDataFromApi]);

  const handlePunchIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    const now = new Date();
    try {
      const res = await punchAttendance(
        {
          date: now.toISOString(),
          deviceId: null,
          recordType: "Manual",
          punchType: "PunchIn",
        },
        localEmployeeId
      );
      if (res.success) {
        // Fetch updated attendance data after punch in
        const response = await employeePunchingDetails(localEmployeeId);
        setAttendanceDataFromApi(response.content);
        setIsPunchedIn(true);
        setSuccessModal({
          open: true,
          title: "Punch In Successful",
          subtitle: "🕒 Your punch-in has been recorded.",
        });
      } else {
        setErrorModal({
          open: true,
          title: "Punch In Failed",
          subtitle: res.message || "Failed to record punch in.",
        });
      }
    } catch (err: Error | unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to record punch in.";
      setErrorModal({
        open: true,
        title: "Punch In Failed",
        subtitle: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePunchOut = async () => {
    if (!attendanceDataFromApi?.punchInTime) return;
    setLoading(true);
    setErrorMsg(null);
    const now = new Date();
    try {
      const res = await punchAttendance(
        {
          date: now.toISOString(),
          deviceId: null,
          recordType: "Manual",
          punchType: "PunchOut",
        },
        localEmployeeId
      );
      if (res.success) {
        // Fetch updated attendance data after punch out
        const response = await employeePunchingDetails(localEmployeeId);
        setAttendanceDataFromApi(response.content);
        setIsPunchedIn(false);
        setSuccessModal({
          open: true,
          title: "Punch Out Successful",
          subtitle: "🔴 Your punch out has been recorded.",
        });
      } else {
        setErrorModal({
          open: true,
          title: "Punch Out Failed",
          subtitle: res.message || "Failed to record punch out.",
        });
      }
    } catch (err: Error | unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to record punch out.";
      setErrorModal({
        open: true,
        title: "Punch Out Failed",
        subtitle: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate working duration based on punch in time
  const calculateWorkingDuration = () => {
    if (!attendanceDataFromApi?.punchInTime) return 0;
    const punchInTime = new Date(attendanceDataFromApi.punchInTime);
    const now = new Date();
    return now.getTime() - punchInTime.getTime();
  };

  // Format punch in time from API data
  const formattedPunchInTime = attendanceDataFromApi?.punchInTime
    ? formatTime(new Date(attendanceDataFromApi.punchInTime))
    : "--:--";

  return (
    <>
      <SuccessModal
        isOpen={successModal.open}
        title={successModal.title}
        subtitle={successModal.subtitle}
        confirmText="OK"
        onConfirm={() => setSuccessModal({ ...successModal, open: false })}
        onClose={() => setSuccessModal({ ...successModal, open: false })}
      />
      <ErrorModal
        isOpen={errorModal.open}
        title={errorModal.title}
        subtitle={errorModal.subtitle}
        confirmText="OK"
        onConfirm={() => setErrorModal({ ...errorModal, open: false })}
        onClose={() => setErrorModal({ ...errorModal, open: false })}
      />
      <div className="rounded-2xl border border-orange-200 bg-orange-50 shadow-sm overflow-hidden mt-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Clock className="mr-2 text-orange-500" />
              Attendance
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isPunchedIn
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {isPunchedIn ? "Working" : "Not Punched"}
            </span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full bg-white border-4 border-orange-100 flex items-center justify-center shadow">
              <div className="text-center p-2">
                <p className="text-sm text-gray-500 font-medium">Total Hours</p>
                <p className="text-2xl font-bold text-gray-800">
                  {calculateTotalWorkDuration(
                    attendanceDataFromApi?.attendanceLogsId || []
                  )}
                </p>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-3 text-center text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {isPunchedIn ? (
            <div className="mb-3 text-center text-sm">
              <div className="flex justify-center items-center space-x-2 text-green-600 mb-1">
                <CheckCircle size={18} />
                <span className="font-medium">
                  Punched In at {formattedPunchInTime}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Working duration: {formatDuration(calculateWorkingDuration())}
              </p>
            </div>
          ) : (
            <div className="mb-3 text-center text-sm">
              <div className="flex justify-center items-center space-x-2 text-gray-600">
                <Clock size={18} />
                <span className="font-medium">Not Punched</span>
              </div>
            </div>
          )}

          <button
            onClick={isPunchedIn ? handlePunchOut : handlePunchIn}
            className={`w-full py-2 text-base rounded-lg text-white font-semibold transition-colors ${
              isPunchedIn
                ? "bg-red-500 hover:bg-red-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={loading}
          >
            {loading
              ? isPunchedIn
                ? "Punching Out..."
                : "Punching In..."
              : isPunchedIn
              ? "Punch Out"
              : "Punch In"}
          </button>
        </div>

        {attendanceDataFromApi?.attendanceLogsId &&
          attendanceDataFromApi.attendanceLogsId.length > 0 && (
            <div className="border-t border-orange-200">
              <button
                onClick={() => setShowAttendanceLogs(!showAttendanceLogs)}
                className="flex items-center justify-between w-full px-5 py-3 bg-orange-100 text-gray-700 text-sm font-semibold hover:bg-orange-200 transition-colors"
              >
                <span>Attendance Logs</span>
                <ChevronDown
                  className={`transform transition-transform ${
                    showAttendanceLogs ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showAttendanceLogs && (
                <div className="px-5 py-4 bg-white">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                            Record Type
                          </th>
                          <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {attendanceDataFromApi.attendanceLogsId.map(
                          (log, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-gray-900">
                                {formatReadableDate(log.date, "date-only")}
                              </td>
                              <td className="px-4 py-2 text-gray-600">
                                {log.punchType}
                              </td>
                              <td className="px-4 py-2 text-gray-600">
                                {log.recordType}
                              </td>
                              <td className="px-4 py-2 text-gray-600">
                                {formatTime(new Date(log.date))}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default PunchInPunchOut;
