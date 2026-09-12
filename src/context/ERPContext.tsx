import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Role,
  User,
  Branch,
  AcademicSession,
  ClassGrade,
  Subject,
  Student,
  ParentGuardian,
  StaffMember,
  AttendanceRecord,
  TimetableSlot,
  HomeworkAssignment,
  HomeworkSubmission,
  Examination,
  ExamScheduleItem,
  ExamResultRecord,
  FeeStructure,
  FeeInvoice,
  FeePayment,
  LeaveApplication,
  Book,
  BookIssue,
  Vehicle,
  TransportRoute,
  Notice,
  SchoolEvent,
  PTMMeeting,
  DisciplineRecord,
  HealthRecord,
  CertificateRecord,
  VisitorLog,
  ComplaintFeedback,
  InventoryItem,
  AuditLog,
  NotificationItem,
  RolePermissionMatrix
} from '../types/erp';
import {
  initialBranches,
  initialAcademicSessions,
  initialClasses,
  initialSubjects,
  initialParents,
  initialStudents,
  initialStaff,
  sampleUsers,
  initialAttendanceRecords,
  initialTimetableSlots,
  initialHomework,
  initialSubmissions,
  initialExaminations,
  initialExamSchedules,
  initialExamResults,
  initialFeeStructures,
  initialFeeInvoices,
  initialLeaveApplications,
  initialBooks,
  initialBookIssues,
  initialVehicles,
  initialTransportRoutes,
  initialNotices,
  initialEvents,
  initialPTMMeetings,
  initialDisciplineRecords,
  initialHealthRecords,
  initialCertificates,
  initialVisitorLogs,
  initialComplaints,
  initialInventory,
  initialAuditLogs,
  initialNotifications,
  initialRolePermissions
} from '../data/seedData';

interface ERPContextType {
  currentRole: Role;
  currentUser: User;
  currentBranch: Branch;
  currentSession: AcademicSession;
  activeModule: string;
  branches: Branch[];
  academicSessions: AcademicSession[];
  classes: ClassGrade[];
  subjects: Subject[];
  students: Student[];
  parents: ParentGuardian[];
  staff: StaffMember[];
  attendanceRecords: AttendanceRecord[];
  timetableSlots: TimetableSlot[];
  homework: HomeworkAssignment[];
  homeworkSubmissions: HomeworkSubmission[];
  examinations: Examination[];
  examSchedules: ExamScheduleItem[];
  examResults: ExamResultRecord[];
  feeStructures: FeeStructure[];
  feeInvoices: FeeInvoice[];
  leaveApplications: LeaveApplication[];
  books: Book[];
  bookIssues: BookIssue[];
  vehicles: Vehicle[];
  transportRoutes: TransportRoute[];
  notices: Notice[];
  events: SchoolEvent[];
  ptmMeetings: PTMMeeting[];
  disciplineRecords: DisciplineRecord[];
  healthRecords: HealthRecord[];
  certificates: CertificateRecord[];
  visitorLogs: VisitorLog[];
  complaints: ComplaintFeedback[];
  inventory: InventoryItem[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  rolePermissions: RolePermissionMatrix[];
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;

  // Actions
  switchRole: (role: Role) => void;
  switchBranch: (branchId: string) => void;
  switchSession: (sessionId: string) => void;
  setActiveModule: (moduleId: string) => void;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;

  // Domain Actions
  addStudent: (student: Omit<Student, 'id' | 'admissionNo' | 'academicRecord'>) => Student;
  updateStudent: (id: string, data: Partial<Student>) => void;
  recordAttendance: (records: AttendanceRecord[]) => void;
  addHomework: (assignment: Omit<HomeworkAssignment, 'id' | 'submissionsCount' | 'totalStudents'>) => void;
  gradeHomework: (submissionId: string, marks: number, feedback: string) => void;
  recordExamMarks: (results: Omit<ExamResultRecord, 'id'>[]) => void;
  recordFeePayment: (invoiceId: string, payment: Omit<FeePayment, 'id' | 'receiptNo' | 'paymentDate'>) => void;
  createFeeInvoice: (invoice: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'payments' | 'paidAmount'>) => void;
  applyLeave: (leave: Omit<LeaveApplication, 'id' | 'status' | 'appliedDate'>) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected', remarks?: string) => void;
  issueBook: (bookId: string, borrowerType: 'student' | 'staff', borrowerId: string, dueDate: string) => void;
  returnBook: (issueId: string) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'publishedDate' | 'authorName' | 'authorRole'>) => void;
  addEvent: (event: Omit<SchoolEvent, 'id'>) => void;
  schedulePTM: (ptm: Omit<PTMMeeting, 'id' | 'status'>) => void;
  recordDiscipline: (disc: Omit<DisciplineRecord, 'id' | 'reportedBy' | 'date'>) => void;
  updateHealthRecord: (studentId: string, data: Partial<HealthRecord>) => void;
  issueCertificate: (cert: Omit<CertificateRecord, 'id' | 'certificateNo' | 'issuedDate' | 'status'>) => void;
  addVisitorLog: (log: Omit<VisitorLog, 'id' | 'date' | 'status'>) => void;
  checkoutVisitor: (id: string, outTime: string) => void;
  addComplaint: (comp: Omit<ComplaintFeedback, 'id' | 'ticketNo' | 'date' | 'status'>) => void;
  resolveComplaint: (id: string, resolutionNotes: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryStock: (id: string, delta: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateRolePermission: (role: Role, key: keyof RolePermissionMatrix, value: boolean) => void;
  resetAllData: () => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

const STORAGE_KEY = 'school_erp_data_v1';

export const ERPProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state from localStorage or seed
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to initial
    }
    return {
      branches: initialBranches,
      academicSessions: initialAcademicSessions,
      classes: initialClasses,
      subjects: initialSubjects,
      students: initialStudents,
      parents: initialParents,
      staff: initialStaff,
      attendanceRecords: initialAttendanceRecords,
      timetableSlots: initialTimetableSlots,
      homework: initialHomework,
      homeworkSubmissions: initialSubmissions,
      examinations: initialExaminations,
      examSchedules: initialExamSchedules,
      examResults: initialExamResults,
      feeStructures: initialFeeStructures,
      feeInvoices: initialFeeInvoices,
      leaveApplications: initialLeaveApplications,
      books: initialBooks,
      bookIssues: initialBookIssues,
      vehicles: initialVehicles,
      transportRoutes: initialTransportRoutes,
      notices: initialNotices,
      events: initialEvents,
      ptmMeetings: initialPTMMeetings,
      disciplineRecords: initialDisciplineRecords,
      healthRecords: initialHealthRecords,
      certificates: initialCertificates,
      visitorLogs: initialVisitorLogs,
      complaints: initialComplaints,
      inventory: initialInventory,
      auditLogs: initialAuditLogs,
      notifications: initialNotifications,
      rolePermissions: initialRolePermissions
    };
  });

  const [currentRole, setCurrentRole] = useState<Role>('school_admin');
  const [currentBranchId, setCurrentBranchId] = useState<string>('branch-1');
  const [currentSessionId, setCurrentSessionId] = useState<string>('session-2025-26');
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore quota exceeded
    }
  }, [data]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const clearToast = () => setToastMessage(null);

  // Get active branch & session
  const currentBranch = data.branches.find((b: Branch) => b.id === currentBranchId) || data.branches[0];
  const currentSession = data.academicSessions.find((s: AcademicSession) => s.id === currentSessionId) || data.academicSessions[0];

  // Resolve current active user profile according to role
  const currentUser: User = (() => {
    const matched = sampleUsers.find(u => u.role === currentRole);
    if (matched) {
      return { ...matched, branchId: currentBranchId };
    }
    return {
      id: `user-${currentRole}`,
      name: currentRole.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: `${currentRole}@greenwood.edu`,
      role: currentRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      branchId: currentBranchId
    };
  })();

  const addAuditLog = (action: string, moduleName: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: currentUser.name,
      userRole: currentRole,
      action,
      module: moduleName,
      details,
      ipAddress: '192.168.1.102'
    };
    setData((prev: typeof data) => ({
      ...prev,
      auditLogs: [newLog, ...prev.auditLogs]
    }));
  };

  const switchRole = (role: Role) => {
    setCurrentRole(role);
    showToast(`Switched active persona to ${role.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const switchBranch = (branchId: string) => {
    setCurrentBranchId(branchId);
    const b = data.branches.find((br: Branch) => br.id === branchId);
    showToast(`Switched campus to ${b?.name || 'Selected Campus'}`, 'info');
  };

  const switchSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    const s = data.academicSessions.find((sess: AcademicSession) => sess.id === sessionId);
    showToast(`Switched academic session to ${s?.name || 'Selected Session'}`, 'info');
  };

  // Domain Handlers
  const addStudent = (studentData: Omit<Student, 'id' | 'admissionNo' | 'academicRecord'>): Student => {
    const nextNum = data.students.length + 1;
    const admissionNo = `GWA-2026-${String(nextNum).padStart(3, '0')}`;
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
      admissionNo,
      academicRecord: {
        previousSchool: 'Transfer Academy',
        gpa: 3.5,
        attendancePercent: 100
      }
    };

    setData((prev: typeof data) => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));

    addAuditLog('STUDENT_ADMITTED', 'Students', `Enrolled student ${newStudent.firstName} ${newStudent.lastName} (${admissionNo}) into class`);
    showToast(`Student ${newStudent.firstName} ${newStudent.lastName} registered successfully!`);
    return newStudent;
  };

  const updateStudent = (id: string, patch: Partial<Student>) => {
    setData((prev: typeof data) => ({
      ...prev,
      students: prev.students.map((s: Student) => (s.id === id ? { ...s, ...patch } : s))
    }));
    addAuditLog('STUDENT_UPDATED', 'Students', `Updated details for student ID: ${id}`);
    showToast('Student profile updated successfully');
  };

  const recordAttendance = (records: AttendanceRecord[]) => {
    setData((prev: typeof data) => {
      // replace or add records for that date & entity
      const keySet = new Set(records.map(r => `${r.date}_${r.entityId}`));
      const filtered = prev.attendanceRecords.filter((r: AttendanceRecord) => !keySet.has(`${r.date}_${r.entityId}`));
      return {
        ...prev,
        attendanceRecords: [...records, ...filtered]
      };
    });
    addAuditLog('ATTENDANCE_RECORDED', 'Attendance', `Submitted attendance records for ${records.length} individuals`);
    showToast(`Attendance marked for ${records.length} individuals.`);
  };

  const addHomework = (assignment: Omit<HomeworkAssignment, 'id' | 'submissionsCount' | 'totalStudents'>) => {
    const newHw: HomeworkAssignment = {
      ...assignment,
      id: `hw-${Date.now()}`,
      submissionsCount: 0,
      totalStudents: 32
    };
    setData((prev: typeof data) => ({
      ...prev,
      homework: [newHw, ...prev.homework],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `New Assignment: ${newHw.title}`,
          message: `Due date: ${newHw.dueDate}. Assigned to your class.`,
          type: 'info',
          timestamp: 'Just now',
          read: false,
          targetRole: 'student',
          linkToModule: 'homework'
        },
        ...prev.notifications
      ]
    }));
    addAuditLog('HOMEWORK_ASSIGNED', 'Homework', `Created assignment: ${newHw.title}`);
    showToast('Homework assignment published to students.');
  };

  const gradeHomework = (submissionId: string, marks: number, feedback: string) => {
    setData((prev: typeof data) => ({
      ...prev,
      homeworkSubmissions: prev.homeworkSubmissions.map((sub: HomeworkSubmission) =>
        sub.id === submissionId ? { ...sub, marksObtained: marks, feedback, status: 'Graded' } : sub
      )
    }));
    addAuditLog('HOMEWORK_GRADED', 'Homework', `Graded submission ID ${submissionId} with ${marks} marks`);
    showToast('Homework submission graded successfully');
  };

  const recordExamMarks = (results: Omit<ExamResultRecord, 'id'>[]) => {
    const newRecords: ExamResultRecord[] = results.map(r => ({
      ...r,
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    }));

    setData((prev: typeof data) => {
      // Replace existing matches for same exam, student, subject
      const keys = new Set(newRecords.map(nr => `${nr.examId}_${nr.studentId}_${nr.subjectId}`));
      const remaining = prev.examResults.filter((er: ExamResultRecord) => !keys.has(`${er.examId}_${er.studentId}_${er.subjectId}`));
      return {
        ...prev,
        examResults: [...newRecords, ...remaining]
      };
    });

    addAuditLog('EXAM_MARKS_RECORDED', 'Examinations', `Recorded / updated ${results.length} subject marks.`);
    showToast(`Recorded marks for ${results.length} subjects.`);
  };

  const recordFeePayment = (invoiceId: string, paymentData: Omit<FeePayment, 'id' | 'receiptNo' | 'paymentDate'>) => {
    const receiptNo = `RCP-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newPayment: FeePayment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      receiptNo,
      paymentDate: new Date().toISOString().substring(0, 10)
    };

    setData((prev: typeof data) => {
      const updatedInvoices = prev.feeInvoices.map((inv: FeeInvoice) => {
        if (inv.id !== invoiceId) return inv;
        const newPaid = inv.paidAmount + newPayment.amount;
        let newStatus: FeeInvoice['status'] = 'Partial';
        if (newPaid >= inv.totalAmount - inv.discountAmount) {
          newStatus = 'Paid';
        }
        return {
          ...inv,
          paidAmount: newPaid,
          status: newStatus,
          payments: [newPayment, ...inv.payments]
        };
      });

      return {
        ...prev,
        feeInvoices: updatedInvoices
      };
    });

    addAuditLog('FEE_PAYMENT_COLLECTED', 'Fees & Finance', `Recorded payment of $${paymentData.amount} for invoice ${invoiceId}, generated ${receiptNo}`);
    showToast(`Payment of $${paymentData.amount} logged! Receipt #${receiptNo}`);
  };

  const createFeeInvoice = (invoiceData: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'payments' | 'paidAmount'>) => {
    const invoiceNo = `INV-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newInvoice: FeeInvoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      invoiceNo,
      paidAmount: 0,
      payments: []
    };

    setData((prev: typeof data) => ({
      ...prev,
      feeInvoices: [newInvoice, ...prev.feeInvoices]
    }));

    addAuditLog('FEE_INVOICE_GENERATED', 'Fees & Finance', `Generated invoice ${invoiceNo} ($${newInvoice.totalAmount})`);
    showToast(`Invoice ${invoiceNo} generated successfully.`);
  };

  const applyLeave = (leave: Omit<LeaveApplication, 'id' | 'status' | 'appliedDate'>) => {
    const newLeave: LeaveApplication = {
      ...leave,
      id: `leave-${Date.now()}`,
      status: 'Pending',
      appliedDate: new Date().toISOString().substring(0, 10)
    };

    setData((prev: typeof data) => ({
      ...prev,
      leaveApplications: [newLeave, ...prev.leaveApplications],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `New Leave Request: ${leave.leaveType}`,
          message: `Pending review from applicant ID ${leave.applicantId}.`,
          type: 'info',
          timestamp: 'Just now',
          read: false,
          targetRole: 'principal',
          linkToModule: 'staff'
        },
        ...prev.notifications
      ]
    }));

    addAuditLog('LEAVE_APPLIED', 'Leave Management', `Applied for ${leave.leaveType} (${leave.startDate} to ${leave.endDate})`);
    showToast('Leave application submitted for approval.');
  };

  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected', remarks?: string) => {
    setData((prev: typeof data) => ({
      ...prev,
      leaveApplications: prev.leaveApplications.map((l: LeaveApplication) =>
        l.id === id ? { ...l, status, approvedBy: currentUser.name, approvalRemarks: remarks } : l
      )
    }));
    addAuditLog('LEAVE_REVIEWED', 'Leave Management', `Marked leave application ${id} as ${status}`);
    showToast(`Leave request ${status.toLowerCase()}.`);
  };

  const issueBook = (bookId: string, borrowerType: 'student' | 'staff', borrowerId: string, dueDate: string) => {
    const newIssue: BookIssue = {
      id: `iss-${Date.now()}`,
      bookId,
      borrowerType,
      borrowerId,
      issueDate: new Date().toISOString().substring(0, 10),
      dueDate,
      fineAmount: 0,
      status: 'Issued'
    };

    setData((prev: typeof data) => ({
      ...prev,
      bookIssues: [newIssue, ...prev.bookIssues],
      books: prev.books.map((b: Book) =>
        b.id === bookId ? { ...b, availableCopies: Math.max(0, b.availableCopies - 1) } : b
      )
    }));

    addAuditLog('BOOK_ISSUED', 'Library', `Issued book ID ${bookId} to ${borrowerType} ${borrowerId}`);
    showToast('Book issued successfully.');
  };

  const returnBook = (issueId: string) => {
    const target = data.bookIssues.find((i: BookIssue) => i.id === issueId);
    if (!target) return;

    setData((prev: typeof data) => ({
      ...prev,
      bookIssues: prev.bookIssues.map((i: BookIssue) =>
        i.id === issueId ? { ...i, status: 'Returned', returnDate: new Date().toISOString().substring(0, 10) } : i
      ),
      books: prev.books.map((b: Book) =>
        b.id === target.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b
      )
    }));

    addAuditLog('BOOK_RETURNED', 'Library', `Marked book issue ${issueId} as returned`);
    showToast('Book returned and inventory updated.');
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'publishedDate' | 'authorName' | 'authorRole'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
      publishedDate: new Date().toISOString().substring(0, 10),
      authorName: currentUser.name,
      authorRole: currentUser.designation || currentRole
    };

    setData((prev: typeof data) => ({
      ...prev,
      notices: [newNotice, ...prev.notices],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: `Announcement: ${newNotice.title}`,
          message: newNotice.content.substring(0, 80) + '...',
          type: newNotice.priority === 'Urgent' ? 'urgent' : 'info',
          timestamp: 'Just now',
          read: false,
          targetRole: 'all',
          linkToModule: 'communication'
        },
        ...prev.notifications
      ]
    }));

    addAuditLog('NOTICE_PUBLISHED', 'Communication', `Published notice: ${newNotice.title}`);
    showToast('Notice published successfully.');
  };

  const addEvent = (event: Omit<SchoolEvent, 'id'>) => {
    const newEvent: SchoolEvent = {
      ...event,
      id: `ev-${Date.now()}`
    };
    setData((prev: typeof data) => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));
    addAuditLog('EVENT_SCHEDULED', 'Events & Calendar', `Created event: ${newEvent.title}`);
    showToast('Event added to school calendar.');
  };

  const schedulePTM = (ptmData: Omit<PTMMeeting, 'id' | 'status'>) => {
    const newPTM: PTMMeeting = {
      ...ptmData,
      id: `ptm-${Date.now()}`,
      status: 'Scheduled'
    };
    setData((prev: typeof data) => ({
      ...prev,
      ptmMeetings: [newPTM, ...prev.ptmMeetings]
    }));
    addAuditLog('PTM_SCHEDULED', 'PTM Management', `Scheduled PTM slot on ${newPTM.date} at ${newPTM.timeSlot}`);
    showToast('PTM consultation slot scheduled.');
  };

  const recordDiscipline = (disc: Omit<DisciplineRecord, 'id' | 'reportedBy' | 'date'>) => {
    const newRecord: DisciplineRecord = {
      ...disc,
      id: `disc-${Date.now()}`,
      reportedBy: currentUser.name,
      date: new Date().toISOString().substring(0, 10)
    };
    setData((prev: typeof data) => ({
      ...prev,
      disciplineRecords: [newRecord, ...prev.disciplineRecords]
    }));
    addAuditLog('DISCIPLINE_RECORDED', 'Discipline', `Logged ${disc.incidentType} (${disc.points} pts) for student ${disc.studentId}`);
    showToast('Discipline record logged.');
  };

  const updateHealthRecord = (studentId: string, healthPatch: Partial<HealthRecord>) => {
    setData((prev: typeof data) => {
      const exists = prev.healthRecords.some((h: HealthRecord) => h.studentId === studentId);
      if (exists) {
        return {
          ...prev,
          healthRecords: prev.healthRecords.map((h: HealthRecord) =>
            h.studentId === studentId ? { ...h, ...healthPatch, lastCheckupDate: new Date().toISOString().substring(0, 10) } : h
          )
        };
      } else {
        const newRecord: HealthRecord = {
          id: `health-${Date.now()}`,
          studentId,
          heightCm: healthPatch.heightCm || 165,
          weightKg: healthPatch.weightKg || 55,
          bloodPressure: healthPatch.bloodPressure || '120/80',
          vaccinations: healthPatch.vaccinations || ['General Vaccines'],
          medicalNotes: healthPatch.medicalNotes || 'Healthy',
          lastCheckupDate: new Date().toISOString().substring(0, 10)
        };
        return {
          ...prev,
          healthRecords: [...prev.healthRecords, newRecord]
        };
      }
    });
    addAuditLog('HEALTH_RECORD_UPDATED', 'Health Records', `Updated medical parameters for student ${studentId}`);
    showToast('Student health metrics updated.');
  };

  const issueCertificate = (cert: Omit<CertificateRecord, 'id' | 'certificateNo' | 'issuedDate' | 'status'>) => {
    const certificateNo = `GWA/CERT/2026/${String(Math.floor(100 + Math.random() * 900))}`;
    const newCert: CertificateRecord = {
      ...cert,
      id: `cert-${Date.now()}`,
      certificateNo,
      issuedDate: new Date().toISOString().substring(0, 10),
      status: 'Issued'
    };
    setData((prev: typeof data) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates]
    }));
    addAuditLog('CERTIFICATE_ISSUED', 'Certificates', `Generated ${cert.type} (${certificateNo})`);
    showToast(`Certificate #${certificateNo} generated.`);
  };

  const addVisitorLog = (log: Omit<VisitorLog, 'id' | 'date' | 'status'>) => {
    const newLog: VisitorLog = {
      ...log,
      id: `vis-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      status: 'Inside'
    };
    setData((prev: typeof data) => ({
      ...prev,
      visitorLogs: [newLog, ...prev.visitorLogs]
    }));
    addAuditLog('VISITOR_CHECKED_IN', 'Front Office', `Visitor checked in: ${log.visitorName}`);
    showToast(`Visitor ${log.visitorName} checked in.`);
  };

  const checkoutVisitor = (id: string, outTime: string) => {
    setData((prev: typeof data) => ({
      ...prev,
      visitorLogs: prev.visitorLogs.map((v: VisitorLog) =>
        v.id === id ? { ...v, status: 'Checked Out', outTime } : v
      )
    }));
    addAuditLog('VISITOR_CHECKED_OUT', 'Front Office', `Visitor ID ${id} checked out.`);
    showToast('Visitor marked checked out.');
  };

  const addComplaint = (comp: Omit<ComplaintFeedback, 'id' | 'ticketNo' | 'date' | 'status'>) => {
    const ticketNo = `TKT-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newComp: ComplaintFeedback = {
      ...comp,
      id: `comp-${Date.now()}`,
      ticketNo,
      date: new Date().toISOString().substring(0, 10),
      status: 'Open'
    };
    setData((prev: typeof data) => ({
      ...prev,
      complaints: [newComp, ...prev.complaints]
    }));
    addAuditLog('COMPLAINT_FILED', 'Front Office', `Ticket ${ticketNo} filed by ${comp.raisedByName}`);
    showToast(`Feedback ticket #${ticketNo} logged.`);
  };

  const resolveComplaint = (id: string, resolutionNotes: string) => {
    setData((prev: typeof data) => ({
      ...prev,
      complaints: prev.complaints.map((c: ComplaintFeedback) =>
        c.id === id ? { ...c, status: 'Resolved', resolutionNotes } : c
      )
    }));
    addAuditLog('COMPLAINT_RESOLVED', 'Front Office', `Resolved ticket ${id}`);
    showToast('Ticket marked resolved.');
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`
    };
    setData((prev: typeof data) => ({
      ...prev,
      inventory: [newItem, ...prev.inventory]
    }));
    addAuditLog('INVENTORY_ITEM_ADDED', 'Inventory', `Added stock item ${item.name} (${item.quantity} ${item.unit})`);
    showToast(`Item ${item.name} added to inventory.`);
  };

  const updateInventoryStock = (id: string, delta: number) => {
    setData((prev: typeof data) => ({
      ...prev,
      inventory: prev.inventory.map((item: InventoryItem) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta), lastRestocked: new Date().toISOString().substring(0, 10) } : item
      )
    }));
    showToast('Inventory stock count updated.');
  };

  const markNotificationRead = (id: string) => {
    setData((prev: typeof data) => ({
      ...prev,
      notifications: prev.notifications.map((n: NotificationItem) => (n.id === id ? { ...n, read: true } : n))
    }));
  };

  const markAllNotificationsRead = () => {
    setData((prev: typeof data) => ({
      ...prev,
      notifications: prev.notifications.map((n: NotificationItem) => ({ ...n, read: true }))
    }));
    showToast('All notifications marked as read');
  };

  const updateRolePermission = (role: Role, key: keyof RolePermissionMatrix, value: boolean) => {
    setData((prev: typeof data) => ({
      ...prev,
      rolePermissions: prev.rolePermissions.map((rpm: RolePermissionMatrix) =>
        rpm.role === role ? { ...rpm, [key]: value } : rpm
      )
    }));
    addAuditLog('PERMISSION_UPDATED', 'Settings', `Updated ${String(key)} to ${value} for role ${role}`);
    showToast('Role permissions saved.');
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData({
      branches: initialBranches,
      academicSessions: initialAcademicSessions,
      classes: initialClasses,
      subjects: initialSubjects,
      students: initialStudents,
      parents: initialParents,
      staff: initialStaff,
      attendanceRecords: initialAttendanceRecords,
      timetableSlots: initialTimetableSlots,
      homework: initialHomework,
      homeworkSubmissions: initialSubmissions,
      examinations: initialExaminations,
      examSchedules: initialExamSchedules,
      examResults: initialExamResults,
      feeStructures: initialFeeStructures,
      feeInvoices: initialFeeInvoices,
      leaveApplications: initialLeaveApplications,
      books: initialBooks,
      bookIssues: initialBookIssues,
      vehicles: initialVehicles,
      transportRoutes: initialTransportRoutes,
      notices: initialNotices,
      events: initialEvents,
      ptmMeetings: initialPTMMeetings,
      disciplineRecords: initialDisciplineRecords,
      healthRecords: initialHealthRecords,
      certificates: initialCertificates,
      visitorLogs: initialVisitorLogs,
      complaints: initialComplaints,
      inventory: initialInventory,
      auditLogs: initialAuditLogs,
      notifications: initialNotifications,
      rolePermissions: initialRolePermissions
    });
    showToast('Reset ERP database to fresh state.', 'info');
  };

  return (
    <ERPContext.Provider
      value={{
        currentRole,
        currentUser,
        currentBranch,
        currentSession,
        activeModule,
        branches: data.branches,
        academicSessions: data.academicSessions,
        classes: data.classes,
        subjects: data.subjects,
        students: data.students,
        parents: data.parents,
        staff: data.staff,
        attendanceRecords: data.attendanceRecords,
        timetableSlots: data.timetableSlots,
        homework: data.homework,
        homeworkSubmissions: data.homeworkSubmissions,
        examinations: data.examinations,
        examSchedules: data.examSchedules,
        examResults: data.examResults,
        feeStructures: data.feeStructures,
        feeInvoices: data.feeInvoices,
        leaveApplications: data.leaveApplications,
        books: data.books,
        bookIssues: data.bookIssues,
        vehicles: data.vehicles,
        transportRoutes: data.transportRoutes,
        notices: data.notices,
        events: data.events,
        ptmMeetings: data.ptmMeetings,
        disciplineRecords: data.disciplineRecords,
        healthRecords: data.healthRecords,
        certificates: data.certificates,
        visitorLogs: data.visitorLogs,
        complaints: data.complaints,
        inventory: data.inventory,
        auditLogs: data.auditLogs,
        notifications: data.notifications,
        rolePermissions: data.rolePermissions,
        toastMessage,
        switchRole,
        switchBranch,
        switchSession,
        setActiveModule,
        showToast,
        clearToast,
        addStudent,
        updateStudent,
        recordAttendance,
        addHomework,
        gradeHomework,
        recordExamMarks,
        recordFeePayment,
        createFeeInvoice,
        applyLeave,
        updateLeaveStatus,
        issueBook,
        returnBook,
        addNotice,
        addEvent,
        schedulePTM,
        recordDiscipline,
        updateHealthRecord,
        issueCertificate,
        addVisitorLog,
        checkoutVisitor,
        addComplaint,
        resolveComplaint,
        addInventoryItem,
        updateInventoryStock,
        markNotificationRead,
        markAllNotificationsRead,
        updateRolePermission,
        resetAllData
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
};
