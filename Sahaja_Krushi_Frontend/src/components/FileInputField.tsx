import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface FileInputFieldProps {
  label: string;
  required?: boolean;
  name?: string;
  format?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  error?: string;
  className?: string;
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  required = false,
  name,
  accept = ".pdf,.jpg,.png",
  format = "PDF, JPG, PNG",
  onChange,
  error,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange?.(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      onChange?.(droppedFile);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-md ${className}`}>
      <label className="text-sm text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`relative rounded-xl px-4 py-3 text-center transition-all duration-200 ease-in-out h-[130px] bg-gray-50 flex flex-col justify-center items-center cursor-pointer
          ${
            dragActive
              ? "border-2 border-orange-500 bg-orange-50"
              : error
              ? "border border-primary"
              : "border border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50"
          }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="text-orange-500 mb-2" size={24} />
        <p className="text-sm text-gray-600 font-medium">
          <span className="text-orange-600 underline">Click to upload</span> or
          drag & drop
        </p>
        <p className="text-[11px] text-gray-400 mt-1">Max 1MB • {format}</p>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="mt-3 flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2 text-sm shadow-sm">
          <div className="overflow-hidden">
            <p className="font-medium text-gray-800 truncate max-w-[160px]">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB • Uploaded
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="ml-3 text-gray-400 hover:text-red-500 transition"
            title="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default FileInputField;
