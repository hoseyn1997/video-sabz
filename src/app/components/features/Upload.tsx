// app/upload/page.tsx
"use client"; // Mark this as a Client Component

import { useState } from "react";

export default function UploadPage() {
  const [progress, setProgress] = useState(0); // Track upload progress
  const [uploading, setUploading] = useState(false); // Track upload state
  const [message, setMessage] = useState<string | null>(null); // Track success/error message

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;

    if (!file) {
      setMessage("No file selected");
      return;
    }

    setUploading(true);
    setProgress(0);
    setMessage(null);

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
      }
    });

    // Handle upload completion
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        setMessage("File uploaded successfully!");
      } else {
        setMessage("Failed to upload file");
      }
      setUploading(false);
    });

    // Handle upload errors
    xhr.addEventListener("error", () => {
      setMessage("Upload failed due to an error");
      setUploading(false);
    });

    // Send the file to the server
    xhr.open("POST", "/api/upload", true); // Use an API route for the upload
    xhr.send(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
      <form onSubmit={handleFileUpload} className="space-y-4">
        <input
          type="file"
          name="file"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Progress Bar */}
      {uploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress.toFixed(2)}%
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {message && (
        <p
          className={`mt-4 ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
