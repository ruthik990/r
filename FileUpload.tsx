
import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onContentReady: (content: string | { data: string, mimeType: string }) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onContentReady, isLoading }) => {
  const [textInput, setTextInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        onContentReady({ data: base64, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    } else {
      const text = await file.text();
      onContentReady(text);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-white p-8 rounded-3xl shadow-2xl border-2 transition-all text-center ${
          isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-slate-100'
        }`}
      >
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Decode your contract</h2>
          <p className="text-slate-500 mt-2 font-medium">Drop your document here or paste the text below.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all outline-none resize-none text-slate-700 font-medium"
              placeholder="Paste the fine print here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            {!textInput && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Plain English Awaits</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={isLoading || !textInput.trim()}
              onClick={() => onContentReady(textInput)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-100 active:scale-95"
            >
              Analyze Now
            </button>
            
            <label className="flex-1">
              <input
                type="file"
                className="hidden"
                accept="image/*,text/plain"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isLoading}
              />
              <div className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 border-dashed">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                Upload File
              </div>
            </label>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
          <div className="relative">
            <div className="animate-ping absolute inset-0 rounded-full bg-indigo-400 opacity-20"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-800">Processing legal clauses...</p>
            <p className="text-slate-500 text-sm mt-1">Our AI is reading the fine print so you don't have to.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
