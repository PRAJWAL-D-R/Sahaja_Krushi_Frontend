
import React, { useEffect, useState, useMemo } from "react";
import { Plus, Edit, Trash2, Save, X, FileText, Download, Search, Filter, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchNews, createNews, updateNews, deleteNews } from "../../lib/network/NewsApi";
import { 
  clearError, 
  setCurrentPage, 
  setFilters, 
  clearFilters, 
  hideSuccessModal, 
  hideErrorModal 
} from "../../store/feature/News/NewsSlice";
import SuccessModal from "../../components/SuccessModel";
import ErrorModal from "../../components/ErrorModal";
import type { NewsItem as ApiNewsItem } from "../../lib/interface/NewsInterface";


const NewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    newsList, 
    loading, 
    error, 
    operationLoading, 
    currentPage, 
    totalPages, 
    filters, 
    successMessage, 
    showSuccessModal, 
    showErrorModal 
  } = useSelector((state: RootState) => state.news);
  
  const allNewsItems: ApiNewsItem[] = newsList?.data || [];


  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  // Filter and paginate news items
  const { filteredNews, paginatedNews } = useMemo(() => {
    let filtered = [...allNewsItems];

    // Apply search filter
    if (filters.searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(item => 
        new Date(item.createdAt) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(item => 
        new Date(item.createdAt) <= new Date(filters.dateTo)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    // Pagination
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);

    return {
      filteredNews: filtered,
      paginatedNews: paginated
    };
  }, [allNewsItems, filters, currentPage]);

  const totalFilteredPages = Math.ceil(filteredNews.length / 10);


  useEffect(() => {
    dispatch(fetchNews({}));
  }, [dispatch]);

  // Clear error when component mounts or when user starts a new action
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Filter handlers
  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowFilters(false);
  };

  const resetFilters = () => {
    setLocalFilters(filters);
    dispatch(clearFilters());
    setShowFilters(false);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const goToNextPage = () => {
    if (currentPage < totalFilteredPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    } else {
      setDocumentFile(null);
    }
  };

  const handleAddNew = async () => {
    if (!newContent.title.trim() || !newContent.content.trim()) {
      return;
    }

    try {
      await dispatch(createNews({ 
        formData: newContent, 
        file: documentFile || undefined
      })).unwrap();
      
      setIsAddingNew(false);
      setNewContent({ title: "", content: "" });
      setDocumentFile(null);
    } catch (error) {
      console.error('Failed to create news:', error);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const itemToEdit = allNewsItems.find((item) => item.id === id);
    if (itemToEdit) {
      setNewContent({
        title: itemToEdit.title,
        content: itemToEdit.content,
      });
    }
  };

  const handleSaveEdit = async (
    id: number,
    updatedContent: Partial<ApiNewsItem>,
    updatedFile?: File | null
  ) => {
    if (!updatedContent.title?.trim() || !updatedContent.content?.trim()) {
      return;
    }

    try {
      await dispatch(updateNews({ 
        formData: updatedContent, 
        newsId: id,
        file: updatedFile || undefined
      })).unwrap();
      
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update news:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await dispatch(deleteNews(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete news:', error);
      }
    }
  };

  const EditableContent: React.FC<{ item: ApiNewsItem }> = ({ item }) => {
    const [editData, setEditData] = useState({
      title: item.title,
      content: item.content,
    });
    const [editFile, setEditFile] = useState<File | null>(null);

    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg font-semibold text-lg"
            placeholder="News Title"
          />

          <textarea
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg min-h-24 resize-y"
            placeholder="News Description"
          />

          <label className="block text-sm font-medium text-gray-700">
            {editFile ? `Selected file: ${editFile.name}` : `Current file: ${item.documentName || 'None'}`}
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setEditFile(e.target.files[0]);
                }
              }}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf, .doc, .docx"
            />
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => handleSaveEdit(item.id, editData, editFile)}
              disabled={operationLoading || !editData.title.trim() || !editData.content.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {operationLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
       <div className="p-4 mb-4">
  <div className="flex justify-between items-center">
    {/* Left Section */}
    <div>
      <h1 className="text-xl font-bold text-green-700">News Management</h1>
      <p className="text-sm text-gray-600">
        Manage news and announcements for farmers.
      </p>
    </div>

    {/* Right Section */}
    <div className="flex gap-2">
      {/* Filters Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        <Filter size={14} />
        Filters
      </button>

      {/* Add New Button */}
      <button
        onClick={() => setIsAddingNew(true)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        <Plus size={16} />
        Add New
      </button>
    </div>
  </div>
</div>

        {/* Filters */}
      {showFilters && (
  <div className="bg-white rounded-md shadow p-4 mb-4">
    <h3 className="text-base font-semibold text-gray-800 mb-3">Filter News</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      
      {/* Search */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={localFilters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Search news..."
          />
        </div>
      </div>

      {/* From Date */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          From
        </label>
        <div className="relative">
          <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="date"
            value={localFilters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      {/* To Date */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          To
        </label>
        <div className="relative">
          <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="date"
            value={localFilters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          value={localFilters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-3">
      <button
        onClick={applyFilters}
        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Apply
      </button>
      <button
        onClick={resetFilters}
        className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
)}

        {/* Add New Content Form */}
       {isAddingNew && (
  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
    <h3 className="text-base font-semibold text-green-800 mb-3">
      Add New News Item
    </h3>
    <div className="space-y-3">
      {/* Title */}
      <input
        type="text"
        value={newContent.title}
        onChange={(e) =>
          setNewContent({ ...newContent, title: e.target.value })
        }
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        placeholder="News Title"
      />

      {/* Description */}
      <textarea
        value={newContent.content}
        onChange={(e) =>
          setNewContent({ ...newContent, content: e.target.value })
        }
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md min-h-20 resize-y focus:outline-none focus:ring-1 focus:ring-green-500"
        placeholder="News Description"
      />

      {/* File Upload */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Upload a Document (PDF or Word)
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 
                     file:mr-3 file:py-1.5 file:px-3 file:rounded-md 
                     file:border-0 file:text-sm file:font-medium 
                     file:bg-blue-50 file:text-blue-700 
                     hover:file:bg-blue-100"
          accept=".pdf, .doc, .docx"
        />
        {documentFile && (
          <p className="mt-1 text-xs text-gray-600">
            Selected file: {documentFile.name}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleAddNew}
          disabled={
            operationLoading ||
            !newContent.title.trim() ||
            !newContent.content.trim()
          }
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-green-600 text-white rounded-md 
                     hover:bg-green-700 transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={14} />
          {operationLoading ? "Adding..." : "Add News"}
        </button>
        <button
          onClick={() => {
            setIsAddingNew(false);
            setNewContent({ title: "", content: "" });
            setDocumentFile(null);
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* News List */}
        <div className="space-y-6">
          {loading && (
            <div className="text-center text-gray-500 py-8">Loading news...</div>
          )}
          {!loading && !error && paginatedNews.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {filteredNews.length === 0 ? 'No News Items Found' : 'No News Items Added Yet'}
                </h3>
                <p>
                  {filteredNews.length === 0 
                    ? 'Try adjusting your filters to see more results.'
                    : 'Start by adding your first news or announcement for farmers to see.'
                  }
                </p>
              </div>
            </div>
          )}
          {paginatedNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {editingId === item.id ? (
                <EditableContent item={item} />
              ) : (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-3">{item.content}</p>

                      {item.documentUrl && (
                        <a
                          href={`http://localhost:3000${item.documentUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                        >
                          <FileText size={16} />
                          {item.documentName || "View Document"}
                          <Download size={14} />
                        </a>
                      )}

                      <div className="text-sm text-gray-500 mt-4">
                        Created: {new Date(item.createdAt).toLocaleDateString()} | Updated: {new Date(item.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={operationLoading}
                      className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={14} />
                      {operationLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalFilteredPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalFilteredPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Results Summary */}
        {filteredNews.length > 0 && (
          <div className="text-center text-sm text-gray-500 mt-4">
            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, filteredNews.length)} of {filteredNews.length} results
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => dispatch(hideSuccessModal())}
        title="Success!"
        message={successMessage || "Operation completed successfully!"}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => dispatch(hideErrorModal())}
        title="Error"
        message={error || "An error occurred. Please try again."}
      />
    </div>
  );
};

export default NewsPage;