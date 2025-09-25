import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../lib/network/axiosClient';

const FarmerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<any>(null);

  const fetchOne = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/farmers/${id}`);
      setItem(res?.data?.data ?? null);
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOne(); }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!item) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6 space-y-4">
      <button onClick={() => navigate(-1)} className="px-3 py-1 text-sm bg-gray-100 rounded">Back</button>
      <h2 className="text-xl font-semibold">Farmer #{item.id} ({item.farmerId})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">Profile</h3>
          <div className="space-y-1 text-sm">
            <div><span className="text-gray-500">Name:</span> {item.fullName || '-'}</div>
            <div><span className="text-gray-500">Phone:</span> {item.contactNumber}</div>
            <div><span className="text-gray-500">DOB:</span> {item.dateOfBirth}</div>
            <div><span className="text-gray-500">Village:</span> {item.village || '-'}</div>
            <div><span className="text-gray-500">District:</span> {item.district || '-'}</div>
            <div><span className="text-gray-500">State:</span> {item.state || '-'}</div>
            <div><span className="text-gray-500">PIN:</span> {item.pinCode || '-'}</div>
            <div><span className="text-gray-500">Created:</span> {new Date(item.createdAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetail;


