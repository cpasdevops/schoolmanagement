export type Role =
  | 'super_admin'
  | 'school_admin'
  | 'principal'
  | 'vice_principal'
  | 'teacher'
  | 'accountant'
  | 'librarian'
  | 'receptionist'
  | 'transport_manager'
  | 'staff'
  | 'student'
  | 'parent'
  | 'driver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone?: string;
  branchId: string;
  assignedClassId?: string;
  assignedSectionId?: string;
  studentId?: string; // For parent or student
  childrenStudentIds?: string[]; // For parent
  designation?: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  isMainBranch: boolean;
}

export interface AcademicSession {
  id: string;
  name: string; // e.g. "2025-2026"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ClassGrade {
  id: string;
  name: string; // e.g. "Grade 10"
  numericLevel: number;
  sections: Section[];
}

export interface Section {
  id: string;
  classId: string;
  name: string; // "A", "B", "C"
  classTeacherId?: string;
  capacity: number;
  roomNumber: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classId: string;
  type: 'core' | 'elective' | 'lab';
  teacherId: string;
  credits: number;
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  classId: string;
  sectionId: string;
  academicSessionId: string;
  branchId: string;
  admissionDate: string;
  status: 'Active' | 'Inactive' | 'Transferred' | 'Graduated' | 'Suspended';
  avatar: string;
  email: string;
  phone: string;
  address: string;
  parentId: string;
  emergencyContact: string;
  category: 'General' | 'Scholarship' | 'Staff Ward' | 'Special Needs';
  transportRouteId?: string;
  transportStop?: string;
  healthConditions?: string;
  allergies?: string;
  academicRecord?: {
    previousSchool: string;
    gpa: number;
    attendancePercent: number;
  };
}

export interface ParentGuardian {
  id: string;
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  guardianEmail: string;
  address: string;
  studentIds: string[];
}

export interface StaffMember {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  role: Role;
  department: 'Academic' | 'Administration' | 'Finance' | 'Transport' | 'Library' | 'Maintenance' | 'Medical';
  designation: string;
  qualification: string;
  joinDate: string;
  email: string;
  phone: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Resigned';
  avatar: string;
  branchId: string;
  bankAccount: string;
  assignedSubjects?: string[];
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'excused';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  entityType: 'student' | 'staff';
  entityId: string;
  classId?: string;
  sectionId?: string;
  status: AttendanceStatus;
  remarks?: string;
  recordedBy: string;
  updatedAt?: string;
}

export interface TimetableSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  classId: string;
  sectionId: string;
  periodNumber: number;
  startTime: string; // "08:30"
  endTime: string;   // "09:15"
  subjectId: string;
  teacherId: string;
  roomNumber: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  attachmentName?: string;
  submissionsCount: number;
  totalStudents: number;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  submittedAt: string;
  content: string;
  status: 'Submitted' | 'Graded' | 'Late' | 'Pending';
  marksObtained?: number;
  feedback?: string;
}

export interface Examination {
  id: string;
  title: string; // "Term 1 Final Examination 2025"
  type: 'Unit Test' | 'Mid Term' | 'Final Term' | 'Practical' | 'Mock';
  academicSessionId: string;
  startDate: string;
  endDate: string;
  classIds: string[];
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Results Published';
}

export interface ExamScheduleItem {
  id: string;
  examId: string;
  classId: string;
  subjectId: string;
  examDate: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  maxMarks: number;
  passMarks: number;
}

export interface ExamResultRecord {
  id: string;
  examId: string;
  studentId: string;
  subjectId: string;
  classId: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  title: string; // e.g. "Annual Tuition Fee"
  classId: string;
  category: 'Tuition' | 'Transport' | 'Laboratory' | 'Library' | 'Sports' | 'Admission' | 'Hostel';
  amount: number;
  dueDate: string;
  frequency: 'Monthly' | 'Quarterly' | 'Yearly' | 'One-time';
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  academicSessionId: string;
  title: string;
  totalAmount: number;
  paidAmount: number;
  discountAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
  items: {
    description: string;
    amount: number;
  }[];
  payments: FeePayment[];
}

export interface FeePayment {
  id: string;
  invoiceId: string;
  receiptNo: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Cheque' | 'UPI/Online';
  transactionRef: string;
  receivedBy: string;
  notes?: string;
}

export interface LeaveApplication {
  id: string;
  applicantType: 'staff' | 'student';
  applicantId: string;
  leaveType: 'Sick Leave' | 'Casual Leave' | 'Maternity' | 'Academic' | 'Emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  approvalRemarks?: string;
  appliedDate: string;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  rackLocation: string;
  price: number;
}

export interface BookIssue {
  id: string;
  bookId: string;
  borrowerType: 'student' | 'staff';
  borrowerId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  status: 'Issued' | 'Returned' | 'Overdue';
}

export interface Vehicle {
  id: string;
  vehicleNumber: string; // e.g. "BUS-104"
  model: string;
  capacity: number;
  driverName: string;
  driverPhone: string;
  licenseNumber: string;
  insuranceExpiry: string;
  status: 'Active' | 'Maintenance' | 'Inactive';
}

export interface TransportRoute {
  id: string;
  routeTitle: string;
  vehicleId: string;
  stops: {
    stopName: string;
    pickupTime: string;
    dropTime: string;
    fare: number;
  }[];
  totalAssignedStudents: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Teachers' | 'Students' | 'Parents' | 'Staff';
  priority: 'Normal' | 'Important' | 'Urgent';
  publishedDate: string;
  authorName: string;
  authorRole: string;
  isPinned?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  audience: 'All' | 'Teachers' | 'Students' | 'Parents';
  type: 'Academic' | 'Sports' | 'Cultural' | 'Holiday' | 'PTM';
}

export interface PTMMeeting {
  id: string;
  title: string;
  classId: string;
  sectionId: string;
  date: string;
  timeSlot: string;
  teacherId: string;
  studentId: string;
  parentId: string;
  agenda: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  teacherNotes?: string;
}

export interface DisciplineRecord {
  id: string;
  studentId: string;
  reportedBy: string;
  date: string;
  incidentType: 'Misbehavior' | 'Tardiness' | 'Academic Dishonesty' | 'Bullying' | 'Dress Code' | 'Commendable Conduct';
  severity: 'Low' | 'Medium' | 'High' | 'Positive';
  description: string;
  actionTaken: string;
  points: number; // Positive or negative
}

export interface HealthRecord {
  id: string;
  studentId: string;
  heightCm: number;
  weightKg: number;
  bloodPressure?: string;
  visionCheck?: string;
  dentalCheck?: string;
  vaccinations: string[];
  medicalNotes: string;
  lastCheckupDate: string;
}

export interface CertificateRecord {
  id: string;
  certificateNo: string;
  studentId: string;
  type: 'Bonafide' | 'Transfer Certificate' | 'Character Certificate' | 'Sports Excellence' | 'Merit';
  issuedDate: string;
  issuedBy: string;
  purpose: string;
  status: 'Issued' | 'Pending Verification';
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  phone: string;
  purpose: 'Admission Enquiry' | 'Parent Meet' | 'Vendor/Official' | 'Fee Payment' | 'General Enquiry';
  personToMeet: string;
  inTime: string;
  outTime?: string;
  date: string;
  idCardType: string;
  status: 'Inside' | 'Checked Out';
}

export interface ComplaintFeedback {
  id: string;
  ticketNo: string;
  raisedByRole: 'Parent' | 'Student' | 'Teacher' | 'Staff';
  raisedByName: string;
  contact: string;
  category: 'Academics' | 'Transport' | 'Cafeteria' | 'Facilities' | 'Discipline' | 'Billing';
  subject: string;
  description: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo?: string;
  resolutionNotes?: string;
}

export interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: 'Classroom Furniture' | 'Laboratory Equipment' | 'Sports Gear' | 'IT & Computers' | 'Stationery';
  quantity: number;
  unit: string;
  unitPrice: number;
  department: string;
  location: string;
  lastRestocked: string;
  minimumThreshold: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: Role;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  timestamp: string;
  read: boolean;
  targetRole?: Role | 'all';
  linkToModule?: string;
}

export interface RolePermissionMatrix {
  role: Role;
  label: string;
  description: string;
  canManageAcademics: boolean;
  canManageStudents: boolean;
  canTakeAttendance: boolean;
  canManageFees: boolean;
  canManageExams: boolean;
  canManageStaff: boolean;
  canManageTransport: boolean;
  canManageLibrary: boolean;
  canManageFrontOffice: boolean;
  canManageSettings: boolean;
  canViewReports: boolean;
}

export type PaymentMethod = 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Cheque' | 'UPI/Online' | 'Online' | 'UPI';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Homework = HomeworkAssignment;

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  classAppliedFor: string;
  previousSchool: string;
  status: 'Inquired' | 'Form Issued' | 'Interview Scheduled' | 'Enrolled';
  date: string;
  notes?: string;
}

export interface VisitorRecord {
  id: string;
  visitorName: string;
  phone: string;
  purpose: string;
  meetingWhom: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
  badgeNumber: string;
}

export interface ComplaintTicket {
  id: string;
  subject: string;
  description: string;
  submittedBy: string;
  category: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  resolutionNotes?: string;
}

export interface HostelRoom {
  id: string;
  blockName: string;
  roomNumber: string;
  type: 'Single' | 'Double' | '4-Bed';
  capacity: number;
  occupied: number;
  feePerTerm: number;
  residentStudentIds: string[];
}

export interface PayrollRecord {
  id: string;
  staffId: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Draft' | 'Approved' | 'Disbursed';
  disbursementDate?: string;
  transactionRef?: string;
}
