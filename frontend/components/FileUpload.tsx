"use client";

import React, { useRef, useState } from "react";

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading: boolean;
  disabled: boolean;
}

export default function FileUpload({
  onUpload,
  loading,
  disabled,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled || loading) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image (JPG, PNG) or PDF file");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    onUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;

    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const openFileDialog = () => {
    if (!disabled && !loading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 lg:p-12 text-center transition-all duration-300 ${
          dragActive
            ? "border-cyan-400 bg-cyan-400/10 scale-105"
            : "border-cyan-400/30 hover:border-cyan-400/50 hover:bg-cyan-400/5"
        } ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
          aria-label="Upload invoice or receipt file"
        />

        <div className="space-y-4 sm:space-y-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
            {loading ? (
              <div className="animate-spin rounded-full h-full w-full border-4 border-cyan-200/30 border-t-cyan-400"></div>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold neon-text">
              {loading ? "Processing..." : "Drop your file here"}
            </p>
            <p className="text-sm sm:text-base neon-text-secondary">
              {loading
                ? "AI is analyzing your document..."
                : "or click to browse"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-700/40 text-cyan-300 rounded-full border border-cyan-400/30">
              📄 JPG
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-700/40 text-cyan-300 rounded-full border border-cyan-400/30">
              🖼️ PNG
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-700/40 text-cyan-300 rounded-full border border-cyan-400/30">
              📋 PDF
            </span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-700/40 text-cyan-300 rounded-full border border-cyan-400/30">
              📏 Max 10MB
            </span>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -top-4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400/20 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-200/30 border-t-cyan-400"></div>
            <span className="text-lg font-semibold neon-text">
              Extracting data...
            </span>
          </div>

          <div className="w-full bg-slate-700/40 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse-slow"></div>
          </div>

          <p className="text-center text-sm neon-text-secondary">
            This usually takes 2-5 seconds
          </p>
        </div>
      )}
    </div>
  );
}
