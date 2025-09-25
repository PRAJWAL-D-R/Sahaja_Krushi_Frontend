import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../lib/network/axiosClient';

type Farmer = {
  id: number;
  farmerId: string;
  fullName?: string | null;
  contactNumber: string;
  village?: string | null;
  district?: string | null;
  state?: string | null;
  pinCode?: string | null;
};

type QueryItem = {
  id: number;
  title?: string | null;
  description?: string | null;
  imagePath?: string | null;
  audioPath?: string | null;
  videoPath?: string | null;
  status: 'open' | 'answered' | 'closed';
  answer?: string | null;
  createdAt: string;
  updatedAt: string;
  farmer?: Farmer;
};

const QueryDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<QueryItem | null>(null);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'open' | 'answered' | 'closed'>('answered');
  const [saving, setSaving] = useState(false);

  const uploadsBase = useMemo(() => {
    // Derive backend origin from axiosClient baseURL
    try {
      const base = (axiosClient.defaults as any).baseURL as string | undefined;
      if (base) {
        const u = new URL(base);
        return `${u.protocol}//${u.hostname}:${u.port || '3000'}/uploads`;
      }
    } catch {}
    return 'http://localhost:3000/uploads';
  }, []);

  const imageUrl = item?.imagePath ? `${uploadsBase}/${item.imagePath}` : null;
  const audioUrl = item?.audioPath ? `${uploadsBase}/${item.audioPath}` : null;
  const videoUrl = item?.videoPath ? `${uploadsBase}/${item.videoPath}` : null;

  const fetchOne = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/queries/${id}`);
      const data = res?.data?.data;
      setItem(data);
      setAnswer(data?.answer || '');
      setStatus(data?.status || 'open');
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load query');
    } finally {
      setLoading(false);
    }
  };

  const saveAnswer = async () => {
    try {
      if (!id) return;
      setSaving(true);
      await axiosClient.put(`/queries/${id}/answer`, { answer, status });
      await fetchOne();
    } catch (e: any) {
      alert(e?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'answered':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'closed':
        return 'bg-slate-50 text-slate-700 border border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchOne();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-green-200 border border-slate-300 rounded-lg hover:bg-green-400 hover:border-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                
              </button>
              <div>
                <h1 className="text-xxl font-bold text-slate-900">Query #{id}</h1>
                {item && (
                  <p className="text-sm text-slate-500 mt-1">
                    Created: {formatDate(item.createdAt)}
                    {item.updatedAt !== item.createdAt && (
                      <span className="ml-2">• Updated: {formatDate(item.updatedAt)}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
            {item && (
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(item.status)}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    item.status === 'open' ? 'bg-amber-400' : 
                    item.status === 'answered' ? 'bg-emerald-400' : 'bg-slate-400'
                  }`} />
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              <p className="text-slate-600 font-medium">Loading query details...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Query</h3>
            <p className="text-red-600">{error}</p>
          </div>
        ) : !item ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-medium text-slate-700 mb-2">Query Not Found</h3>
            <p className="text-slate-500">The requested query could not be found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Farmer Info and Query Details Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Farmer Information */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-800 to-green-400 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Farmer Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-slate-500">Full Name</span>
                        <span className="text-sm font-semibold text-slate-900 text-right">{item.farmer?.fullName || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-slate-500">Farmer ID</span>
                        <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-800">{item.farmer?.farmerId}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-slate-500">Contact</span>
                        <span className="text-sm text-slate-900">{item.farmer?.contactNumber || 'N/A'}</span>
                      </div>
                      <hr className="border-slate-200" />
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          Location Details
                        </h4>
                        <div className="space-y-2 pl-6">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Village</span>
                            <span className="text-sm text-slate-800">{item.farmer?.village || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">District</span>
                            <span className="text-sm text-slate-800">{item.farmer?.district || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">State</span>
                            <span className="text-sm text-slate-800">{item.farmer?.state || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">PIN Code</span>
                            <span className="text-sm font-mono text-slate-800">{item.farmer?.pinCode || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Query Details */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-800 to-green-400 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      
                      Query Details
                    </h3>
                  </div>
                  <div className="p-6">
                    {item.title && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-slate-500 mb-2">Title</h4>
                        <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                      </div>
                    )}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-slate-500 mb-3">Description</h4>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                          {item.description || 'No description provided'}
                        </p>
                      </div>
                    </div>

                    {/* Media Section */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 mb-4 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Attached Media
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Image */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            Image
                          </div>
                          {imageUrl ? (
                            <a href={imageUrl} target="_blank" rel="noreferrer" className="block group">
                              <img 
                                src={imageUrl} 
                                alt="Query image" 
                                className="w-full h-40 object-cover rounded-lg border-2 border-transparent group-hover:border-blue-300 transition-colors duration-200" 
                              />
                              <p className="text-xs text-blue-600 mt-2 group-hover:text-blue-700">Click to view full size</p>
                            </a>
                          ) : (
                            <div className="h-40 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg">
                              <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs">No image</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Audio */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.983 5.983 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.987 3.987 0 0013 12a3.987 3.987 0 00-.172-1.415 1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Audio
                          </div>
                          {audioUrl ? (
                            <div className="space-y-2">
                              <audio controls className="w-full">
                                <source src={audioUrl} />
                              </audio>
                            </div>
                          ) : (
                            <div className="h-20 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg">
                              <div className="text-center">
                                <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                                <p className="text-xs">No audio</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Video */}
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            Video
                          </div>
                          {videoUrl ? (
                            <video controls className="w-full h-40 rounded-lg">
                              <source src={videoUrl} />
                            </video>
                          ) : (
                            <div className="h-40 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg">
                              <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs">No video</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-green-400 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Response Management
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Your Answer
                    </label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                      placeholder="Type your detailed response here..."
                      rows={6}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as any)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        >
                          <option value="open">Open</option>
                          <option value="answered">Answered</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <button
                        onClick={saveAnswer}
                        disabled={saving}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                      >
                        {saving ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </div>
                        ) : (
                          'Save Response'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryDetail;