import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { StaffMember, LeaveApplication, PayrollRecord } from '../../../types/erp';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Mail,
  Phone,
  Calendar,
  FileText,
  Printer,
  Award
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const StaffManager: React.FC = () => {
  const {
    staff,
    leaveApplications,
    payrollRecords,
    addStaffMember,
    approveLeave,
    rejectLeave,
    addLeaveApplication,
    processPayroll,
    currentBranch,
    currentUser
  } = useERP();

  const [activeTab, setActiveTab] = useState<'directory' | 'leaves' | 'payroll'>('directory');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [selectedStaffForSlip, setSelectedStaffForSlip] = useState<StaffMember | null>(null);

  // New Staff Member state
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newDept, setNewDept] = useState('Academic');
  const [newDesignation, setNewDesignation] = useState('Senior Faculty');
  const [newQualification, setNewQualification] = useState('M.Sc., B.Ed');
  const [newSalary, setNewSalary] = useState(5800);
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+1 (555) 987-6543');

  // New Leave state
  const [leaveType, setLeaveType] = useState<'Sick' | 'Casual' | 'Maternity' | 'Academic' | 'Emergency'>('Casual');
  const [leaveStart, setLeaveStart] = useState('2026-09-20');
  const [leaveEnd, setLeaveEnd] = useState('2026-09-21');
  const [leaveReason, setLeaveReason] = useState('');

  const filteredStaff = staff.filter(st => {
    const matchesDept = departmentFilter === 'all' || st.department === departmentFilter;
    const matchesSearch =
      st.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName || !newLastName) return;

    addStaffMember({
      employeeCode: `EMP-2026-0${staff.length + 1}`,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail || `${newFirstName.toLowerCase()}@greenwood.edu`,
      phone: newPhone,
      department: newDept,
      designation: newDesignation,
      qualification: newQualification,
      joiningDate: new Date().toISOString().substring(0, 10),
      salary: Number(newSalary),
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      branchId: currentBranch.id
    });

    setShowAddStaffModal(false);
    setNewFirstName('');
    setNewLastName('');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason) return;

    addLeaveApplication({
      applicantType: 'staff',
      applicantId: 'staff-1',
      leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason,
      status: 'Pending',
      appliedAt: new Date().toISOString().substring(0, 10)
    });

    setShowApplyLeaveModal(false);
    setLeaveReason('');
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Faculty & Staff Management Hub</h2>
          <p className="text-xs text-slate-500">
            Employee profiles, departmental rosters, leave approvals, and monthly salary payroll.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'directory' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Faculty Directory
            </button>
            <button
              onClick={() => setActiveTab('leaves')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'leaves' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Leave Requests ({leaveApplications.filter(l => l.status === 'Pending').length})
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'payroll' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Payroll & Salaries
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: FACULTY DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-1 items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, code, designation..."
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                <option value="all">All Departments</option>
                <option value="Academic">Academic / Teaching</option>
                <option value="Finance">Finance & Bursar</option>
                <option value="Library">Library</option>
                <option value="Front Office">Front Office</option>
                <option value="Transport">Fleet & Transport</option>
              </select>

              <button
                onClick={() => setShowAddStaffModal(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Employee
              </button>
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStaff.map(st => (
              <div
                key={st.id}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={st.avatar}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{st.firstName} {st.lastName}</h3>
                      <p className="text-xs text-indigo-700 font-medium">{st.designation}</p>
                      <span className="font-mono text-[10px] text-slate-400">{st.employeeCode}</span>
                    </div>
                  </div>
                  <Badge variant={st.status === 'Active' ? 'emerald' : 'slate'}>{st.status}</Badge>
                </div>

                <div className="space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <strong className="text-slate-900">{st.department}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Qualification:</span>
                    <strong className="text-slate-900">{st.qualification}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Salary:</span>
                    <strong className="font-mono text-emerald-700">${st.salary.toLocaleString()} / mo</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Joining Date:</span>
                    <span className="font-mono text-slate-700">{st.joiningDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {st.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {st.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LEAVE APPLICATIONS */}
      {activeTab === 'leaves' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Staff & Student Leave Approval Workflow</h3>
            <button
              onClick={() => setShowApplyLeaveModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Apply for Leave
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Applicant</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Dates Duration</th>
                    <th className="p-3.5">Reason</th>
                    <th className="p-3.5">Applied Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Workflow Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaveApplications.map(leave => {
                    const applicant = staff.find(s => s.id === leave.applicantId);

                    return (
                      <tr key={leave.id} className="hover:bg-slate-50">
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-900">
                            {applicant ? `${applicant.firstName} ${applicant.lastName}` : 'Faculty Staff Member'}
                          </div>
                          <span className="text-[10px] text-slate-400 capitalize">{leave.applicantType}</span>
                        </td>
                        <td className="p-3.5">
                          <Badge variant="indigo">{leave.leaveType}</Badge>
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          {leave.startDate} to {leave.endDate}
                        </td>
                        <td className="p-3.5 text-slate-600 max-w-xs">{leave.reason}</td>
                        <td className="p-3.5 font-mono text-slate-400">{leave.appliedAt}</td>
                        <td className="p-3.5">
                          <Badge
                            variant={
                              leave.status === 'Approved'
                                ? 'emerald'
                                : leave.status === 'Rejected'
                                ? 'rose'
                                : leave.status === 'Pending'
                                ? 'amber'
                                : 'slate'
                            }
                          >
                            {leave.status}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-right">
                          {leave.status === 'Pending' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => approveLeave(leave.id, 'Approved by Academic Dean')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                              >
                                <CheckCircle className="w-3 h-3" /> Approve
                              </button>
                              <button
                                onClick={() => rejectLeave(leave.id, 'Documentation insufficient')}
                                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                              >
                                <XCircle className="w-3 h-3" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">Completed</span>
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
      )}

      {/* TAB 3: PAYROLL & SALARIES */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Monthly Payroll Disbursement: September 2026</h3>
              <p className="text-xs text-slate-500">
                Total monthly liability: <strong>$43,700.00</strong> across {staff.length} staff members.
              </p>
            </div>
            <button
              onClick={() => processPayroll('September', 2026)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <DollarSign className="w-4 h-4" /> Process & Disburse All Salaries
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Employee</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5 text-right">Base Pay</th>
                    <th className="p-3.5 text-right">Allowances</th>
                    <th className="p-3.5 text-right">Tax & Deductions</th>
                    <th className="p-3.5 text-right">Net Salary</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staff.map(st => {
                    const base = st.salary;
                    const allowances = 450;
                    const deductions = 320;
                    const net = base + allowances - deductions;

                    return (
                      <tr key={st.id} className="hover:bg-slate-50">
                        <td className="p-3.5">
                          <p className="font-bold text-slate-900">{st.firstName} {st.lastName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{st.employeeCode}</p>
                        </td>
                        <td className="p-3.5 text-slate-700">{st.department}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-slate-800">${base.toLocaleString()}</td>
                        <td className="p-3.5 text-right font-mono text-emerald-700 font-medium">+${allowances}</td>
                        <td className="p-3.5 text-right font-mono text-rose-600 font-medium">-${deductions}</td>
                        <td className="p-3.5 text-right font-mono font-bold text-sm text-indigo-950">
                          ${net.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <Badge variant="emerald">Disbursed (Sep 01)</Badge>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => window.print()}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Printer className="w-3 h-3" /> Payslip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      <Modal
        isOpen={showAddStaffModal}
        onClose={() => setShowAddStaffModal(false)}
        title="Register Faculty / Staff Employee"
        subtitle="Registers personnel file, allocates department, and creates payroll baseline."
        maxWidth="md"
      >
        <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                placeholder="e.g. Julian"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                placeholder="e.g. Sterling"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="Academic">Academic / Faculty</option>
                <option value="Administration">Administration</option>
                <option value="Finance">Finance / Bursar</option>
                <option value="Library">Library</option>
                <option value="Transport">Transport & Fleet</option>
                <option value="Front Office">Front Office</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Designation</label>
              <input
                type="text"
                required
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                placeholder="e.g. Assistant Professor"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
              <input
                type="text"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                placeholder="e.g. M.Ed., Ph.D."
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monthly Salary ($)</label>
              <input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddStaffModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Enroll Employee
            </button>
          </div>
        </form>
      </Modal>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={showApplyLeaveModal}
        onClose={() => setShowApplyLeaveModal(false)}
        title="Submit Leave Application"
        subtitle="Routes leave requisition to Principal / Department Head for approval."
        maxWidth="md"
      >
        <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Leave Category</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as any)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            >
              <option value="Casual">Casual Leave</option>
              <option value="Sick">Sick / Medical Leave</option>
              <option value="Academic">Academic Seminar / Training</option>
              <option value="Emergency">Family Emergency</option>
              <option value="Maternity">Maternity Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={leaveStart}
                onChange={(e) => setLeaveStart(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={leaveEnd}
                onChange={(e) => setLeaveEnd(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reason / Substitute Arrangement</label>
            <textarea
              required
              rows={3}
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="State reasons for absence and any substitute teaching arrangements..."
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowApplyLeaveModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Submit Requisition
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
