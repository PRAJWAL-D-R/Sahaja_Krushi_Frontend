import React, { useEffect, useMemo, useState } from "react";
import DynamicTable from "../../components/DynamicTable";
import { farmerApi } from "../../lib/network/FarmerApi";
import SuccessModal from "../../components/SuccessModel";
import ErrorModal from "../../components/ErrorModal";

type Farmer = {
  id: number;
  farmerId: string;
  fullName: string;
  contactNumber: string;
  state: string;
  district: string;
  village: string;
  registrationDate?: string;
  address?: string;
  aadharNumber?: string;
  email?: string;
};

const PAGE_SIZE = 10;

const FarmerManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [search, setSearch] = useState("");

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Farmer | null>(null);
  const [editForm, setEditForm] = useState<Partial<Farmer>>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState<{ message: string; path?: (string | number)[] }[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState<Farmer | null>(null);

  const fetchFarmers = async (opts?: { page?: number; search?: string }) => {
    try {
      setLoading(true);
      const { data } = await farmerApi.list({ page: opts?.page || page, limit: PAGE_SIZE, search: opts?.search ?? search });
      setFarmers(data.farmers || []);
      setTotal(data.totalCount || 0);
    } catch (e: any) {
      console.error("Failed to load farmers", e?.message || e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(() => {
    return [
      { key: "farmerId", label: "Farmer ID", sortable: true },
      { key: "fullName", label: "Full Name", sortable: true },
      { key: "contactNumber", label: "Contact", sortable: true },
      { key: "state", label: "State", sortable: true },
      { key: "district", label: "District", sortable: true },
      {
        key: "registrationDate",
        label: "Registered On",
        render: (_: any, record: Farmer) =>
          record.registrationDate ? new Date(record.registrationDate).toLocaleDateString() : "-",
      },
      {
        key: "actions",
        label: "Actions",
        render: (_: any, record: Farmer) => (
          <div className="flex gap-2">
            <button
              className="action-icon px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(record);
                setViewOpen(true);
              }}
            >
              View
            </button>
            <button
              className="action-icon px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-sm"
              onClick={async (e) => {
                e.stopPropagation();
                // Optionally refetch by ID for latest
                try {
                  const res = await farmerApi.getById(record.id);
                  setSelected(res.data);
                  setEditForm({
                    fullName: res.data.fullName,
                    contactNumber: res.data.contactNumber,
                    address: res.data.address,
                    state: res.data.state,
                    district: res.data.district,
                    village: res.data.village,
                  });
                } catch (_) {
                  setSelected(record);
                  setEditForm({
                    fullName: record.fullName,
                    contactNumber: record.contactNumber,
                    address: record.address,
                    state: record.state,
                    district: record.district,
                    village: record.village,
                  });
                }
                setEditOpen(true);
              }}
            >
              Edit
            </button>
            <button
              className="action-icon px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              onClick={async (e) => {
                e.stopPropagation();
                if (!record?.id) return;
                setToDelete(record);
                setShowConfirm(true);
              }}
            >
              {deletingId === record.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ),
      },
    ];
  }, [search, deletingId]);

  const onPageChange = (nextPage: number) => {
    setPage(nextPage);
    fetchFarmers({ page: nextPage });
  };

  const handleSave = async () => {
    if (!selected) return;
    try {
      setSaving(true);
      await farmerApi.update(selected.id, {
        fullName: editForm.fullName as string,
        contactNumber: editForm.contactNumber as string,
        address: editForm.address as string,
        state: editForm.state as string,
        district: editForm.district as string,
        village: editForm.village as string,
      } as any);
      setEditOpen(false);
      await fetchFarmers();
    } catch (e: any) {
      alert(e?.message || "Failed to update farmer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-green-700">Farmer Management</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name, farmerId, contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            />
            <button
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => fetchFarmers({ page: 1, search })}
            >
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-100">
          <DynamicTable
            columns={columns as any}
            data={farmers}
            pagination={{ current: page, total, pageSize: PAGE_SIZE }}
            onPageChange={onPageChange}
            rowKey="id"
            label="All Farmers"
          />
          {loading && (
            <div className="p-4 text-sm text-gray-500">Loading...</div>
          )}

      {/* Delete Confirmation Modal */}
      {showConfirm && toDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              Delete farmer <span className="font-medium">{toDelete.fullName}</span> (ID: <span className="font-mono">{toDelete.farmerId}</span>)?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded border" onClick={() => { setShowConfirm(false); setToDelete(null); }}>Cancel</button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                disabled={!!deletingId}
                onClick={async () => {
                  if (!toDelete?.id) return;
                  try {
                    setDeletingId(toDelete.id);
                    const res = await farmerApi.delete(toDelete.id);
                    if ((res as any)?.success) {
                      setSuccessMessage((res as any)?.message || 'Farmer deleted successfully');
                      setShowSuccess(true);
                      setShowConfirm(false);
                      setToDelete(null);
                      await fetchFarmers();
                    } else {
                      const msg = (res as any)?.message || 'Failed to delete farmer';
                      const errs = (res as any)?.errors || [];
                      setErrorMessage(msg);
                      setErrorDetails(errs);
                      setShowError(true);
                    }
                  } catch (err: any) {
                    setErrorMessage(err?.message || 'Failed to delete farmer');
                    setErrorDetails([]);
                    setShowError(true);
                  } finally {
                    setDeletingId(null);
                  }
                }}
              >
                {deletingId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>

      {/* View Modal */}
      {viewOpen && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setViewOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Farmer Details</h2>
              <button className="text-gray-500" onClick={() => setViewOpen(false)}>✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Farmer ID:</span> {selected.farmerId}</div>
              <div><span className="text-gray-500">Name:</span> {selected.fullName}</div>
              <div><span className="text-gray-500">Contact:</span> {selected.contactNumber}</div>
              <div><span className="text-gray-500">State:</span> {selected.state}</div>
              <div><span className="text-gray-500">District:</span> {selected.district}</div>
              <div><span className="text-gray-500">Village:</span> {selected.village}</div>
              <div className="col-span-2"><span className="text-gray-500">Address:</span> {selected.address || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setEditOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Farmer</h2>
              <button className="text-gray-500" onClick={() => setEditOpen(false)}>✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={editForm.fullName || ''} onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contact Number</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={editForm.contactNumber || ''} onChange={(e) => setEditForm({ ...editForm, contactNumber: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">State</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={editForm.state || ''} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">District</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={editForm.district || ''} onChange={(e) => setEditForm({ ...editForm, district: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Village</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={editForm.village || ''} onChange={(e) => setEditForm({ ...editForm, village: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <textarea className="w-full border rounded px-3 py-2 text-sm" rows={3} value={editForm.address || ''} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 rounded border" onClick={() => setEditOpen(false)}>Cancel</button>
              <button disabled={saving} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60" onClick={handleSave}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success & Error Modals */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={"Success"}
        message={successMessage}
      />
      <ErrorModal
        isOpen={showError}
        onClose={() => { setShowError(false); setErrorMessage(""); setErrorDetails([]); }}
        title={"Operation Failed"}
        message={errorMessage}
        errors={errorDetails}
      />
    </div>
  );
};

export default FarmerManagementPage;