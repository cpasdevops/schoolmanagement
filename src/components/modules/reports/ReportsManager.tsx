import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Printer,
  Calendar,
  DollarSign,
  Users,
  GraduationCap,
  Bus,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../common/Badge';

export const ReportsManager: React.FC = () => {
  const {
    students,
    staff,
    feeInvoices,
    classes,
    subjects,
    examinations,
    examResults,
    currentBranch,
    currentSession
  } = useERP();

  const [selectedReport, setSelectedReport] = useState<'academic' | 'financial' | 'attendance'>('academic');

  // Compute stats
  const totalInvoiced = feeInvoices.reduce((a, b) => a + b.totalAmount, 0);
  const totalCollected = feeInvoices.reduce((a, b) => a + b.paidAmount, 0);
  const totalPending = totalInvoiced - totalCollected;

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value\n' +
      `Active Students,${students.length}\n` +
      `Faculty Staff,${staff.length}\n` +
      `Total Invoiced,${totalInvoiced}\n` +
      `Total Collected,${totalCollected}\n` +
      `Outstanding Balance,${totalPending}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `greenwood_erp_report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Analytics & Board Reporting</h2>
          <p className="text-xs text-slate-500">
            Executive performance indicators, cohort grade distributions, and fiscal audits.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Data (CSV)
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print Board Summary
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setSelectedReport('academic')}
          className={`pb-2.5 px-3 border-b-2 transition-colors ${
            selectedReport === 'academic'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Academic Proficiency
        </button>
        <button
          onClick={() => setSelectedReport('financial')}
          className={`pb-2.5 px-3 border-b-2 transition-colors ${
            selectedReport === 'financial'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Fiscal & Revenue Audit
        </button>
        <button
          onClick={() => setSelectedReport('attendance')}
          className={`pb-2.5 px-3 border-b-2 transition-colors ${
            selectedReport === 'attendance'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Attendance & Retention
        </button>
      </div>

      {/* TAB 1: ACADEMIC */}
      {selectedReport === 'academic' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-slate-500">School-Wide Pass Rate</span>
              <p className="text-2xl font-bold text-emerald-700">98.4%</p>
              <span className="text-[11px] text-emerald-600 font-semibold">+2.1% higher than regional average</span>
            </div>
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-slate-500">Median GPA Score</span>
              <p className="text-2xl font-bold font-mono text-indigo-700">3.82 / 4.0</p>
              <span className="text-[11px] text-slate-400">Based on Term 1 Mid-Term Assessments</span>
            </div>
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-slate-500">Honor Roll Scholars</span>
              <p className="text-2xl font-bold text-slate-900">42 Students</p>
              <span className="text-[11px] text-indigo-600 font-semibold">Achieved Grade A+ Distinction</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Subject-Wise Performance Distribution</h3>
            <div className="space-y-3">
              {[
                { subject: 'Advanced Physics', avg: 89, passRate: 98, teacher: 'Sarah Jenkins' },
                { subject: 'Pure Mathematics', avg: 84, passRate: 94, teacher: 'Julian Sterling' },
                { subject: 'Computer Science & AI', avg: 92, passRate: 100, teacher: 'David Chen' },
                { subject: 'English Literature', avg: 86, passRate: 97, teacher: 'Emma Watson' },
                { subject: 'World History', avg: 88, passRate: 96, teacher: 'Marcus Vance' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800">
                      {item.subject} <span className="text-slate-400 font-normal">({item.teacher})</span>
                    </span>
                    <span className="font-mono font-bold text-indigo-700">Avg {item.avg}% &bull; Pass {item.passRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${item.avg}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FINANCIAL */}
      {selectedReport === 'financial' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-slate-500">Gross Invoiced Revenue</span>
              <p className="text-2xl font-bold font-mono text-slate-900">${totalInvoiced.toLocaleString()}</p>
              <span className="text-[11px] text-slate-400">{currentSession.name} Term</span>
            </div>
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-slate-500">Realized Collections</span>
              <p className="text-2xl font-bold font-mono text-emerald-700">${totalCollected.toLocaleString()}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">
                {((totalCollected / totalInvoiced) * 100).toFixed(1)}% Realization
              </span>
            </div>
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-slate-500">Uncollected Dues</span>
              <p className="text-2xl font-bold font-mono text-rose-600">${totalPending.toLocaleString()}</p>
              <span className="text-[11px] text-rose-500 font-semibold">Follow-up notifications queued</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Fee Heads Revenue Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Academic Tuition</span>
                <strong className="text-base font-mono text-slate-900">$184,000</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Science & STEM Labs</span>
                <strong className="text-base font-mono text-slate-900">$32,500</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Transport Services</span>
                <strong className="text-base font-mono text-slate-900">$21,800</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Co-Curricular & Sports</span>
                <strong className="text-base font-mono text-slate-900">$14,200</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDANCE */}
      {selectedReport === 'attendance' && (
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Monthly Attendance Adherence Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="text-indigo-700 font-semibold block">Student Attendance Rate</span>
              <p className="text-3xl font-bold font-mono text-indigo-950 mt-1">96.8%</p>
              <p className="text-[11px] text-indigo-600 mt-1">Average daily presence across classes</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 font-semibold block">Faculty Attendance Rate</span>
              <p className="text-3xl font-bold font-mono text-emerald-950 mt-1">98.5%</p>
              <p className="text-[11px] text-emerald-600 mt-1">Faculty & administrative staff roster</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-amber-700 font-semibold block">Approved Medical Leaves</span>
              <p className="text-3xl font-bold font-mono text-amber-950 mt-1">1.2%</p>
              <p className="text-[11px] text-amber-600 mt-1">Documented health certificates</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
