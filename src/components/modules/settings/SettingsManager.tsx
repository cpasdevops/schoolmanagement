import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import {
  Settings,
  Shield,
  Building,
  Calendar,
  Lock,
  History,
  CheckCircle,
  Database,
  RotateCcw,
  Key
} from 'lucide-react';
import { Badge } from '../../common/Badge';

export const SettingsManager: React.FC = () => {
  const {
    currentBranch,
    branches,
    switchBranch,
    currentSession,
    academicSessions,
    switchSession,
    auditLogs,
    currentRole
  } = useERP();

  const [activeTab, setActiveTab] = useState<'profile' | 'rbac' | 'audit' | 'sessions'>('profile');

  // School profile state
  const [schoolName, setSchoolName] = useState(currentBranch.name);
  const [affiliationCode, setAffiliationCode] = useState('CBSE-AFFIL-90214 / IB-WORLD-449');
  const [establishedYear, setEstablishedYear] = useState('1998');
  const [schoolAddress, setSchoolAddress] = useState(currentBranch.address);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const rolesMatrix = [
    { role: 'Super Admin', students: 'Full', staff: 'Full', fees: 'Full', exams: 'Full', audit: 'Full' },
    { role: 'School Principal', students: 'Full', staff: 'Full', fees: 'View', exams: 'Approve', audit: 'View' },
    { role: 'Academic Dean', students: 'Edit', staff: 'View', fees: 'None', exams: 'Full', audit: 'None' },
    { role: 'Teacher / Faculty', students: 'Edit', staff: 'View', fees: 'None', exams: 'Edit Marks', audit: 'None' },
    { role: 'Accountant / Bursar', students: 'View', staff: 'None', fees: 'Collect & Issue', exams: 'None', audit: 'View' },
    { role: 'Librarian', students: 'View', staff: 'None', fees: 'Fines Only', exams: 'None', audit: 'None' },
    { role: 'Student', students: 'Own Profile', staff: 'None', fees: 'View Dues', exams: 'View Grades', audit: 'None' },
    { role: 'Parent / Guardian', students: 'Ward Profile', staff: 'None', fees: 'Pay Fees', exams: 'View Reports', audit: 'None' },
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">System Configuration, RBAC & Audit Trails</h2>
          <p className="text-xs text-slate-500">
            Multi-branch master setup, security roles, academic cycles, and tamper-evident audit logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'profile' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              School Profile
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'sessions' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Branches & Sessions
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'rbac' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Role Permissions Matrix
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'audit' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SCHOOL PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 max-w-3xl space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Institutional Identity & Accreditation</h3>
              <p className="text-slate-500 text-[11px]">Details printed on student ID cards, marksheets, and fee vouchers.</p>
            </div>
            {isSaved && (
              <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                <CheckCircle className="w-4 h-4" /> Changes Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institution Legal Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Affiliation / Accreditation Board</label>
                <input
                  type="text"
                  value={affiliationCode}
                  onChange={(e) => setAffiliationCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Address</label>
                <input
                  type="text"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Year Established</label>
                <input
                  type="text"
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: BRANCHES & SESSIONS */}
      {activeTab === 'sessions' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Multi-Branch */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Active School Branches</h3>
                <Badge variant="indigo">Multi-Branch Architecture</Badge>
              </div>

              <div className="space-y-3">
                {branches.map(b => (
                  <div
                    key={b.id}
                    onClick={() => switchBranch(b.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      b.id === currentBranch.id
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{b.name}</h4>
                      {b.id === currentBranch.id && (
                        <span className="text-[10px] font-bold text-indigo-700 uppercase">Current Active</span>
                      )}
                    </div>
                    <p className="text-slate-500 mt-1">{b.address}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      <span>Code: <strong>{b.code}</strong></span>
                      <span>Principal: <strong>{b.principalName}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Sessions */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Academic Sessions & Years</h3>
                <Badge variant="emerald">Session Master</Badge>
              </div>

              <div className="space-y-3">
                {academicSessions.map(s => (
                  <div
                    key={s.id}
                    onClick={() => switchSession(s.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      s.id === currentSession.id
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{s.name}</h4>
                      {s.id === currentSession.id && (
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">Current Term</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 font-mono text-slate-600">
                      <span>Start: {s.startDate}</span>
                      <span>End: {s.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RBAC PERMISSION MATRIX */}
      {activeTab === 'rbac' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">Enterprise Role-Based Access Control (RBAC)</h3>
            <p className="text-slate-500 text-[11px]">Strict enforcement of domain actions and navigational visibility.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">User Role</th>
                  <th className="p-3.5">Student Records</th>
                  <th className="p-3.5">Staff & Payroll</th>
                  <th className="p-3.5">Fee Bursar</th>
                  <th className="p-3.5">Exams & Grades</th>
                  <th className="p-3.5">Security Audits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rolesMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{item.role}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.students}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.staff}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.fees}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.exams}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.audit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Security Audit Trail & Mutation Log</h3>
              <p className="text-slate-500 text-[11px]">Immutable tracking of critical administrative changes.</p>
            </div>
            <Badge variant="slate">Encrypted Local Ledger</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Operator</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Action Executed</th>
                  <th className="p-3.5">Target Entity</th>
                  <th className="p-3.5">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-3.5 font-bold text-slate-900">{log.userName}</td>
                    <td className="p-3.5">
                      <Badge variant="indigo">{log.userRole}</Badge>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">{log.action}</td>
                    <td className="p-3.5 font-mono text-slate-600">{log.details}</td>
                    <td className="p-3.5 font-mono text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
