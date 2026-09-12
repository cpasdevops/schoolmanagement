import {
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
  User,
  RolePermissionMatrix
} from '../types/erp';

export const initialBranches: Branch[] = [
  {
    id: 'branch-1',
    name: 'Greenwood World Academy - Main Campus',
    code: 'GWA-MAIN',
    address: '450 Oakridge Parkway, Metropolitan District',
    phone: '+1 (555) 234-8900',
    email: 'info.main@greenwoodacademy.edu',
    principalName: 'Dr. Eleanor Thorne',
    isMainBranch: true
  },
  {
    id: 'branch-2',
    name: 'Greenwood World Academy - North Hill Campus',
    code: 'GWA-NORTH',
    address: '128 Highland Crest Blvd, North District',
    phone: '+1 (555) 789-3211',
    email: 'info.north@greenwoodacademy.edu',
    principalName: 'Dr. Marcus Vance',
    isMainBranch: false
  }
];

export const initialAcademicSessions: AcademicSession[] = [
  {
    id: 'session-2025-26',
    name: '2025-2026',
    startDate: '2025-08-15',
    endDate: '2026-06-10',
    isCurrent: true
  },
  {
    id: 'session-2024-25',
    name: '2024-2025',
    startDate: '2024-08-15',
    endDate: '2025-06-10',
    isCurrent: false
  }
];

export const initialClasses: ClassGrade[] = [
  {
    id: 'class-gr6',
    name: 'Grade 6',
    numericLevel: 6,
    sections: [
      { id: 'sec-6a', classId: 'class-gr6', name: 'A', capacity: 35, roomNumber: 'Room 101', classTeacherId: 'staff-4' },
      { id: 'sec-6b', classId: 'class-gr6', name: 'B', capacity: 35, roomNumber: 'Room 102', classTeacherId: 'staff-5' }
    ]
  },
  {
    id: 'class-gr7',
    name: 'Grade 7',
    numericLevel: 7,
    sections: [
      { id: 'sec-7a', classId: 'class-gr7', name: 'A', capacity: 35, roomNumber: 'Room 201', classTeacherId: 'staff-6' },
      { id: 'sec-7b', classId: 'class-gr7', name: 'B', capacity: 35, roomNumber: 'Room 202' }
    ]
  },
  {
    id: 'class-gr8',
    name: 'Grade 8',
    numericLevel: 8,
    sections: [
      { id: 'sec-8a', classId: 'class-gr8', name: 'A', capacity: 35, roomNumber: 'Room 203' },
      { id: 'sec-8b', classId: 'class-gr8', name: 'B', capacity: 35, roomNumber: 'Room 204' }
    ]
  },
  {
    id: 'class-gr9',
    name: 'Grade 9',
    numericLevel: 9,
    sections: [
      { id: 'sec-9a', classId: 'class-gr9', name: 'A', capacity: 35, roomNumber: 'Room 301', classTeacherId: 'staff-2' },
      { id: 'sec-9b', classId: 'class-gr9', name: 'B', capacity: 35, roomNumber: 'Room 302' }
    ]
  },
  {
    id: 'class-gr10',
    name: 'Grade 10',
    numericLevel: 10,
    sections: [
      { id: 'sec-10a', classId: 'class-gr10', name: 'A', capacity: 35, roomNumber: 'Room 305', classTeacherId: 'staff-1' },
      { id: 'sec-10b', classId: 'class-gr10', name: 'B', capacity: 35, roomNumber: 'Room 306' }
    ]
  }
];

export const initialSubjects: Subject[] = [
  { id: 'subj-sci10', name: 'Advanced Science & Physics', code: 'SCI-101', classId: 'class-gr10', type: 'core', teacherId: 'staff-1', credits: 4 },
  { id: 'subj-math10', name: 'Algebra & Trigonometry', code: 'MTH-102', classId: 'class-gr10', type: 'core', teacherId: 'staff-2', credits: 4 },
  { id: 'subj-eng10', name: 'English Literature & Composition', code: 'ENG-103', classId: 'class-gr10', type: 'core', teacherId: 'staff-4', credits: 3 },
  { id: 'subj-cs10', name: 'Computer Science & Python', code: 'CS-104', classId: 'class-gr10', type: 'core', teacherId: 'staff-5', credits: 3 },
  { id: 'subj-hist10', name: 'World History & Civics', code: 'HIS-105', classId: 'class-gr10', type: 'core', teacherId: 'staff-6', credits: 3 },
  { id: 'subj-math9', name: 'Foundation Mathematics', code: 'MTH-901', classId: 'class-gr9', type: 'core', teacherId: 'staff-2', credits: 4 },
  { id: 'subj-sci9', name: 'General Science', code: 'SCI-902', classId: 'class-gr9', type: 'core', teacherId: 'staff-1', credits: 4 }
];

export const initialParents: ParentGuardian[] = [
  {
    id: 'parent-1',
    fatherName: 'Michael Vance',
    fatherOccupation: 'Senior Software Architect',
    fatherPhone: '+1 (555) 901-4433',
    motherName: 'Elena Vance',
    motherOccupation: 'Pediatric Specialist',
    motherPhone: '+1 (555) 901-4434',
    guardianEmail: 'm.vance@familymail.org',
    address: '74 Willow Grove Terrace, Oakridge',
    studentIds: ['stu-1', 'stu-2']
  },
  {
    id: 'parent-2',
    fatherName: 'David Zhang',
    fatherOccupation: 'Financial Analyst',
    fatherPhone: '+1 (555) 432-8812',
    motherName: 'Mei Zhang',
    motherOccupation: 'University Lecturer',
    motherPhone: '+1 (555) 432-8813',
    guardianEmail: 'david.zhang@investcorp.com',
    address: '112 Summit Ridge Way, Oakridge',
    studentIds: ['stu-3']
  },
  {
    id: 'parent-3',
    fatherName: 'James Gallagher',
    fatherOccupation: 'Civil Engineer',
    fatherPhone: '+1 (555) 678-2200',
    motherName: 'Rachel Gallagher',
    motherOccupation: 'Architectural Designer',
    motherPhone: '+1 (555) 678-2201',
    guardianEmail: 'gallagher.family@outlook.com',
    address: '89 Pinecrest Avenue, North Hill',
    studentIds: ['stu-4']
  }
];

export const initialStudents: Student[] = [
  {
    id: 'stu-1',
    admissionNo: 'GWA-2024-001',
    rollNo: '10A-01',
    firstName: 'Lucas',
    lastName: 'Vance',
    gender: 'Male',
    dob: '2010-04-12',
    bloodGroup: 'O+',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    academicSessionId: 'session-2025-26',
    branchId: 'branch-1',
    admissionDate: '2022-08-20',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    email: 'lucas.vance@student.greenwood.edu',
    phone: '+1 (555) 901-4433',
    address: '74 Willow Grove Terrace, Oakridge',
    parentId: 'parent-1',
    emergencyContact: '+1 (555) 901-4434 (Mother)',
    category: 'General',
    transportRouteId: 'route-1',
    transportStop: 'Oakridge Plaza Stop 2',
    healthConditions: 'None reported',
    allergies: 'Peanuts (Mild)',
    academicRecord: {
      previousSchool: 'Oakridge Elementary',
      gpa: 3.92,
      attendancePercent: 96.4
    }
  },
  {
    id: 'stu-2',
    admissionNo: 'GWA-2024-002',
    rollNo: '6A-08',
    firstName: 'Emma',
    lastName: 'Vance',
    gender: 'Female',
    dob: '2014-09-22',
    bloodGroup: 'A+',
    classId: 'class-gr6',
    sectionId: 'sec-6a',
    academicSessionId: 'session-2025-26',
    branchId: 'branch-1',
    admissionDate: '2024-08-15',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    email: 'emma.vance@student.greenwood.edu',
    phone: '+1 (555) 901-4433',
    address: '74 Willow Grove Terrace, Oakridge',
    parentId: 'parent-1',
    emergencyContact: '+1 (555) 901-4434',
    category: 'General',
    transportRouteId: 'route-1',
    transportStop: 'Oakridge Plaza Stop 2',
    healthConditions: 'Asthma (Inhaler kept at school clinic)',
    allergies: 'Dust',
    academicRecord: {
      previousSchool: 'Oakridge Elementary',
      gpa: 3.85,
      attendancePercent: 94.0
    }
  },
  {
    id: 'stu-3',
    admissionNo: 'GWA-2023-088',
    rollNo: '10A-02',
    firstName: 'Chloe',
    lastName: 'Zhang',
    gender: 'Female',
    dob: '2010-06-18',
    bloodGroup: 'B+',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    academicSessionId: 'session-2025-26',
    branchId: 'branch-1',
    admissionDate: '2023-08-10',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'chloe.zhang@student.greenwood.edu',
    phone: '+1 (555) 432-8812',
    address: '112 Summit Ridge Way, Oakridge',
    parentId: 'parent-2',
    emergencyContact: '+1 (555) 432-8813 (Mother)',
    category: 'Scholarship',
    transportRouteId: 'route-2',
    transportStop: 'Summit Ridge Central',
    healthConditions: 'None',
    allergies: 'None',
    academicRecord: {
      previousSchool: 'Maple High',
      gpa: 4.0,
      attendancePercent: 99.1
    }
  },
  {
    id: 'stu-4',
    admissionNo: 'GWA-2023-104',
    rollNo: '10A-03',
    firstName: 'Noah',
    lastName: 'Gallagher',
    gender: 'Male',
    dob: '2010-02-05',
    bloodGroup: 'AB+',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    academicSessionId: 'session-2025-26',
    branchId: 'branch-1',
    admissionDate: '2023-08-12',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'noah.gallagher@student.greenwood.edu',
    phone: '+1 (555) 678-2200',
    address: '89 Pinecrest Avenue, North Hill',
    parentId: 'parent-3',
    emergencyContact: '+1 (555) 678-2201',
    category: 'General',
    transportRouteId: 'route-1',
    transportStop: 'Pinecrest Station',
    healthConditions: 'None',
    allergies: 'Penicillin',
    academicRecord: {
      previousSchool: 'St. Jude Academy',
      gpa: 3.65,
      attendancePercent: 71.5 // Defaulter flag (<75%)
    }
  },
  {
    id: 'stu-5',
    admissionNo: 'GWA-2024-055',
    rollNo: '10A-04',
    firstName: 'Sophia',
    lastName: 'Patel',
    gender: 'Female',
    dob: '2010-11-14',
    bloodGroup: 'O-',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    academicSessionId: 'session-2025-26',
    branchId: 'branch-1',
    admissionDate: '2024-08-20',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    email: 'sophia.patel@student.greenwood.edu',
    phone: '+1 (555) 345-7722',
    address: '22 Elm Court, Metro',
    parentId: 'parent-1',
    emergencyContact: '+1 (555) 345-7723',
    category: 'General',
    transportRouteId: 'route-2',
    transportStop: 'Elm Court Junction',
    academicRecord: {
      previousSchool: 'Greenwood Junior',
      gpa: 3.88,
      attendancePercent: 92.5
    }
  },
  {
    id: 'stu-6',
    admissionNo: 'GWA-2024-099',
    rollNo: '9A-01',
    firstName: 'Liam',
    lastName: 'O\'Connor',
    gender: 'Male',
    dob: '2011-05-19',
    bloodGroup: 'B-',
    classId: 'class-gr9',
    sectionId: 'sec-9a',
    academicSessionId: 'session-2025-26',
    branchId: 'branch-1',
    admissionDate: '2024-08-18',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'liam.oconnor@student.greenwood.edu',
    phone: '+1 (555) 765-4321',
    address: '54 Lakeview Drive, Metro',
    parentId: 'parent-2',
    emergencyContact: '+1 (555) 765-4322',
    category: 'General',
    academicRecord: {
      previousSchool: 'Valley Middle',
      gpa: 3.75,
      attendancePercent: 88.0
    }
  }
];

export const initialStaff: StaffMember[] = [
  {
    id: 'staff-1',
    employeeCode: 'EMP-T-01',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    role: 'teacher',
    department: 'Academic',
    designation: 'Head of Natural Sciences & Gr 10-A Class Teacher',
    qualification: 'M.Sc. Physics, M.Ed.',
    joinDate: '2018-06-15',
    email: 'sarah.jenkins@greenwood.edu',
    phone: '+1 (555) 234-9011',
    salary: 68500,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'CHASE-****-8841',
    assignedSubjects: ['subj-sci10', 'subj-sci9']
  },
  {
    id: 'staff-2',
    employeeCode: 'EMP-T-02',
    firstName: 'David',
    lastName: 'Martinez',
    role: 'teacher',
    department: 'Academic',
    designation: 'Senior Mathematics Instructor',
    qualification: 'M.Sc. Pure Mathematics',
    joinDate: '2019-08-01',
    email: 'david.martinez@greenwood.edu',
    phone: '+1 (555) 234-9022',
    salary: 66000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'WF-****-4102',
    assignedSubjects: ['subj-math10', 'subj-math9']
  },
  {
    id: 'staff-3',
    employeeCode: 'EMP-ADM-01',
    firstName: 'Franklin',
    lastName: 'Wright',
    role: 'accountant',
    department: 'Finance',
    designation: 'Chief Bursar & Finance Officer',
    qualification: 'CPA, MBA Finance',
    joinDate: '2016-03-10',
    email: 'franklin.wright@greenwood.edu',
    phone: '+1 (555) 234-9033',
    salary: 74000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'BOA-****-9104'
  },
  {
    id: 'staff-4',
    employeeCode: 'EMP-T-03',
    firstName: 'Victoria',
    lastName: 'Sterling',
    role: 'librarian',
    department: 'Library',
    designation: 'Head Librarian & Resource Specialist',
    qualification: 'M.Lib.Sc, B.A. Literature',
    joinDate: '2017-09-01',
    email: 'victoria.sterling@greenwood.edu',
    phone: '+1 (555) 234-9044',
    salary: 58000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'PNC-****-3312'
  },
  {
    id: 'staff-5',
    employeeCode: 'EMP-OPS-01',
    firstName: 'Harold',
    lastName: 'Brooks',
    role: 'transport_manager',
    department: 'Transport',
    designation: 'Fleet & Logistics Coordinator',
    qualification: 'Diploma in Automotive Logistics',
    joinDate: '2020-01-15',
    email: 'harold.brooks@greenwood.edu',
    phone: '+1 (555) 234-9055',
    salary: 54000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'CITI-****-6291'
  },
  {
    id: 'staff-6',
    employeeCode: 'EMP-REC-01',
    firstName: 'Amanda',
    lastName: 'Kelly',
    role: 'receptionist',
    department: 'Administration',
    designation: 'Front Office Executive & Public Liaison',
    qualification: 'B.A. Mass Communication',
    joinDate: '2021-04-10',
    email: 'amanda.kelly@greenwood.edu',
    phone: '+1 (555) 234-9066',
    salary: 46000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'CHASE-****-1099'
  },
  {
    id: 'staff-7',
    employeeCode: 'EMP-PRIN-01',
    firstName: 'Dr. Eleanor',
    lastName: 'Thorne',
    role: 'principal',
    department: 'Administration',
    designation: 'Principal & Executive Director of Studies',
    qualification: 'Ph.D. Educational Leadership, Harvard',
    joinDate: '2015-05-01',
    email: 'principal@greenwoodacademy.edu',
    phone: '+1 (555) 234-9001',
    salary: 115000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    bankAccount: 'BOA-****-0012'
  }
];

export const sampleUsers: User[] = [
  {
    id: 'user-superadmin',
    name: 'Dr. Arthur Vance',
    email: 'superadmin@greenwood.edu',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 100-0001',
    branchId: 'branch-1',
    designation: 'Chancellor & Global Trustee'
  },
  {
    id: 'user-principal',
    name: 'Dr. Eleanor Thorne',
    email: 'principal@greenwoodacademy.edu',
    role: 'principal',
    avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-9001',
    branchId: 'branch-1',
    designation: 'School Principal'
  },
  {
    id: 'user-teacher',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@greenwood.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-9011',
    branchId: 'branch-1',
    assignedClassId: 'class-gr10',
    assignedSectionId: 'sec-10a',
    designation: 'Head of Science & Gr 10 Class Teacher'
  },
  {
    id: 'user-accountant',
    name: 'Franklin Wright',
    email: 'franklin.wright@greenwood.edu',
    role: 'accountant',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-9033',
    branchId: 'branch-1',
    designation: 'Chief Bursar'
  },
  {
    id: 'user-student',
    name: 'Lucas Vance',
    email: 'lucas.vance@student.greenwood.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    studentId: 'stu-1',
    assignedClassId: 'class-gr10',
    assignedSectionId: 'sec-10a'
  },
  {
    id: 'user-parent',
    name: 'Michael Vance',
    email: 'm.vance@familymail.org',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    childrenStudentIds: ['stu-1', 'stu-2']
  },
  {
    id: 'user-librarian',
    name: 'Victoria Sterling',
    email: 'victoria.sterling@greenwood.edu',
    role: 'librarian',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    designation: 'Lead Librarian'
  },
  {
    id: 'user-transport',
    name: 'Harold Brooks',
    email: 'harold.brooks@greenwood.edu',
    role: 'transport_manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    designation: 'Transport Operations Head'
  },
  {
    id: 'user-receptionist',
    name: 'Amanda Kelly',
    email: 'amanda.kelly@greenwood.edu',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    branchId: 'branch-1',
    designation: 'Front Office Specialist'
  }
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  { id: 'att-1', date: '2026-09-11', entityType: 'student', entityId: 'stu-1', classId: 'class-gr10', sectionId: 'sec-10a', status: 'present', recordedBy: 'Sarah Jenkins' },
  { id: 'att-2', date: '2026-09-11', entityType: 'student', entityId: 'stu-3', classId: 'class-gr10', sectionId: 'sec-10a', status: 'present', recordedBy: 'Sarah Jenkins' },
  { id: 'att-3', date: '2026-09-11', entityType: 'student', entityId: 'stu-4', classId: 'class-gr10', sectionId: 'sec-10a', status: 'absent', remarks: 'Uninformed absence - Alert sent to parent', recordedBy: 'Sarah Jenkins' },
  { id: 'att-4', date: '2026-09-11', entityType: 'student', entityId: 'stu-5', classId: 'class-gr10', sectionId: 'sec-10a', status: 'late', remarks: 'Arrived 08:45 AM due to traffic', recordedBy: 'Sarah Jenkins' },
  { id: 'att-5', date: '2026-09-11', entityType: 'staff', entityId: 'staff-1', status: 'present', recordedBy: 'Biometric System' },
  { id: 'att-6', date: '2026-09-11', entityType: 'staff', entityId: 'staff-2', status: 'present', recordedBy: 'Biometric System' },
  { id: 'att-7', date: '2026-09-11', entityType: 'staff', entityId: 'staff-3', status: 'present', recordedBy: 'Biometric System' },
  { id: 'att-8', date: '2026-09-11', entityType: 'staff', entityId: 'staff-4', status: 'present', recordedBy: 'Biometric System' }
];

export const initialTimetableSlots: TimetableSlot[] = [
  { id: 'tt-1', dayOfWeek: 'Monday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 1, startTime: '08:30', endTime: '09:15', subjectId: 'subj-sci10', teacherId: 'staff-1', roomNumber: 'Lab 3' },
  { id: 'tt-2', dayOfWeek: 'Monday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 2, startTime: '09:20', endTime: '10:05', subjectId: 'subj-math10', teacherId: 'staff-2', roomNumber: 'Room 305' },
  { id: 'tt-3', dayOfWeek: 'Monday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 3, startTime: '10:20', endTime: '11:05', subjectId: 'subj-eng10', teacherId: 'staff-4', roomNumber: 'Room 305' },
  { id: 'tt-4', dayOfWeek: 'Monday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 4, startTime: '11:10', endTime: '11:55', subjectId: 'subj-cs10', teacherId: 'staff-5', roomNumber: 'Computer Lab B' },
  { id: 'tt-5', dayOfWeek: 'Tuesday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 1, startTime: '08:30', endTime: '09:15', subjectId: 'subj-math10', teacherId: 'staff-2', roomNumber: 'Room 305' },
  { id: 'tt-6', dayOfWeek: 'Tuesday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 2, startTime: '09:20', endTime: '10:05', subjectId: 'subj-sci10', teacherId: 'staff-1', roomNumber: 'Lab 3' },
  { id: 'tt-7', dayOfWeek: 'Wednesday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 1, startTime: '08:30', endTime: '09:15', subjectId: 'subj-hist10', teacherId: 'staff-6', roomNumber: 'Room 305' },
  { id: 'tt-8', dayOfWeek: 'Thursday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 1, startTime: '08:30', endTime: '09:15', subjectId: 'subj-cs10', teacherId: 'staff-5', roomNumber: 'Computer Lab B' },
  { id: 'tt-9', dayOfWeek: 'Friday', classId: 'class-gr10', sectionId: 'sec-10a', periodNumber: 1, startTime: '08:30', endTime: '09:15', subjectId: 'subj-sci10', teacherId: 'staff-1', roomNumber: 'Lab 3' }
];

export const initialHomework: HomeworkAssignment[] = [
  {
    id: 'hw-1',
    title: 'Kinematics & Projectile Motion Problem Set',
    description: 'Solve questions 1 through 15 on Chapter 4. Include clear free-body diagrams and step-by-step SI unit conversions.',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    subjectId: 'subj-sci10',
    teacherId: 'staff-1',
    assignedDate: '2026-09-08',
    dueDate: '2026-09-15',
    maxMarks: 50,
    attachmentName: 'Physics_Worksheet_Ch4.pdf',
    submissionsCount: 28,
    totalStudents: 32
  },
  {
    id: 'hw-2',
    title: 'Quadratic Polynomial Factorization & Roots',
    description: 'Complete Exercise 3.2 from Pearson Algebra text. Ensure vertex formula proofs are documented.',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    subjectId: 'subj-math10',
    teacherId: 'staff-2',
    assignedDate: '2026-09-09',
    dueDate: '2026-09-14',
    maxMarks: 40,
    attachmentName: 'Math_Exercise_3.2.pdf',
    submissionsCount: 30,
    totalStudents: 32
  },
  {
    id: 'hw-3',
    title: 'Shakespearean Tragedy Analysis: Macbeth Act II',
    description: 'Write an analytical essay (700-900 words) examining the motifs of guilt and blood in Act 2, Scene 2.',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    subjectId: 'subj-eng10',
    teacherId: 'staff-4',
    assignedDate: '2026-09-10',
    dueDate: '2026-09-18',
    maxMarks: 100,
    submissionsCount: 14,
    totalStudents: 32
  }
];

export const initialSubmissions: HomeworkSubmission[] = [
  {
    id: 'sub-1',
    homeworkId: 'hw-1',
    studentId: 'stu-1',
    submittedAt: '2026-09-10T14:30:00Z',
    content: 'Attached solved PDF with comprehensive velocity-time vectors and calculus formulations.',
    status: 'Graded',
    marksObtained: 48,
    feedback: 'Exemplary work on projectile angle derivations. Keep up the thorough work!'
  },
  {
    id: 'sub-2',
    homeworkId: 'hw-1',
    studentId: 'stu-3',
    submittedAt: '2026-09-10T16:20:00Z',
    content: 'Completed with full free-body diagrams and error estimations.',
    status: 'Graded',
    marksObtained: 50,
    feedback: 'Flawless execution and pristine presentation.'
  },
  {
    id: 'sub-3',
    homeworkId: 'hw-2',
    studentId: 'stu-1',
    submittedAt: '2026-09-11T10:15:00Z',
    content: 'Uploaded solutions for questions 1 to 12. Working on remaining proofs.',
    status: 'Submitted'
  }
];

export const initialExaminations: Examination[] = [
  {
    id: 'exam-midterm-2025',
    title: 'Mid-Term Summative Assessment 2025-26',
    type: 'Mid Term',
    academicSessionId: 'session-2025-26',
    startDate: '2025-10-14',
    endDate: '2025-10-25',
    classIds: ['class-gr6', 'class-gr7', 'class-gr8', 'class-gr9', 'class-gr10'],
    status: 'Completed'
  },
  {
    id: 'exam-final-2026',
    title: 'Annual Comprehensive Board Preparation Exam',
    type: 'Final Term',
    academicSessionId: 'session-2025-26',
    startDate: '2026-03-10',
    endDate: '2026-03-24',
    classIds: ['class-gr9', 'class-gr10'],
    status: 'Scheduled'
  }
];

export const initialExamSchedules: ExamScheduleItem[] = [
  { id: 'es-1', examId: 'exam-midterm-2025', classId: 'class-gr10', subjectId: 'subj-sci10', examDate: '2025-10-14', startTime: '09:00', endTime: '12:00', roomNumber: 'Auditorium Hall A', maxMarks: 100, passMarks: 40 },
  { id: 'es-2', examId: 'exam-midterm-2025', classId: 'class-gr10', subjectId: 'subj-math10', examDate: '2025-10-16', startTime: '09:00', endTime: '12:00', roomNumber: 'Auditorium Hall A', maxMarks: 100, passMarks: 40 },
  { id: 'es-3', examId: 'exam-midterm-2025', classId: 'class-gr10', subjectId: 'subj-eng10', examDate: '2025-10-18', startTime: '09:00', endTime: '12:00', roomNumber: 'Auditorium Hall A', maxMarks: 100, passMarks: 40 },
  { id: 'es-4', examId: 'exam-midterm-2025', classId: 'class-gr10', subjectId: 'subj-cs10', examDate: '2025-10-20', startTime: '09:00', endTime: '12:00', roomNumber: 'Computer Lab B', maxMarks: 100, passMarks: 40 },
  { id: 'es-5', examId: 'exam-midterm-2025', classId: 'class-gr10', subjectId: 'subj-hist10', examDate: '2025-10-22', startTime: '09:00', endTime: '12:00', roomNumber: 'Room 305', maxMarks: 100, passMarks: 40 }
];

export const initialExamResults: ExamResultRecord[] = [
  { id: 'res-1', examId: 'exam-midterm-2025', studentId: 'stu-1', subjectId: 'subj-sci10', classId: 'class-gr10', marksObtained: 94, maxMarks: 100, grade: 'A+', remarks: 'Outstanding analytical acumen' },
  { id: 'res-2', examId: 'exam-midterm-2025', studentId: 'stu-1', subjectId: 'subj-math10', classId: 'class-gr10', marksObtained: 96, maxMarks: 100, grade: 'A+', remarks: 'Exceptional problem solving' },
  { id: 'res-3', examId: 'exam-midterm-2025', studentId: 'stu-1', subjectId: 'subj-eng10', classId: 'class-gr10', marksObtained: 90, maxMarks: 100, grade: 'A', remarks: 'Creative & cogent expression' },
  { id: 'res-4', examId: 'exam-midterm-2025', studentId: 'stu-1', subjectId: 'subj-cs10', classId: 'class-gr10', marksObtained: 98, maxMarks: 100, grade: 'A+', remarks: 'Mastery in algorithm implementation' },
  { id: 'res-5', examId: 'exam-midterm-2025', studentId: 'stu-1', subjectId: 'subj-hist10', classId: 'class-gr10', marksObtained: 89, maxMarks: 100, grade: 'A', remarks: 'Good grasp of geopolitical events' },

  { id: 'res-6', examId: 'exam-midterm-2025', studentId: 'stu-3', subjectId: 'subj-sci10', classId: 'class-gr10', marksObtained: 99, maxMarks: 100, grade: 'A+' },
  { id: 'res-7', examId: 'exam-midterm-2025', studentId: 'stu-3', subjectId: 'subj-math10', classId: 'class-gr10', marksObtained: 100, maxMarks: 100, grade: 'A+' },
  { id: 'res-8', examId: 'exam-midterm-2025', studentId: 'stu-3', subjectId: 'subj-eng10', classId: 'class-gr10', marksObtained: 95, maxMarks: 100, grade: 'A+' },
  { id: 'res-9', examId: 'exam-midterm-2025', studentId: 'stu-3', subjectId: 'subj-cs10', classId: 'class-gr10', marksObtained: 99, maxMarks: 100, grade: 'A+' },
  { id: 'res-10', examId: 'exam-midterm-2025', studentId: 'stu-3', subjectId: 'subj-hist10', classId: 'class-gr10', marksObtained: 94, maxMarks: 100, grade: 'A+' },

  { id: 'res-11', examId: 'exam-midterm-2025', studentId: 'stu-4', subjectId: 'subj-sci10', classId: 'class-gr10', marksObtained: 68, maxMarks: 100, grade: 'B' },
  { id: 'res-12', examId: 'exam-midterm-2025', studentId: 'stu-4', subjectId: 'subj-math10', classId: 'class-gr10', marksObtained: 72, maxMarks: 100, grade: 'B+' },
  { id: 'res-13', examId: 'exam-midterm-2025', studentId: 'stu-4', subjectId: 'subj-eng10', classId: 'class-gr10', marksObtained: 70, maxMarks: 100, grade: 'B' },
  { id: 'res-14', examId: 'exam-midterm-2025', studentId: 'stu-4', subjectId: 'subj-cs10', classId: 'class-gr10', marksObtained: 75, maxMarks: 100, grade: 'B+' },
  { id: 'res-15', examId: 'exam-midterm-2025', studentId: 'stu-4', subjectId: 'subj-hist10', classId: 'class-gr10', marksObtained: 65, maxMarks: 100, grade: 'C+' }
];

export const initialFeeStructures: FeeStructure[] = [
  { id: 'fee-str-1', title: 'Grade 10 Tuition Fee (Term 1)', classId: 'class-gr10', category: 'Tuition', amount: 2400, dueDate: '2025-09-01', frequency: 'Quarterly' },
  { id: 'fee-str-2', title: 'Science & Robotics Laboratory Lab Fee', classId: 'class-gr10', category: 'Laboratory', amount: 450, dueDate: '2025-09-01', frequency: 'Yearly' },
  { id: 'fee-str-3', title: 'Campus Transport Services Fee', classId: 'class-gr10', category: 'Transport', amount: 650, dueDate: '2025-09-01', frequency: 'Quarterly' },
  { id: 'fee-str-4', title: 'Digital Library & E-Learning Access', classId: 'class-gr10', category: 'Library', amount: 200, dueDate: '2025-09-01', frequency: 'Yearly' }
];

export const initialFeeInvoices: FeeInvoice[] = [
  {
    id: 'inv-2025-01',
    invoiceNo: 'INV-2025-0891',
    studentId: 'stu-1',
    academicSessionId: 'session-2025-26',
    title: 'Grade 10 Term 1 Academic & Activity Dues',
    totalAmount: 3700,
    paidAmount: 3700,
    discountAmount: 0,
    dueDate: '2025-09-15',
    status: 'Paid',
    items: [
      { description: 'Quarterly Tuition Fee', amount: 2400 },
      { description: 'Science & Robotics Lab Fee', amount: 450 },
      { description: 'Transport Route 1 Fee', amount: 650 },
      { description: 'Digital Library Fee', amount: 200 }
    ],
    payments: [
      {
        id: 'pay-1',
        invoiceId: 'inv-2025-01',
        receiptNo: 'RCP-2025-0891',
        amount: 3700,
        paymentDate: '2025-09-02',
        paymentMethod: 'Credit Card',
        transactionRef: 'TXN-STRIPE-89104',
        receivedBy: 'Franklin Wright (Bursar)',
        notes: 'Paid online via Parent Portal'
      }
    ]
  },
  {
    id: 'inv-2025-02',
    invoiceNo: 'INV-2025-0892',
    studentId: 'stu-2',
    academicSessionId: 'session-2025-26',
    title: 'Grade 6 Term 1 Comprehensive Fee',
    totalAmount: 3100,
    paidAmount: 3100,
    discountAmount: 200,
    dueDate: '2025-09-15',
    status: 'Paid',
    items: [
      { description: 'Quarterly Tuition Fee', amount: 2100 },
      { description: 'Activity & Sports Fee', amount: 350 },
      { description: 'Transport Route 1 Fee', amount: 650 }
    ],
    payments: [
      {
        id: 'pay-2',
        invoiceId: 'inv-2025-02',
        receiptNo: 'RCP-2025-0892',
        amount: 2900,
        paymentDate: '2025-09-03',
        paymentMethod: 'Credit Card',
        transactionRef: 'TXN-STRIPE-89105',
        receivedBy: 'Franklin Wright',
        notes: 'Sibling Concession Applied ($200)'
      }
    ]
  },
  {
    id: 'inv-2025-03',
    invoiceNo: 'INV-2025-0893',
    studentId: 'stu-4',
    academicSessionId: 'session-2025-26',
    title: 'Grade 10 Term 1 Academic Dues',
    totalAmount: 3700,
    paidAmount: 1850,
    discountAmount: 0,
    dueDate: '2025-09-15',
    status: 'Partial',
    items: [
      { description: 'Quarterly Tuition Fee', amount: 2400 },
      { description: 'Science & Robotics Lab Fee', amount: 450 },
      { description: 'Transport Route 1 Fee', amount: 650 },
      { description: 'Digital Library Fee', amount: 200 }
    ],
    payments: [
      {
        id: 'pay-3',
        invoiceId: 'inv-2025-03',
        receiptNo: 'RCP-2025-0893',
        amount: 1850,
        paymentDate: '2025-09-12',
        paymentMethod: 'Bank Transfer',
        transactionRef: 'WIRE-ACH-9931',
        receivedBy: 'Franklin Wright',
        notes: '1st Installment received'
      }
    ]
  },
  {
    id: 'inv-2025-04',
    invoiceNo: 'INV-2025-0901',
    studentId: 'stu-5',
    academicSessionId: 'session-2025-26',
    title: 'Grade 10 Term 2 Installment',
    totalAmount: 3050,
    paidAmount: 0,
    discountAmount: 0,
    dueDate: '2026-09-30',
    status: 'Unpaid',
    items: [
      { description: 'Tuition Fee Term 2', amount: 2400 },
      { description: 'Transport Service', amount: 650 }
    ],
    payments: []
  }
];

export const initialLeaveApplications: LeaveApplication[] = [
  {
    id: 'leave-1',
    applicantType: 'staff',
    applicantId: 'staff-2',
    leaveType: 'Casual Leave',
    startDate: '2026-09-20',
    endDate: '2026-09-22',
    reason: 'Attending National STEM Mathematics Pedagogy Conference as speaker.',
    status: 'Approved',
    approvedBy: 'Dr. Eleanor Thorne',
    approvalRemarks: 'Approved with substitute lesson coverage assigned.',
    appliedDate: '2026-09-08'
  },
  {
    id: 'leave-2',
    applicantType: 'staff',
    applicantId: 'staff-6',
    leaveType: 'Sick Leave',
    startDate: '2026-09-18',
    endDate: '2026-09-19',
    reason: 'Dental surgery and prescribed recuperation.',
    status: 'Pending',
    appliedDate: '2026-09-11'
  },
  {
    id: 'leave-3',
    applicantType: 'student',
    applicantId: 'stu-1',
    leaveType: 'Academic',
    startDate: '2026-09-25',
    endDate: '2026-09-26',
    reason: 'Participating in Regional Robotics Olympiad representing school.',
    status: 'Approved',
    approvedBy: 'Sarah Jenkins',
    approvalRemarks: 'Best of luck to the Robotics team.',
    appliedDate: '2026-09-09'
  }
];

export const initialBooks: Book[] = [
  { id: 'bk-1', isbn: '978-0134685991', title: 'Principles of Modern Physics', author: 'Halliday, Resnick & Walker', category: 'Science', publisher: 'Wiley Education', totalCopies: 25, availableCopies: 22, rackLocation: 'Rack S-12', price: 85 },
  { id: 'bk-2', isbn: '978-0321982384', title: 'Linear Algebra and Its Applications', author: 'David C. Lay', category: 'Mathematics', publisher: 'Pearson', totalCopies: 30, availableCopies: 26, rackLocation: 'Rack M-04', price: 92 },
  { id: 'bk-3', isbn: '978-0743273565', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', publisher: 'Scribner', totalCopies: 40, availableCopies: 34, rackLocation: 'Rack L-08', price: 18 },
  { id: 'bk-4', isbn: '978-0262033848', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest, Stein', category: 'Computer Science', publisher: 'MIT Press', totalCopies: 15, availableCopies: 12, rackLocation: 'Rack CS-01', price: 110 },
  { id: 'bk-5', isbn: '978-0062316097', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'History', publisher: 'Harper', totalCopies: 20, availableCopies: 16, rackLocation: 'Rack H-02', price: 24 },
  { id: 'bk-6', isbn: '978-0143127741', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', publisher: 'Harper Perennial', totalCopies: 35, availableCopies: 31, rackLocation: 'Rack L-09', price: 16 }
];

export const initialBookIssues: BookIssue[] = [
  { id: 'iss-1', bookId: 'bk-1', borrowerType: 'student', borrowerId: 'stu-1', issueDate: '2026-09-01', dueDate: '2026-09-20', fineAmount: 0, status: 'Issued' },
  { id: 'iss-2', bookId: 'bk-4', borrowerType: 'student', borrowerId: 'stu-3', issueDate: '2026-08-25', dueDate: '2026-09-10', fineAmount: 2.5, status: 'Overdue' },
  { id: 'iss-3', bookId: 'bk-2', borrowerType: 'staff', borrowerId: 'staff-2', issueDate: '2026-08-15', dueDate: '2026-09-30', fineAmount: 0, status: 'Issued' },
  { id: 'iss-4', bookId: 'bk-3', borrowerType: 'student', borrowerId: 'stu-4', issueDate: '2026-08-20', dueDate: '2026-09-05', returnDate: '2026-09-04', fineAmount: 0, status: 'Returned' }
];

export const initialVehicles: Vehicle[] = [
  { id: 'veh-1', vehicleNumber: 'BUS-101', model: 'Blue Bird All American 54-Seater', capacity: 54, driverName: 'Gary Wilson', driverPhone: '+1 (555) 883-9911', licenseNumber: 'DL-COM-882109', insuranceExpiry: '2027-04-30', status: 'Active' },
  { id: 'veh-2', vehicleNumber: 'BUS-102', model: 'Thomas Built Saf-T-Liner 48-Seater', capacity: 48, driverName: 'Carlos Ramirez', driverPhone: '+1 (555) 883-9922', licenseNumber: 'DL-COM-441209', insuranceExpiry: '2026-11-15', status: 'Active' },
  { id: 'veh-3', vehicleNumber: 'VAN-103', model: 'Ford Transit Passenger 18-Seater', capacity: 18, driverName: 'Edward Bell', driverPhone: '+1 (555) 883-9933', licenseNumber: 'DL-COM-771922', insuranceExpiry: '2026-08-10', status: 'Maintenance' }
];

export const initialTransportRoutes: TransportRoute[] = [
  {
    id: 'route-1',
    routeTitle: 'Route 1 - Oakridge Parkway & Metro East',
    vehicleId: 'veh-1',
    totalAssignedStudents: 42,
    stops: [
      { stopName: 'Oakridge Plaza Stop 2', pickupTime: '07:25 AM', dropTime: '03:45 PM', fare: 650 },
      { stopName: 'Maplewood Crossing', pickupTime: '07:38 AM', dropTime: '03:32 PM', fare: 650 },
      { stopName: 'Pinecrest Station', pickupTime: '07:50 AM', dropTime: '03:20 PM', fare: 650 },
      { stopName: 'Greenwood Main Gate', pickupTime: '08:10 AM', dropTime: '03:05 PM', fare: 0 }
    ]
  },
  {
    id: 'route-2',
    routeTitle: 'Route 2 - Summit Ridge & Highland Crest',
    vehicleId: 'veh-2',
    totalAssignedStudents: 38,
    stops: [
      { stopName: 'Summit Ridge Central', pickupTime: '07:20 AM', dropTime: '03:50 PM', fare: 700 },
      { stopName: 'Elm Court Junction', pickupTime: '07:35 AM', dropTime: '03:35 PM', fare: 700 },
      { stopName: 'Highland North Circle', pickupTime: '07:48 AM', dropTime: '03:22 PM', fare: 700 },
      { stopName: 'Greenwood Main Gate', pickupTime: '08:12 AM', dropTime: '03:05 PM', fare: 0 }
    ]
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'not-1',
    title: 'Annual STEM & Science Olympiad 2026 Registration Open',
    content: 'Students from Grades 6 through 12 are invited to register for the upcoming regional STEM Olympiad. Project mentorship will commence from next Monday in Science Lab 3. Contact Head of Science Sarah Jenkins for team rosters.',
    targetAudience: 'All',
    priority: 'Urgent',
    publishedDate: '2026-09-10',
    authorName: 'Dr. Eleanor Thorne',
    authorRole: 'Principal',
    isPinned: true
  },
  {
    id: 'not-2',
    title: 'Quarterly Parent-Teacher Meeting (PTM) Schedule',
    content: 'The first term PTM will take place on Saturday, September 26 from 9:00 AM to 2:00 PM. Parents can book 15-minute dedicated discussion slots via their parent portal dashboard.',
    targetAudience: 'Parents',
    priority: 'Important',
    publishedDate: '2026-09-08',
    authorName: 'Amanda Kelly',
    authorRole: 'Front Office Coordinator',
    isPinned: true
  },
  {
    id: 'not-3',
    title: 'Term 1 Fee Payment Reminders & Payment Gateways',
    content: 'Notice to all guardians: The final date to clear Term 1 tuition fees without late surcharges is September 30. Online instant receipt generation is active on the fee management module.',
    targetAudience: 'Parents',
    priority: 'Normal',
    publishedDate: '2026-09-05',
    authorName: 'Franklin Wright',
    authorRole: 'Bursar',
    isPinned: false
  }
];

export const initialEvents: SchoolEvent[] = [
  { id: 'ev-1', title: 'All-School Science Exhibition & Tech Expo', description: 'Interactive project exhibits from Robotics, Physics, and Sustainable Ecology clubs.', startDate: '2026-09-28', endDate: '2026-09-29', location: 'Main Gymnasium & Science Wings', audience: 'All', type: 'Academic' },
  { id: 'ev-2', title: 'Fall Parent-Teacher Meeting (Term 1)', description: 'Academic review and individual counseling consultations.', startDate: '2026-09-26', endDate: '2026-09-26', location: 'Academic Block Classrooms', audience: 'Parents', type: 'PTM' },
  { id: 'ev-3', title: 'Inter-House Track & Field Championships', description: 'Annual athletic sprint, relay, long jump, and team championship.', startDate: '2026-10-08', endDate: '2026-10-09', location: 'Greenwood Athletic Stadium', audience: 'All', type: 'Sports' }
];

export const initialPTMMeetings: PTMMeeting[] = [
  {
    id: 'ptm-1',
    title: 'Term 1 Academic Progress Review',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    date: '2026-09-26',
    timeSlot: '10:00 AM - 10:15 AM',
    teacherId: 'staff-1',
    studentId: 'stu-1',
    parentId: 'parent-1',
    agenda: 'Discuss Advanced Physics honors pathway and Science Olympiad participation.',
    status: 'Scheduled',
    teacherNotes: 'Lucas is performing at the 98th percentile in science labs.'
  },
  {
    id: 'ptm-2',
    title: 'Term 1 Attendance & Engagement Review',
    classId: 'class-gr10',
    sectionId: 'sec-10a',
    date: '2026-09-26',
    timeSlot: '10:30 AM - 10:45 AM',
    teacherId: 'staff-1',
    studentId: 'stu-4',
    parentId: 'parent-3',
    agenda: 'Formulate attendance recovery plan (currently at 71.5%) and academic counseling.',
    status: 'Scheduled'
  }
];

export const initialDisciplineRecords: DisciplineRecord[] = [
  {
    id: 'disc-1',
    studentId: 'stu-1',
    reportedBy: 'Sarah Jenkins',
    date: '2026-09-04',
    incidentType: 'Commendable Conduct',
    severity: 'Positive',
    description: 'Voluntarily stayed after hours to assist peer laboratory groups in calibrating sensitive spectrometers.',
    actionTaken: 'Awarded 10 House Merit Points & Letter of Appreciation',
    points: 10
  },
  {
    id: 'disc-2',
    studentId: 'stu-4',
    reportedBy: 'David Martinez',
    date: '2026-09-07',
    incidentType: 'Tardiness',
    severity: 'Low',
    description: 'Repeated late arrival (3rd time this month) to 1st period mathematics class.',
    actionTaken: 'Parent notified via ERP notification & counseling reminder issued',
    points: -3
  }
];

export const initialHealthRecords: HealthRecord[] = [
  {
    id: 'health-1',
    studentId: 'stu-1',
    heightCm: 172,
    weightKg: 64,
    bloodPressure: '118/76',
    visionCheck: '20/20 Left, 20/20 Right (Normal)',
    dentalCheck: 'Good - No cavities',
    vaccinations: ['MMR', 'Hepatitis B', 'Tetanus Booster (2024)', 'COVID-19 (x2)'],
    medicalNotes: 'Fit for all athletic events. Mild peanut sensitivity recorded.',
    lastCheckupDate: '2026-08-22'
  },
  {
    id: 'health-2',
    studentId: 'stu-2',
    heightCm: 148,
    weightKg: 41,
    bloodPressure: '110/70',
    visionCheck: '20/25 (Slight astigmatism, glasses recommended)',
    dentalCheck: 'Orthodontic braces installed',
    vaccinations: ['MMR', 'Hepatitis B', 'Polio', 'Varicella'],
    medicalNotes: 'Carries emergency Salbutamol inhaler for exercise-induced asthma.',
    lastCheckupDate: '2026-08-25'
  }
];

export const initialCertificates: CertificateRecord[] = [
  {
    id: 'cert-1',
    certificateNo: 'GWA/CERT/2026/041',
    studentId: 'stu-1',
    type: 'Bonafide',
    issuedDate: '2026-09-05',
    issuedBy: 'Dr. Eleanor Thorne (Principal)',
    purpose: 'Passport Renewal & Regional Visa Verification',
    status: 'Issued'
  },
  {
    id: 'cert-2',
    certificateNo: 'GWA/CERT/2026/042',
    studentId: 'stu-3',
    type: 'Merit',
    issuedDate: '2026-08-30',
    issuedBy: 'Dr. Eleanor Thorne (Principal)',
    purpose: 'Academic Excellence Award - 100% Score in Mathematics',
    status: 'Issued'
  }
];

export const initialVisitorLogs: VisitorLog[] = [
  {
    id: 'vis-1',
    visitorName: 'Arthur Pendelton',
    phone: '+1 (555) 771-3300',
    purpose: 'Admission Enquiry',
    personToMeet: 'Admission Office / Amanda Kelly',
    inTime: '09:15 AM',
    outTime: '10:05 AM',
    date: '2026-09-11',
    idCardType: 'Driver License',
    status: 'Checked Out'
  },
  {
    id: 'vis-2',
    visitorName: 'Sophia Lorenze (Dell Tech Rep)',
    phone: '+1 (555) 882-1144',
    purpose: 'Vendor/Official',
    personToMeet: 'IT Department & Franklin Wright',
    inTime: '11:00 AM',
    date: '2026-09-11',
    idCardType: 'State ID',
    status: 'Inside'
  }
];

export const initialComplaints: ComplaintFeedback[] = [
  {
    id: 'comp-1',
    ticketNo: 'TKT-2026-088',
    raisedByRole: 'Parent',
    raisedByName: 'Michael Vance',
    contact: '+1 (555) 901-4433',
    category: 'Transport',
    subject: 'Morning Bus Route 1 arriving 10 minutes behind schedule on Rainy days',
    description: 'The bus arrival at Oakridge Plaza has experienced delays due to detour around 5th Street construction. Would appreciate if route dispatch is adjusted 10 mins earlier.',
    date: '2026-09-08',
    status: 'In Progress',
    assignedTo: 'Harold Brooks (Transport Manager)',
    resolutionNotes: 'Transport team has revised the start time by 8 minutes to accommodate road works.'
  },
  {
    id: 'comp-2',
    ticketNo: 'TKT-2026-091',
    raisedByRole: 'Student',
    raisedByName: 'Lucas Vance',
    contact: 'lucas.vance@student.greenwood.edu',
    category: 'Facilities',
    subject: 'Wi-Fi connection latency in Physics Lab 3',
    description: 'When all 30 students download spectroscopy datasets simultaneously, network times out.',
    date: '2026-09-10',
    status: 'Resolved',
    assignedTo: 'IT Department',
    resolutionNotes: 'Dedicated dual-band Cisco access point deployed in Lab 3.'
  }
];

export const initialInventory: InventoryItem[] = [
  { id: 'inv-1', itemCode: 'IT-LAP-044', name: 'Dell Latitude 3520 Laptops', category: 'IT & Computers', quantity: 45, unit: 'units', unitPrice: 750, department: 'Computer Science Lab', location: 'IT Store Rm 104', lastRestocked: '2026-07-20', minimumThreshold: 10 },
  { id: 'inv-2', itemCode: 'SCI-MIC-10', name: 'Olympus Compound Optical Microscopes', category: 'Laboratory Equipment', quantity: 30, unit: 'units', unitPrice: 320, department: 'Natural Sciences', location: 'Biology Lab Cabinet 2', lastRestocked: '2026-06-15', minimumThreshold: 8 },
  { id: 'inv-3', itemCode: 'FUR-DSK-200', name: 'Ergonomic Dual Student Desk Sets', category: 'Classroom Furniture', quantity: 180, unit: 'sets', unitPrice: 140, department: 'General Academic', location: 'Central Warehouse B', lastRestocked: '2026-08-01', minimumThreshold: 20 },
  { id: 'inv-4', itemCode: 'SPT-BB-50', name: 'Spalding Official Leather Basketballs', category: 'Sports Gear', quantity: 24, unit: 'balls', unitPrice: 45, department: 'Physical Education', location: 'Gymnasium Equipment Cage', lastRestocked: '2026-08-20', minimumThreshold: 10 }
];

export const initialAuditLogs: AuditLog[] = [
  { id: 'log-1', timestamp: '2026-09-11 09:14:22', userName: 'Sarah Jenkins', userRole: 'teacher', action: 'ATTENDANCE_RECORDED', module: 'Attendance', details: 'Marked daily attendance for Grade 10-A (31 Present, 1 Absent)', ipAddress: '192.168.1.104' },
  { id: 'log-2', timestamp: '2026-09-11 10:30:15', userName: 'Franklin Wright', userRole: 'accountant', action: 'PAYMENT_RECEIVED', module: 'Fees', details: 'Logged online fee receipt RCP-2025-0891 ($3,700) for Student Lucas Vance', ipAddress: '192.168.1.45' },
  { id: 'log-3', timestamp: '2026-09-10 16:45:00', userName: 'Dr. Eleanor Thorne', userRole: 'principal', action: 'NOTICE_PUBLISHED', module: 'Communication', details: 'Published urgent notice "Annual STEM & Science Olympiad 2026 Registration Open"', ipAddress: '192.168.1.10' },
  { id: 'log-4', timestamp: '2026-09-09 11:20:18', userName: 'Dr. Eleanor Thorne', userRole: 'principal', action: 'LEAVE_APPROVED', module: 'Staff HR', details: 'Approved Casual Leave for David Martinez (EMP-T-02)', ipAddress: '192.168.1.10' },
  { id: 'log-5', timestamp: '2026-09-08 14:05:40', userName: 'Victoria Sterling', userRole: 'librarian', action: 'BOOK_ISSUED', module: 'Library', details: 'Issued "Principles of Modern Physics" to Lucas Vance (GWA-2024-001)', ipAddress: '192.168.1.80' }
];

export const initialNotifications: NotificationItem[] = [
  { id: 'notif-1', title: 'Attendance Alert: Shortage Detected', message: 'Student Noah Gallagher (Grade 10-A) attendance has fallen to 71.5%, below mandatory 75% threshold.', type: 'urgent', timestamp: '10 minutes ago', read: false, targetRole: 'teacher', linkToModule: 'attendance' },
  { id: 'notif-2', title: 'New Leave Request Pending Approval', message: 'Amanda Kelly applied for 2 days Sick Leave starting Sep 18.', type: 'info', timestamp: '1 hour ago', read: false, targetRole: 'principal', linkToModule: 'staff' },
  { id: 'notif-3', title: 'Tuition Fee Payment Confirmed', message: 'Invoice INV-2025-0891 ($3,700) for Lucas Vance was successfully settled.', type: 'success', timestamp: '2 hours ago', read: false, targetRole: 'accountant', linkToModule: 'finance' },
  { id: 'notif-4', title: 'Library Book Overdue Warning', message: 'CLRS Algorithms borrowed by Chloe Zhang is past due date by 1 day.', type: 'warning', timestamp: '5 hours ago', read: false, targetRole: 'librarian', linkToModule: 'library' },
  { id: 'notif-5', title: 'New Homework Assigned', message: 'Kinematics & Projectile Motion problem set assigned due Sep 15.', type: 'info', timestamp: '1 day ago', read: true, targetRole: 'student', linkToModule: 'homework' }
];

export const initialRolePermissions: RolePermissionMatrix[] = [
  {
    role: 'super_admin',
    label: 'Super Administrator',
    description: 'Full multi-campus, multi-branch, structural configuration and override access.',
    canManageAcademics: true,
    canManageStudents: true,
    canTakeAttendance: true,
    canManageFees: true,
    canManageExams: true,
    canManageStaff: true,
    canManageTransport: true,
    canManageLibrary: true,
    canManageFrontOffice: true,
    canManageSettings: true,
    canViewReports: true
  },
  {
    role: 'school_admin',
    label: 'School Administrator',
    description: 'Executive branch-level operations, student records, staff tracking and policies.',
    canManageAcademics: true,
    canManageStudents: true,
    canTakeAttendance: true,
    canManageFees: true,
    canManageExams: true,
    canManageStaff: true,
    canManageTransport: true,
    canManageLibrary: true,
    canManageFrontOffice: true,
    canManageSettings: true,
    canViewReports: true
  },
  {
    role: 'principal',
    label: 'Principal',
    description: 'Head of academic vision, teacher leadership, approvals, and report analytics.',
    canManageAcademics: true,
    canManageStudents: true,
    canTakeAttendance: true,
    canManageFees: true,
    canManageExams: true,
    canManageStaff: true,
    canManageTransport: true,
    canManageLibrary: true,
    canManageFrontOffice: true,
    canManageSettings: false,
    canViewReports: true
  },
  {
    role: 'vice_principal',
    label: 'Vice Principal',
    description: 'Operational academic coordination, timetable alignment, and student discipline.',
    canManageAcademics: true,
    canManageStudents: true,
    canTakeAttendance: true,
    canManageFees: false,
    canManageExams: true,
    canManageStaff: true,
    canManageTransport: true,
    canManageLibrary: true,
    canManageFrontOffice: true,
    canManageSettings: false,
    canViewReports: true
  },
  {
    role: 'teacher',
    label: 'Teacher / Faculty',
    description: 'Classroom teaching, attendance recording, syllabus tracking, homework & exams.',
    canManageAcademics: true,
    canManageStudents: false,
    canTakeAttendance: true,
    canManageFees: false,
    canManageExams: true,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: false
  },
  {
    role: 'accountant',
    label: 'Accountant / Bursar',
    description: 'Fee structuring, collection receipts, invoice dues, and payroll processing.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: true,
    canManageExams: false,
    canManageStaff: true,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: true
  },
  {
    role: 'librarian',
    label: 'Librarian',
    description: 'Catalog management, book issue/return, fines and library reservations.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: true,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: true
  },
  {
    role: 'transport_manager',
    label: 'Transport Manager',
    description: 'Fleet monitoring, vehicle maintenance, routes, stops, and driver schedules.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: true,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: true
  },
  {
    role: 'receptionist',
    label: 'Receptionist / Front Desk',
    description: 'Visitor sign-in, admission enquiries, calls, and initial complaint tickets.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: true,
    canManageSettings: false,
    canViewReports: false
  },
  {
    role: 'student',
    label: 'Student',
    description: 'Access to learning materials, timetable, results, homework, fees and notices.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: false
  },
  {
    role: 'parent',
    label: 'Parent / Guardian',
    description: 'Monitor child performance, attendance alerts, fee payments, and teacher meetings.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: false
  },
  {
    role: 'staff',
    label: 'Staff Member',
    description: 'Employee self-service, leave requests, attendance and institutional notices.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: false
  },
  {
    role: 'driver',
    label: 'Transport Driver',
    description: 'Assigned route timetable, student boarding list, and trip confirmation.',
    canManageAcademics: false,
    canManageStudents: false,
    canTakeAttendance: false,
    canManageFees: false,
    canManageExams: false,
    canManageStaff: false,
    canManageTransport: false,
    canManageLibrary: false,
    canManageFrontOffice: false,
    canManageSettings: false,
    canViewReports: false
  }
];
