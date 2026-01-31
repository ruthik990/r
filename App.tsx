
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import { analyzeContract } from './services/gemini';
import { ContractAnalysis } from './types';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rawContent, setRawContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleContentReady = async (content: string | { data: string, mimeType: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Store raw text for the chat context if it's text
      if (typeof content === 'string') {
        setRawContent(content);
      } else {
        setRawContent("[Image Content Analysed]");
      }

      const result = await analyzeContract(content);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("We couldn't analyze the document. Please ensure it's a clear image or readable text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setRawContent('');
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass-morphism border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">LegalEase</span>
          </div>
          <div className="hidden sm:flex gap-6">
            <span className="text-sm font-medium text-slate-500">Contract Analysis</span>
            <span className="text-sm font-medium text-slate-500">Plain English Translation</span>
          </div>
        </div>
      </nav>

      {/* Hero Section (Only shown if no analysis yet) */}
      {!analysis && !isLoading && (
        <div className="max-w-7xl mx-auto px-4 pt-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Stop guessing. <br />
            <span className="text-indigo-600">Understand your contracts.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-12">
            Upload any contract, agreement, or term sheet. Our AI translates legal jargon into plain English, spots hidden risks, and extracts key deadlines automatically.
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        {!analysis ? (
          <FileUpload onContentReady={handleContentReady} isLoading={isLoading} />
        ) : (
          <>
            <Dashboard analysis={analysis} onReset={handleReset} />
            <ChatInterface contractContent={rawContent} />
          </>
        )}
      </main>

      {/* Footer info */}
      {!analysis && !isLoading && (
        <div className="max-w-5xl mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Instant Clarity</h3>
            <p className="text-sm text-slate-500">Complex legal clauses translated into sentences a 10-year-old could understand.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Risk Detection</h3>
            <p className="text-sm text-slate-500">We automatically highlight high-risk terms like non-competes or hidden renewal fees.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Date Tracking</h3>
            <p className="text-sm text-slate-500">Never miss a renewal or cancellation date again. We extract all timelines into a clear list.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
