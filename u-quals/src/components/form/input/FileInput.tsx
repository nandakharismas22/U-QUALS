import { FC, useRef, useState } from "react";

interface FileInputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ className, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <div className="flex items-center justify-between w-full h-14 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-white/[0.03]">
          <span className="text-sm truncate">
            {fileName || "Seret file di sini untuk mulai mengunggah"}
          </span>
          <button
            type="button"
            onClick={handleButtonClick}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-white/[0.06] dark:border-gray-600"
          >
            Unggah file
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileInput;