import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit } from "lucide-react";
import TextField from "./TextField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import ButtonPrimary from "./ButtonPrimary";
import ErrorModal from "./ErrorModal";
import SuccessModel from "./SuccessModel";
import LoadingOverlay from "./LoadingOverlay";
import DynamicTable from "./DynamicTable";
import { Tag } from "antd";
import { Tooltip } from "antd";

interface AssetRequest {
  id: string;
  assetName: string;
  employeeCode: string;
  reason: string;
  priority: string;
  status: string;
  createdAt: string;
}

interface RequestNewAssetProps {
  className?: string;
}

const RequestNewAsset: React.FC<RequestNewAssetProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    assetName: "",
    employeeCode: "",
    reason: "",
    priority: "medium",
    status: "pending"
  });

  const [errors, setErrors] = useState({
    assetName: "",
    employeeCode: "",
    reason: "",
    priority: ""
  });

  // Dummy data for demonstration
  const dummyRequests: AssetRequest[] = [
    {
      id: "1",
      assetName: "Laptop",
      employeeCode: "EMP001",
      reason: "New hire equipment",
      priority: "high",
      status: "pending",
      createdAt: "2024-03-15T10:00:00Z"
    },
    {
      id: "2",
      assetName: "Monitor",
      employeeCode: "EMP002",
      reason: "Replacement for damaged screen",
      priority: "medium",
      status: "approved",
      createdAt: "2024-03-14T15:30:00Z"
    },
    {
      id: "3",
      assetName: "Headphones",
      employeeCode: "EMP003",
      reason: "For remote work",
      priority: "low",
      status: "rejected",
      createdAt: "2024-03-13T09:15:00Z"
    }
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];

  const columns = [
    {
      key: "sno",
      label: "SlNo",
      render: (_: any, __: any, index: number) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      key: "assetName",
      label: "Asset Name",
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text.length > 15 ? text.substring(0, 15) + "..." : text}</span>
        </Tooltip>
      ),
    },
    {
      key: "employeeCode",
      label: "Employee Code",
    },
    {
      key: "reason",
      label: "Reason",
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text.length > 30 ? text.substring(0, 30) + "..." : text}</span>
        </Tooltip>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (priority: string) => (
        <Tag
          color={
            priority === "high"
              ? "red"
              : priority === "medium"
              ? "orange"
              : "green"
          }
          className="px-3 py-1 rounded-full capitalize"
        >
          {priority}
        </Tag>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (status: string) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "rejected"
              ? "red"
              : "blue"
          }
          className="px-3 py-1 rounded-full capitalize"
        >
          {status}
        </Tag>
      ),
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, record: AssetRequest) => (
        <div className="flex gap-3">
          <Tooltip title="View">
            <Eye
              onClick={() => handleViewRequest(record.id)}
              className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-500"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Edit
              onClick={() => handleEditRequest(record.id)}
              className="w-5 h-5 cursor-pointer text-gray-600 hover:text-green-500"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleViewRequest = (id: string) => {
    navigate(`/admin/assets/request/${id}`);
  };

  const handleEditRequest = (id: string) => {
    navigate(`/admin/assets/request/${id}/edit`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      assetName: "",
      employeeCode: "",
      reason: "",
      priority: ""
    };

    if (!formData.assetName.trim()) {
      newErrors.assetName = "Asset name is required";
    }
    if (!formData.employeeCode.trim()) {
      newErrors.employeeCode = "Employee code is required";
    }
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
    }
    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/asset-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit asset request");
      }

      setShowSuccessModal(true);
      setFormData({
        assetName: "",
        employeeCode: "",
        reason: "",
        priority: "medium",
        status: "pending"
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Asset Requests</h2>
       <ButtonPrimary
          onClick={() => navigate("/admin/assets/request/new")}
          className="flex items-center"
          text="New Request"
        />
      </div>

      <div className="mb-6">
        <DynamicTable
          columns={columns}
          data={dummyRequests}
          pagination={{
            current: currentPage,
            total: dummyRequests.length,
            pageSize: pageSize,
          }}
          onPageChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          rowKey="id"
        />
      </div>

<LoadingOverlay isLoading={isLoading} />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title={errorMessage}
      />

      <SuccessModel
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/admin/assets/requests");
        }}
        title="Asset request submitted successfully"
      />
    </div>
  );
};

export default RequestNewAsset; 