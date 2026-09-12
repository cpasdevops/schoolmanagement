import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { AttendanceRecord, AttendanceStatus, Student, StaffMember } from '../../../types/erp';
import {
  UserCheck,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  History,
  Save,
  CheckCheck
} from 'lucide-react';
import { Badge } from '../../common/Badge';

export const AttendanceManager: React.FC = () => {
  const {
    students,
    staff,
    classes,
    attendanceRecords,
    recordAttendance,
    currentUser,
    currentRole
  } = useERP();

  const [activeTab, setActiveTab] = useState<'student' | 'staff'>('student');
  const [selectedDate, setSelectedDate] = useState('2026-09-11');
  const [selectedClassId, setSelectedClassId] = useState('class-gr10');
  const [selectedSectionId, setSelectedSectionId] = useState('sec-10a');

  // Filter students for the active class & section
  const classStudents = students.filter(
    s => s.classId === selectedClassId && s.status === 'Active'
  );

  // Local editing attendance map
  const [attendanceDraft, setAttendanceDraft] = useState<Record<string, { status: AttendanceStatus; remarks: string }>>(() => {
    const initial: Record<string, { status: AttendanceStatus; remarks: string }> = {};
    attendanceRecords.forEach(r => {
      if (r.date === '2026-09-11') {
        initial[r.entityId] = { status: r.status, remarks: r.remarks || '' };
      }
    });
    return initial;
  });

  const getEntityStatus = (entityId: string): AttendanceStatus => {
    if (attendanceDraft[entityId]) return attendanceDraft[entityId].status;
    const existing = attendanceRecords.find(
      r => r.date === selectedDate && r.entityId === entityId
    );
    return existing ? existing.status : 'present';
  };

  const getEntityRemarks = (entityId: string): string => {
    if (attendanceDraft[entityId]) return attendanceDraft[entityId].remarks;
    const existing = attendanceRecords.find(
      r => r.date === selectedDate && r.entityId === entityId
    );
    return existing?.remarks || '';
  };

  const handleSetStatus = (entityId: string, status: AttendanceStatus) => {
    setAttendanceDraft(prev => ({
      ...prev,
      [entityId]: {
        status,
        remarks: prev[entityId]?.remarks || ''
      }
    }));
  };

  const handleSetRemarks = (entityId: string, remarks: string) => {
    setAttendanceDraft(prev => ({
      ...prev,
      [entityId]: {
        status: prev[entityId]?.status || getEntityStatus(entityId),
        remarks
      }
    }));
  };

  const handleMarkAllPresent = () => {
    const next: Record<string, { status: AttendanceStatus; remarks: string }> = { ...attendanceDraft };
    if (activeTab === 'student') {
      classStudents.forEach(s => {
        next[s.id] = { status: 'present', remarks: '' };
      });
    } else {
      staff.forEach(st => {
        next[st.id] = { status: 'present', remarks: '' };
      });
    }
    setAttendanceDraft(next);
  };

  const handleSaveAttendance = () => {
    const listToRecord: AttendanceRecord[] = [];
    if (activeTab === 'student') {
      classStudents.forEach(s => {
        const state = attendanceDraft[s.id] || { status: getEntityStatus(s.id), remarks: getEntityRemarks(s.id) };
        listToRecord.push({
          id: `att-${Date.now()}-${s.id}`,
          date: selectedDate,
          entityType: 'student',
          entityId: s.id,
          classId: selectedClassId,
          sectionId: selectedSectionId,
          status: state.status,
          remarks: state.remarks,
          recordedBy: currentUser.name
        });
      });
    } else {
      staff.forEach(st => {
        const state = attendanceDraft[st.id] || { status: getEntityStatus(st.id), remarks: getEntityRemarks(st.id) };
        listToRecord.push({
          id: `att-st-${Date.now()}-${st.id}`,
          date: selectedDate,
          entityType: 'staff',
          entityId: st.id,
          status: state.status,
          remarks: state.remarks,
          recordedBy: currentUser.name
        });
      });
    }

    recordAttendance(listToRecord);
  };

  // Summary counts
  const targetList = activeTab === 'student' ? classStudents : staff;
  const presentCount = targetList.filter(item => getEntityStatus(item.id) === 'present').length;
  const absentCount = targetList.filter(item => getEntityStatus(item.id) === 'absent').length;
  const lateCount = targetList.filter(item => getEntityStatus(item.id) === 'late').length;
  const rate = targetList.length > 0 ? ((presentCount / targetList.length) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Attendance Register & Defaulter Tracking</h2>
          <p className="text-xs text-slate-500">
            Daily roll call, subject-wise verification, shortage alerts, and staff biometric logging.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'student' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Student Roll Call
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'staff' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Staff & Faculty
            </button>
          </div>
        </div>
      </div>

      {/* Selector & Actions Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            />
          </div>

          {activeTab === 'student' && (
            <>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Class:</span>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Section:</span>
                <select
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="sec-10a">Section A</option>
                  <option value="sec-10b">Section B</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> Mark All Present
          </button>
          <button
            onClick={handleSaveAttendance}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Save Attendance
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
          <span className="text-slate-500">Total Enrolled</span>
          <span className="text-base font-bold text-slate-900">{targetList.length}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
          <span className="text-slate-500">Present Count</span>
          <span className="text-base font-bold text-emerald-600">{presentCount}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
          <span className="text-slate-500">Absent Count</span>
          <span className="text-base font-bold text-rose-600">{absentCount}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
          <span className="text-slate-500">Attendance Rate</span>
          <span className="text-base font-bold text-indigo-600">{rate}%</span>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">{activeTab === 'student' ? 'Student Details' : 'Staff Member'}</th>
                <th className="p-3.5">{activeTab === 'student' ? 'Roll / Admission #' : 'Employee Code & Dept'}</th>
                <th className="p-3.5 text-center">Status Selection</th>
                <th className="p-3.5">Remarks / Reason</th>
                <th className="p-3.5 text-right">Cumulative Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {targetList.map(item => {
                const currentStatus = getEntityStatus(item.id);
                const currentRemarks = getEntityRemarks(item.id);

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{item.firstName} {item.lastName}</p>
                          <p className="text-[10px] text-slate-400">{item.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono">
                      {activeTab === 'student' ? (
                        <>
                          <span className="font-semibold text-slate-800">{(item as Student).rollNo}</span>
                          <span className="block text-[10px] text-slate-400">{(item as Student).admissionNo}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-slate-800">{(item as StaffMember).employeeCode}</span>
                          <span className="block text-[10px] text-slate-500">{(item as StaffMember).department}</span>
                        </>
                      )}
                    </td>

                    {/* Status Pill Toggle Buttons */}
                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSetStatus(item.id, 'present')}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetStatus(item.id, 'absent')}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetStatus(item.id, 'late')}
                          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                            currentStatus === 'late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetStatus(item.id, 'excused')}
                          className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                            currentStatus === 'excused'
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </td>

                    {/* Remarks Input */}
                    <td className="p-3.5">
                      <input
                        type="text"
                        value={currentRemarks}
                        onChange={(e) => handleSetRemarks(item.id, e.target.value)}
                        placeholder="Optional note (e.g. medical, traffic delay)..."
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded outline-none focus:border-indigo-500 bg-white"
                      />
                    </td>

                    {/* Cumulative % */}
                    <td className="p-3.5 text-right font-mono">
                      {activeTab === 'student' ? (
                        <div>
                          <span
                            className={`font-bold ${
                              ((item as Student).academicRecord?.attendancePercent || 100) < 75
                                ? 'text-rose-600'
                                : 'text-emerald-700'
                            }`}
                          >
                            {(item as Student).academicRecord?.attendancePercent || 95}%
                          </span>
                          <span className="block text-[10px] text-slate-400">Cumulative</span>
                        </div>
                      ) : (
                        <span className="font-bold text-slate-700">98.2%</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
