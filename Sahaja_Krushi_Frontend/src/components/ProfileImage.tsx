import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";

interface ProfileImageProps {
  initialImage?: string;
  onImageUpload?: (file: File) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  initialImage,
  onImageUpload,
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        if (onImageUpload) onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="max-w-xl mx-auto bg-[#f8fdfc] p-7 rounded-md shadow-md flex items-center space-x-3">
      <div className="relative w-40 h-20 flex-shrink-0">
        <label htmlFor="profileImageInput" className="cursor-pointer">
          <img
            src={image || "https://via.placeholder.com/150"}
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
        </label>
        <input
          ref={inputRef}
          id="profileImageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900">
          Upload Profile Image
        </p>
        <p className="text-xs text-gray-500 mb-5">Image should be below 15Kb</p>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleUploadClick}
            className="bg-orange-500 text-white text-sm px-4 py-1 rounded hover:bg-orange-600"
          >
            Upload
          </button>
          <button className="text-sm text-gray-600 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
