import { useState } from "react";

function FileUpload() {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="w-full flex gap-2">
      <input
        className="file-input file-input-bordered w-full"
        type="file"
        name="image"
        id="image"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setFiles(files);
          }
        }}
      />
    </div>
  );
}

export default FileUpload;
