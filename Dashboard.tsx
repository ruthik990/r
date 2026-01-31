
import React from 'react';
import { ContractAnalysis } from '../types';
import RiskBadge from './RiskBadge';

interface DashboardProps {
  analysis: ContractAnalysis;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded">Analysis Complete</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight">{analysis.title}</h1>
          <div className="flex flex-wrap gap-2 items-center text-slate-500 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{analysis.parties.join(' • ')}</span>
          </div>
        </div>
        <button
          onClick={onReset}
          className="group px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Summaries */}
        <div className="lg:col-span-8 space-y-8">
          {/* ELI5 Summary */}
          <section className="relative overflow-hidden bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/20 p-2 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <h2 className="text-xl font-black uppercase tracking-wider">The "Simplified" Version</h2>
              </div>
              <p className="text-2xl leading-relaxed font-bold font-serif italic">
                "{analysis.simpleExplanation}"
              </p>
            </div>
          </section>

          {/* Detailed Summary */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
              Professional Insight
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">{analysis.summary}</p>
          </section>

          {/* Risks */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              Hidden Red Flags
            </h2>
            <div className="space-y-6">
              {analysis.risks.map((risk, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-50 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate-400 font-bold truncate max-w-[200px] sm:max-w-md uppercase tracking-tighter">Legal Clause Fragment: "{risk.clause.substring(0, 60)}..."</span>
                    <RiskBadge level={risk.riskLevel} />
                  </div>
                  <div className="p-6 grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Legal Impact</h4>
                      <p className="text-slate-700 font-bold leading-snug">{risk.description}</p>
                    </div>
                    <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                      <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Plain English Warning</h4>
                      <p className="text-amber-900 font-black text-lg leading-tight">{risk.simplifiedWarning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sideline data */}
        <div className="lg:col-span-4 space-y-8">
          {/* Obligations */}
          <section className="bg-emerald-600 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </span>
              Your Action Items
            </h3>
            <ul className="space-y-4">
              {analysis.keyObligations.map((ob, idx) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-[10px] font-black group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                    {idx + 1}
                  </div>
                  <p className="text-sm font-bold leading-snug">{ob}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Deadlines */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
             <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
             </div>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-indigo-50 rounded-lg">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Important Dates
            </h3>
            <div className="space-y-6">
              {analysis.deadlines.length > 0 ? (
                analysis.deadlines.map((dl, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-indigo-100 group">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                    <span className="block text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">{dl.date}</span>
                    <span className="block text-sm text-slate-700 font-bold leading-tight">{dl.description}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic font-medium">No specific timelines were found in this document.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
