"use client";

import React, { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ResultsDisplay from "@/components/ResultsDisplay";
import Header from "@/components/Header";

interface ExtractionResult {
  raw_text: string;
  vendor?: string;
  date?: string;
  total_amount?: number;
  category?: string;
  confidence: number;
}

export default function Home() {
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to process file");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 xl:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mb-4 sm:mb-6 animate-float">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6">
              <span className="neon-text animate-neon-glow">
                Intelligent Scanner
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl neon-text-secondary max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4">
              Transform your invoices and receipts into structured data with the
              power of AI. Upload any document and watch the magic happen.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-4">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-cyan-300 rounded-full text-xs sm:text-sm font-medium">
                🤖 AI-Powered
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-blue-300 rounded-full text-xs sm:text-sm font-medium">
                ⚡ Lightning Fast
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-purple-300 rounded-full text-xs sm:text-sm font-medium">
                📱 Mobile Ready
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Upload Section */}
            <div className="card card-hover">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold neon-text">
                  Upload Document
                </h2>
              </div>

              <FileUpload
                onUpload={handleUpload}
                loading={loading}
                disabled={loading}
              />

              {error && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-red-300 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="card card-hover">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold neon-text">
                  Extracted Data
                </h2>
              </div>

              {result ? (
                <ResultsDisplay result={result} onReset={handleReset} />
              ) : (
                <div className="text-center py-12">
                  {loading ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-200/30 border-t-cyan-400"></div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold neon-text">
                          Processing your document...
                        </p>
                        <p className="text-sm neon-text-secondary">
                          This may take a few seconds
                        </p>
                      </div>
                      <div className="w-full bg-slate-700/40 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse-slow"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-slate-700/40 rounded-2xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-cyan-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold neon-text mb-2">
                          Ready to extract data
                        </p>
                        <p className="neon-text-secondary">
                          Upload a file to see the AI magic happen
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold neon-text mb-4">
                Why Choose Our Scanner?
              </h3>
              <p className="neon-text-secondary max-w-2xl mx-auto">
                Powered by cutting-edge AI technology for maximum accuracy and
                speed
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-slate-800/40 rounded-2xl backdrop-blur-md border border-cyan-400/30">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold neon-text mb-2">Lightning Fast</h4>
                <p className="text-sm neon-text-secondary">
                  Process documents in seconds, not minutes
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 bg-slate-800/40 rounded-2xl backdrop-blur-md border border-cyan-400/30">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold neon-text mb-2">
                  Highly Accurate
                </h4>
                <p className="text-sm neon-text-secondary">
                  AI-powered extraction with 95%+ accuracy
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 bg-slate-800/40 rounded-2xl backdrop-blur-md border border-cyan-400/30">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold neon-text mb-2">Mobile Ready</h4>
                <p className="text-sm neon-text-secondary">
                  Works perfectly on all devices and screen sizes
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 bg-slate-800/40 rounded-2xl backdrop-blur-md border border-cyan-400/30">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold neon-text mb-2">Easy Export</h4>
                <p className="text-sm neon-text-secondary">
                  Download results as JSON or CSV instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
