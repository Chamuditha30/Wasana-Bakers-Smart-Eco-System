import { ImageUp, X } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({
  label = "Images",
  value = [],
  onChange,
  error = "",
}) {
  //innitialize states
  const [previews, setPreviews] = useState([]);
  const [uploadError, setUploadError] = useState("");

  //create image previews
  useEffect(() => {
    const urls = value.map((image) => {
      //existing Cloudinary image
      if (image.url) {
        return image.url;
      }

      //newly selected image
      return URL.createObjectURL(image);
    });

    setPreviews(urls);

    //cleanup only locally created preview URLs
    return () => {
      value.forEach((image, index) => {
        if (!image.url) {
          URL.revokeObjectURL(urls[index]);
        }
      });
    };
  }, [value]);

  //handle selected images
  const onDrop = (acceptedFiles, rejectedFiles) => {
    setUploadError("");

    if (rejectedFiles.length > 0) {
      setUploadError(
        "Some images were rejected. Check image type and file size.",
      );
    }

    onChange([...value, ...acceptedFiles]);
  };

  //configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 5 - value.length,
    maxSize: 5 * 1024 * 1024,
    disabled: value.length >= 5,
  });

  //remove selected image
  const removeImage = (index) => {
    onChange(value.filter((_, i) => i !== index));
    setUploadError("");
  };

  return (
    <div className="space-y-3">
      <label className="text-muted font-semibold">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* upload area */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400"} ${value.length >= 5 ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <input {...getInputProps()} />

        <ImageUp size={32} className="mx-auto mb-3 text-gray-500" />

        <p className="font-medium text-gray-700">
          {isDragActive
            ? "Drop your images here"
            : "Drag & drop images or click to browse"}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Maximum 5 images, 5MB per image
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {value.length}/5 images selected
        </p>
      </div>

      {/* error message */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

      {/* image previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg border"
            >
              <img
                src={preview}
                alt={`Selected image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white hover:bg-red-600"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
