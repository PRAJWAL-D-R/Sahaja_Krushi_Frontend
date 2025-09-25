import React, { useEffect, useMemo, useState } from 'react';
import axiosClient from '../../lib/network/axiosClient';
import { farmerApi } from '../../lib/network/FarmerApi';
import DynamicTable from '../../components/DynamicTable';
import { Link, useNavigate } from 'react-router-dom';

type Farmer = {
  id: number;
  farmerId: string;
  fullName?: string | null;
  contactNumber: string;
  village?: string | null;
  district?: string | null;
  state?: string | null;
  pinCode?: string | null;
  createdAt: string;
};

const FarmersList: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Farmer[]>([]);
  const [q, setQ] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selected, setSelected] = useState<Farmer | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      // Prefer the same API used elsewhere for consistency
      try {
        const { data } = await farmerApi.list({ page: 1, limit: 100, search: q });
        const list = Array.isArray((data as any)?.farmers) ? (data as any).farmers : [];
        setItems(list as unknown as Farmer[]);
      } catch {
        // Fallback to plain list endpoint
        const res = await axiosClient.get('/farmers');
        const raw = res?.data?.data;
        const list: Farmer[] = Array.isArray(raw) ? raw : Array.isArray(raw?.rows) ? raw.rows : [];
        setItems(list);
      }
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load farmers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const source = Array.isArray(items) ? items : [];
    if (!s) return source;
    return source.filter(f =>
      f.farmerId.toLowerCase().includes(s) ||
      (f.fullName || '').toLowerCase().includes(s) ||
      f.contactNumber.includes(s)
    );
  }, [items, q]);

  const remove = async (id: number) => {
    if (!confirm('Delete this farmer?')) return;
    try {
      await axiosClient.delete(`/farmers/${id}`);
      await fetchAll();
    } catch (e: any) {
      alert(e?.message || 'Failed to delete');
    }
  };

  const columns = useMemo(() => {
    return [
      {
        key: 'serial',
        label: '#',
        render: (_: any, __: Farmer, index: number) => index + 1,
      },
      { key: 'farmerId', label: 'Farmer ID', sortable: true },
      { key: 'fullName', label: 'Name', sortable: true },
      { key: 'contactNumber', label: 'Phone', sortable: true },
      { key: 'village', label: 'Village', sortable: true },
      {
        key: 'createdAt',
        label: 'Created',
        render: (_: any, record: Farmer) => new Date(record.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_: any, record: Farmer) => (
          <div className="space-x-2">
            <button
              onClick={() => { setSelected(record); setPreviewOpen(true); }}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs shadow"
            >View</button>
            {/* <button
              onClick={() => navigate(`/superadmin/farmers/${record.id}`)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded text-xs shadow"
            >Open</button> */}
            <button
              onClick={() => remove(record.id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs shadow"
            >Delete</button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{`Farmers (${Array.isArray(filtered) ? filtered.length : 0})`}
        </h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name/id/phone"
          className="border rounded px-3 py-2 text-sm w-64"
        />
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <DynamicTable
            columns={columns as any}
            data={(Array.isArray(filtered) ? filtered : []) as any}
            rowKey="id"
            // label={`Farmers (${Array.isArray(filtered) ? filtered.length : 0})`}
            />
        </div>
      )}

      {/* Quick View Modal */}
      {previewOpen && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setPreviewOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-100 rounded-full" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Farmer Overview</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setPreviewOpen(false)}>✕</button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Farmer ID</p>
                  <p className="font-medium font-mono">{selected.farmerId}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{selected.contactNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{selected.fullName || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Village</p>
                  <p className="font-medium">{selected.village || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">District</p>
                  <p className="font-medium">{selected.district || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Created</p>
                  <p className="font-medium">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button className="px-3 py-2 border rounded" onClick={() => setPreviewOpen(false)}>Close</button>
                <button className="px-3 py-2 bg-gray-800 text-white rounded" onClick={() => navigate(`/superadmin/farmers/${selected.id}`)}>Open Full</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersList;


