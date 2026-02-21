'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, Facebook, Zap, CheckCircle, AlertCircle, Download } from 'lucide-react';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; posts: any[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResults(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setResults({
        success: 12,
        failed: 0,
        posts: Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          content: `Sample post ${i + 1} generated from Google Sheets`,
          status: 'posted',
        }))
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sheets2FB</h1>
              <p className="text-xs text-gray-600">Google Sheets to Facebook Posts</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Convert Google Sheets to Facebook Posts
            </h2>
            <p className="text-xl text-gray-600">
              Upload your Google Sheets export and we'll create Facebook posts automatically
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Google Sheets Export
              </h3>
              <p className="text-gray-600 mb-4">
                Supports CSV, XLS, XLSX formats
              </p>
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5" />
                Choose File
              </label>
              {file && (
                <p className="mt-4 text-sm text-gray-600">
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            {/* Processing Button */}
            <button
              onClick={handleProcess}
              disabled={!file || isProcessing}
              className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Convert to Facebook Posts
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Processing Complete!
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">{results.success}</div>
                  <div className="text-sm text-gray-600">Posts Created</div>
                </div>
                <div className="p-6 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600">{results.failed}</div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
              </div>

              <div className="space-y-4">
                {results.posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Post #{post.id}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Posted</span>
                    </div>
                    <p className="text-sm text-gray-900">{post.content}</p>
                  </div>
                ))}
                {results.posts.length > 5 && (
                  <p className="text-center text-sm text-gray-600">
                    + {results.posts.length - 5} more posts
                  </p>
                )}
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                  View on Facebook
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">How to use:</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                Export your Google Sheet as CSV or Excel
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                Ensure first column contains post content
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                Optional: Add image URLs in second column
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">4.</span>
                Upload the file and click Convert
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">5.</span>
                Review and publish posts to Facebook
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
