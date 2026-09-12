import React from 'react';
import { useERP } from '../../context/ERPContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import {
  Users,
  UserCheck,
  Receipt,
  BookOpen,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
  FileCheck,
  GraduationCap,
  Clock,
  Bus,
  CheckCircle,
  FileText,
  DollarSign,
  Printer
} from 'lucide-react';

interface RoleDashboardProps {
  onOpenReportCard: (studentId: string) => void;
  onOpenReceipt: (invoiceId: string) => void;
  onOpenLeaveModal: () => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  onOpenReportCard,
  onOpenReceipt,
  onOpenLeaveModal
}) => {
  const {
    currentRole,
    currentUser,
    currentBranch,
    students,
    staff,
    feeInvoices,
    attendanceRecords,
    homework,
    leaveApplications,
    notices,
    events,
    books,
    bookIssues,
    vehicles,
    ptmMeetings,
    setActiveModule
  } = useERP();

  // Metrics computation
  const totalStudents = students.filter(s => s.status === 'Active').length;
  const totalStaff = staff.filter(s => s.status === 'Active').length;

  const totalFeeInvoiced = feeInvoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalFeeCollected = feeInvoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const feeCollectionRate = totalFeeInvoiced > 0 ? ((totalFeeCollected / totalFeeInvoiced) * 100).toFixed(1) : '100';

  const todayStr = '2026-09-11';
  const todayStudentAtt = attendanceRecords.filter(r => r.entityType === 'student' && r.date === todayStr);
  const studentPresentCount = todayStudentAtt.filter(r => r.status === 'present').length;
  const attendanceRate = todayStudentAtt.length > 0
    ? ((studentPresentCount / todayStudentAtt.length) * 100).toFixed(0)
    : '94';

  const pendingLeaves = leaveApplications.filter(l => l.status === 'Pending');
  const defaulterStudents = students.filter(s => (s.academicRecord?.attendancePercent || 100) < 75);

  // TEACHER SPECIFIC
  if (currentRole === 'teacher') {
    return (
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 text-xs font-semibold bg-white/20 rounded-full inline-block mb-2">
              Faculty Workspace • Grade 10-A
            </span>
            <h2 className="text-xl font-bold">Welcome back, {currentUser.name}!</h2>
            <p className="text-xs text-indigo-200 mt-1">
              You have 4 teaching periods today. Class 10-A attendance is due for verification.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveModule('attendance')}
              className="px-3.5 py-2 text-xs font-semibold bg-white text-indigo-900 hover:bg-indigo-50 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" /> Take Attendance
            </button>
            <button
              onClick={() => setActiveModule('homework')}
              className="px-3.5 py-2 text-xs font-semibold bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Post Homework
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Class 10-A Students"
            value={32}
            subtitle="28 Present today"
            icon={Users}
            colorTheme="indigo"
          />
          <StatCard
            title="Assignments Assigned"
            value={homework.length}
            subtitle="2 awaiting grading"
            icon={BookOpen}
            colorTheme="sky"
          />
          <StatCard
            title="Syllabus Progress"
            value="68%"
            subtitle="Term 1 Physics & Science"
            icon={FileCheck}
            colorTheme="emerald"
          />
          <StatCard
            title="Upcoming PTM Slots"
            value={ptmMeetings.length}
            subtitle="Scheduled for Sep 26"
            icon={Calendar}
            colorTheme="amber"
          />
        </div>

        {/* Today's Schedule & Actionable Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Today's Teaching Schedule (Friday)
              </h3>
              <button
                onClick={() => setActiveModule('timetable')}
                className="text-xs text-indigo-600 hover:underline font-semibold"
              >
                View Full Timetable
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-indigo-900 text-sm">Period 1 (08:30 - 09:15)</span>
                  <p className="text-slate-600">Advanced Science & Physics • Grade 10-A (Science Lab 3)</p>
                </div>
                <Badge variant="indigo">In Progress / Done</Badge>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 text-sm">Period 3 (10:20 - 11:05)</span>
                  <p className="text-slate-600">General Science Practical • Grade 9-A (Physics Lab 1)</p>
                </div>
                <Badge variant="slate">Upcoming</Badge>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 text-sm">Period 5 (01:15 - 02:00)</span>
                  <p className="text-slate-600">Science Olympiad Prep Clinic • Multipurpose Hall</p>
                </div>
                <Badge variant="slate">Upcoming</Badge>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Attendance Shortage Watch
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Students requiring academic intervention (&lt;75% attendance):
              </p>
              <div className="space-y-2">
                {defaulterStudents.map(s => (
                  <div key={s.id} className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{s.firstName} {s.lastName}</p>
                      <p className="text-[10px] text-amber-800">Attendance: {s.academicRecord?.attendancePercent}%</p>
                    </div>
                    <button
                      onClick={() => setActiveModule('attendance')}
                      className="text-[10px] font-bold text-amber-900 underline"
                    >
                      Alert Parent
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setActiveModule('examinations')}
              className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Enter Exam Marks & Grades
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STUDENT SPECIFIC
  if (currentRole === 'student') {
    const student = students.find(s => s.id === 'stu-1') || students[0];
    return (
      <div className="space-y-6">
        {/* Student Banner */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={student.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-white object-cover" />
            <div>
              <span className="px-2 py-0.5 text-xs font-semibold bg-white/20 rounded-full inline-block mb-1">
                Student Portal • {student.rollNo}
              </span>
              <h2 className="text-xl font-bold">{student.firstName} {student.lastName}</h2>
              <p className="text-xs text-emerald-100">
                Grade 10 - Section A • Greenwood World Academy ({currentBranch.name.split('-')[1]?.trim()})
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenReportCard(student.id)}
              className="px-4 py-2 text-xs font-semibold bg-white text-emerald-950 hover:bg-emerald-50 rounded-lg shadow-xs flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-700" /> View Report Card
            </button>
          </div>
        </div>

        {/* Student Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Attendance Record"
            value={`${student.academicRecord?.attendancePercent}%`}
            subtitle="Above 75% requirement"
            icon={UserCheck}
            colorTheme="emerald"
          />
          <StatCard
            title="Cumulative GPA"
            value={`${student.academicRecord?.gpa} / 4.0`}
            subtitle="Top 5 percentile"
            icon={GraduationCap}
            colorTheme="indigo"
          />
          <StatCard
            title="Pending Assignments"
            value="1"
            subtitle="Kinematics due Sep 15"
            icon={BookOpen}
            colorTheme="amber"
          />
          <StatCard
            title="Fee Dues"
            value="$0.00"
            subtitle="Term 1 Cleared"
            icon={Receipt}
            colorTheme="sky"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-3 mb-4 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Active Homework & Project Tasks
            </h3>
            <div className="space-y-3">
              {homework.map(hw => (
                <div key={hw.id} className="p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{hw.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{hw.description}</p>
                    </div>
                    <Badge variant={hw.id === 'hw-1' ? 'emerald' : 'amber'}>
                      {hw.id === 'hw-1' ? 'Submitted (48/50)' : 'Pending Due'}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                    <span>Due: {hw.dueDate}</span>
                    <span>Max Marks: {hw.maxMarks}</span>
                    <span>Attachment: {hw.attachmentName || 'None'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Borrowed Library Books
            </h3>
            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/40 text-xs">
              <p className="font-bold text-slate-900">Principles of Modern Physics</p>
              <p className="text-[11px] text-slate-500">Halliday, Resnick & Walker</p>
              <p className="text-[10px] text-emerald-700 mt-1 font-mono">Due Date: 2026-09-20 (No fine)</p>
            </div>
            <button
              onClick={() => setActiveModule('library')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
            >
              Browse Library Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PARENT SPECIFIC
  if (currentRole === 'parent') {
    const parentStudent = students.find(s => s.id === 'stu-1') || students[0];
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 text-xs font-semibold bg-white/20 rounded-full inline-block mb-1">
              Parent Portal • Family Account
            </span>
            <h2 className="text-xl font-bold">Guardian: Michael & Elena Vance</h2>
            <p className="text-xs text-blue-200 mt-1">
              Enrolled Children: Lucas Vance (Grade 10-A), Emma Vance (Grade 6-A)
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenReceipt('inv-2025-01')}
              className="px-4 py-2 text-xs font-semibold bg-white text-indigo-950 hover:bg-indigo-50 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Download Fee Receipt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Lucas's Attendance"
            value="96.4%"
            subtitle="Punctual (31/32 days)"
            icon={UserCheck}
            colorTheme="emerald"
          />
          <StatCard
            title="Term 1 Fee Status"
            value="Paid ($3,700)"
            subtitle="Receipt RCP-2025-0891"
            icon={Receipt}
            colorTheme="sky"
          />
          <StatCard
            title="Next PTM Consultation"
            value="Sep 26"
            subtitle="10:00 AM with Sarah Jenkins"
            icon={Calendar}
            colorTheme="amber"
          />
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
            <span>Academic Performance: Lucas Vance (Grade 10-A)</span>
            <button
              onClick={() => onOpenReportCard(parentStudent.id)}
              className="text-xs text-indigo-600 hover:underline font-bold"
            >
              View Official Marksheet &rarr;
            </button>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <p className="text-slate-500">Science</p>
              <p className="text-lg font-bold text-indigo-700">94 / 100</p>
              <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <p className="text-slate-500">Mathematics</p>
              <p className="text-lg font-bold text-indigo-700">96 / 100</p>
              <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <p className="text-slate-500">English</p>
              <p className="text-lg font-bold text-indigo-700">90 / 100</p>
              <span className="text-[10px] text-emerald-600 font-bold">Grade A</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <p className="text-slate-500">Computer Science</p>
              <p className="text-lg font-bold text-indigo-700">98 / 100</p>
              <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <p className="text-slate-500">History</p>
              <p className="text-lg font-bold text-indigo-700">89 / 100</p>
              <span className="text-[10px] text-emerald-600 font-bold">Grade A</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACCOUNTANT SPECIFIC
  if (currentRole === 'accountant') {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-emerald-950 to-teal-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 text-xs font-semibold bg-white/20 rounded-full inline-block mb-1">
              Bursar & Finance Workspace
            </span>
            <h2 className="text-xl font-bold">Financial Overview • Term 1</h2>
            <p className="text-xs text-emerald-200 mt-1">
              Current Session: 2025-2026 • Campus: {currentBranch.name}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveModule('finance')}
              className="px-4 py-2 text-xs font-semibold bg-white text-emerald-950 hover:bg-emerald-50 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Collect Fee Payment
            </button>
            <button
              onClick={() => setActiveModule('payroll')}
              className="px-4 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4" /> Process Payroll
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Invoiced"
            value={`$${totalFeeInvoiced.toLocaleString()}`}
            subtitle="Academic Session Dues"
            icon={Receipt}
            colorTheme="slate"
          />
          <StatCard
            title="Total Collected"
            value={`$${totalFeeCollected.toLocaleString()}`}
            subtitle={`${feeCollectionRate}% collection rate`}
            icon={CheckCircle}
            colorTheme="emerald"
          />
          <StatCard
            title="Outstanding Balance"
            value={`$${(totalFeeInvoiced - totalFeeCollected).toLocaleString()}`}
            subtitle="Uncollected term fees"
            icon={AlertTriangle}
            colorTheme="rose"
          />
          <StatCard
            title="Monthly Payroll"
            value="$47,500"
            subtitle="7 Staff members active"
            icon={DollarSign}
            colorTheme="indigo"
          />
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
            <span>Recent Fee Transactions & Vouchers</span>
            <button
              onClick={() => setActiveModule('finance')}
              className="text-xs text-indigo-600 hover:underline font-bold"
            >
              Open Finance Hub &rarr;
            </button>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Paid</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeInvoices.map(inv => {
                  const stu = students.find(s => s.id === inv.studentId);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-semibold">{inv.invoiceNo}</td>
                      <td className="p-3 font-medium text-slate-900">{stu?.firstName} {stu?.lastName}</td>
                      <td className="p-3 text-slate-600">{inv.title}</td>
                      <td className="p-3 font-mono">${inv.totalAmount}</td>
                      <td className="p-3 font-mono text-emerald-700 font-bold">${inv.paidAmount}</td>
                      <td className="p-3">
                        <Badge variant={inv.status === 'Paid' ? 'emerald' : inv.status === 'Partial' ? 'amber' : 'rose'}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onOpenReceipt(inv.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                        >
                          Print Receipt
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
    );
  }

  // EXECUTIVE DASHBOARD (Super Admin / School Admin / Principal / Vice Principal)
  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full">
              Executive Dashboard • {currentRole.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">
              Campus: <strong>{currentBranch.name}</strong>
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Institutional Operations Center</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Academic Session 2025-2026 is underway. All 5 grade levels operating at full capacity.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveModule('students')}
            className="px-3.5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Enroll Student
          </button>
          <button
            onClick={() => setActiveModule('communication')}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Issue Announcement
          </button>
          <button
            onClick={() => setActiveModule('reports')}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" /> Comprehensive Reports
          </button>
        </div>
      </div>

      {/* Key Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtitle="Across 5 Class Grades"
          trend={{ value: '+4.2% YoY', isPositive: true }}
          icon={Users}
          colorTheme="indigo"
          onClick={() => setActiveModule('students')}
        />
        <StatCard
          title="Staff & Faculty"
          value={totalStaff}
          subtitle="100% attendance verified"
          icon={UserCheck}
          colorTheme="emerald"
          onClick={() => setActiveModule('staff')}
        />
        <StatCard
          title="Daily Student Attendance"
          value={`${attendanceRate}%`}
          subtitle="Today's live roll call"
          icon={Calendar}
          colorTheme="sky"
          onClick={() => setActiveModule('attendance')}
        />
        <StatCard
          title="Fee Collection Rate"
          value={`${feeCollectionRate}%`}
          subtitle={`$${totalFeeCollected.toLocaleString()} of $${totalFeeInvoiced.toLocaleString()}`}
          trend={{ value: 'On Track', isPositive: true }}
          icon={Receipt}
          colorTheme="amber"
          onClick={() => setActiveModule('finance')}
        />
      </div>

      {/* Actionable Alerts & Defaulters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Action Queue & Recent Notices */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approval Queue */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Pending Approvals & Action Items
              </h3>
              <Badge variant={pendingLeaves.length > 0 ? 'amber' : 'emerald'}>
                {pendingLeaves.length} Pending
              </Badge>
            </div>

            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No pending leave or admission approvals.</p>
            ) : (
              <div className="space-y-3">
                {pendingLeaves.map(leave => (
                  <div
                    key={leave.id}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {leave.applicantType === 'staff' ? 'Staff Leave Request' : 'Student Leave'}
                        </span>
                        <Badge variant="amber">{leave.leaveType}</Badge>
                      </div>
                      <p className="text-slate-600 mt-1">
                        Dates: {leave.startDate} to {leave.endDate} • Reason: "{leave.reason}"
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActiveModule('leave')}
                        className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded text-xs font-semibold"
                      >
                        Review & Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notice Board Stream */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-indigo-600" /> Institutional Announcements
              </h3>
              <button
                onClick={() => setActiveModule('communication')}
                className="text-xs text-indigo-600 hover:underline font-semibold"
              >
                Manage Board &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {notices.map(notice => (
                <div key={notice.id} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">{notice.title}</h4>
                    <Badge variant={notice.priority === 'Urgent' ? 'rose' : 'blue'}>
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notice.content}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">
                    By {notice.authorName} ({notice.authorRole}) • Published {notice.publishedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Attendance Shortage Watch & Quick Fleet/Library summary */}
        <div className="space-y-6">
          {/* Attendance Shortage */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-3 mb-3 border-b border-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Attendance Defaulters Alert
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Mandatory minimum required is <strong>75.0%</strong>. Automated warnings sent to guardians:
            </p>
            <div className="space-y-2">
              {defaulterStudents.map(s => (
                <div key={s.id} className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{s.firstName} {s.lastName}</p>
                    <p className="text-[11px] text-slate-500">{s.rollNo} • Adm #{s.admissionNo}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-rose-700 font-mono">
                      {s.academicRecord?.attendancePercent}%
                    </span>
                    <button
                      onClick={() => setActiveModule('attendance')}
                      className="block text-[10px] text-indigo-600 hover:underline font-semibold mt-0.5"
                    >
                      Audit Record
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Operations Snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
              <Bus className="w-4 h-4 text-indigo-600" /> Operational Readiness
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Transport Fleet:</span>
                <span className="font-semibold text-slate-900">{vehicles.filter(v => v.status === 'Active').length} / {vehicles.length} Buses Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Library Circulation:</span>
                <span className="font-semibold text-slate-900">{bookIssues.filter(b => b.status === 'Issued').length} Books on Loan</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Active Campus:</span>
                <span className="font-semibold text-indigo-700">{currentBranch.code}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
