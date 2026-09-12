import React, { useState } from 'react';
import { ERPProvider, useERP } from './context/ERPContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { PrintableDocumentModal, DocumentType } from './components/common/PrintableDocumentModal';
import { RoleDashboard } from './components/dashboard/RoleDashboard';
import { StudentManagement } from './components/modules/students/StudentManagement';
import { AttendanceManager } from './components/modules/attendance/AttendanceManager';
import { AcademicsManager } from './components/modules/academics/AcademicsManager';
import { TimetableManager } from './components/modules/timetable/TimetableManager';
import { HomeworkManager } from './components/modules/homework/HomeworkManager';
import { ExaminationManager } from './components/modules/examinations/ExaminationManager';
import { FinanceManager } from './components/modules/finance/FinanceManager';
import { StaffManager } from './components/modules/staff/StaffManager';
import { LibraryManager } from './components/modules/library/LibraryManager';
import { TransportManager } from './components/modules/transport/TransportManager';
import { FrontOfficeManager } from './components/modules/frontoffice/FrontOfficeManager';
import { CommunicationManager } from './components/modules/communication/CommunicationManager';
import { InventoryManager } from './components/modules/inventory/InventoryManager';
import { CertificatesAndDiscipline } from './components/modules/students/CertificatesAndDiscipline';
import { ReportsManager } from './components/modules/reports/ReportsManager';
import { SettingsManager } from './components/modules/settings/SettingsManager';
import {
  Student,
  FeeInvoice,
  CertificateRecord,
  Examination,
  ExamResultRecord,
  Subject,
  ClassGrade,
  Section
} from './types/erp';

const AppContent: React.FC = () => {
  const {
    activeModule,
    students,
    staff,
    feeInvoices,
    classes,
    subjects,
    examinations,
    examResults,
    certificates,
    currentBranch
  } = useERP();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Printable Document Modal State
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docType, setDocType] = useState<DocumentType>('report_card');
  const [docData, setDocData] = useState<{
    student?: Student;
    classGrade?: ClassGrade;
    section?: Section;
    exam?: Examination;
    examResults?: { subject: Subject; result: ExamResultRecord }[];
    invoice?: FeeInvoice;
    certificate?: CertificateRecord;
    branchName?: string;
  }>({});

  const handleOpenReportCard = (studentId: string) => {
    const student = students.find(s => s.id === studentId) || students[0];
    const exam = examinations[0];
    const classGrade = classes.find(c => c.id === student.classId);
    const section = classGrade?.sections.find(sec => sec.id === student.sectionId);

    const studentResults = examResults
      .filter(r => r.studentId === student.id && r.examinationId === exam.id)
      .map(r => {
        const sub = subjects.find(s => s.id === r.subjectId) || {
          id: r.subjectId,
          name: 'Academic Discipline',
          code: 'GEN-101',
          classId: student.classId,
          type: 'Core' as const,
          credits: 4,
          maxMarks: 100,
          passMarks: 40
        };
        return { subject: sub, result: r };
      });

    setDocType('report_card');
    setDocData({
      student,
      exam,
      classGrade,
      section,
      examResults: studentResults,
      branchName: currentBranch.name
    });
    setDocModalOpen(true);
  };

  const handleOpenReceipt = (invoiceId: string) => {
    const invoice = feeInvoices.find(inv => inv.id === invoiceId) || feeInvoices[0];
    const student = students.find(s => s.id === invoice.studentId) || students[0];
    const classGrade = classes.find(c => c.id === student.classId);
    const section = classGrade?.sections.find(sec => sec.id === student.sectionId);

    setDocType('fee_receipt');
    setDocData({
      invoice,
      student,
      classGrade,
      section,
      branchName: currentBranch.name
    });
    setDocModalOpen(true);
  };

  const handleOpenCertificate = (certIdOrStudentId: string) => {
    // Check if it's a certificate ID first
    let cert = certificates.find(c => c.id === certIdOrStudentId);
    let student: Student | undefined;

    if (cert) {
      student = students.find(s => s.id === cert!.studentId);
    } else {
      // It's a student ID
      student = students.find(s => s.id === certIdOrStudentId) || students[0];
      cert = certificates.find(c => c.studentId === student!.id) || {
        id: `cert-gen-${Date.now()}`,
        studentId: student!.id,
        type: 'Transfer Certificate',
        certificateNo: `TC-${new Date().getFullYear()}-${student!.admissionNo.replace('ADM-', '')}`,
        issueDate: new Date().toISOString().substring(0, 10),
        reason: 'Successful completion of secondary education program',
        issuedBy: 'Dr. Eleanor Thorne, Principal'
      };
    }

    const classGrade = student ? classes.find(c => c.id === student!.classId) : undefined;

    setDocType('certificate');
    setDocData({
      certificate: cert,
      student,
      classGrade,
      branchName: currentBranch.name
    });
    setDocModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Layout */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleSidebarMobile={() => setMobileSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Dynamic Module Routing */}
          {activeModule === 'dashboard' && (
            <RoleDashboard
              onOpenReportCard={handleOpenReportCard}
              onOpenReceipt={handleOpenReceipt}
              onOpenLeaveModal={() => {}}
            />
          )}

          {activeModule === 'students' && (
            <StudentManagement
              onOpenReportCard={handleOpenReportCard}
              onOpenCertificate={handleOpenCertificate}
            />
          )}

          {activeModule === 'attendance' && <AttendanceManager />}

          {activeModule === 'academics' && <AcademicsManager />}

          {activeModule === 'timetable' && <TimetableManager />}

          {activeModule === 'homework' && <HomeworkManager />}

          {(activeModule === 'examinations' || activeModule === 'report_cards') && (
            <ExaminationManager onOpenReportCard={handleOpenReportCard} />
          )}

          {activeModule === 'finance' && (
            <FinanceManager onOpenReceipt={handleOpenReceipt} />
          )}

          {(activeModule === 'staff' || activeModule === 'payroll' || activeModule === 'leave') && (
            <StaffManager />
          )}

          {activeModule === 'library' && <LibraryManager />}

          {activeModule === 'transport' && <TransportManager />}

          {(activeModule === 'frontoffice' || activeModule === 'complaints') && (
            <FrontOfficeManager />
          )}

          {(activeModule === 'communication' || activeModule === 'events' || activeModule === 'ptm') && (
            <CommunicationManager />
          )}

          {activeModule === 'inventory' && <InventoryManager />}

          {(activeModule === 'certificates' || activeModule === 'health_discipline') && (
            <CertificatesAndDiscipline onOpenCertificate={handleOpenCertificate} />
          )}

          {activeModule === 'reports' && <ReportsManager />}

          {(activeModule === 'settings' || activeModule === 'audit') && <SettingsManager />}
        </main>
      </div>

      {/* Global Quick Search Modal (Cmd+K / Ctrl+K) */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Printable Document Modal (Official Reports, Fee Receipts, Transfer Certificates) */}
      <PrintableDocumentModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        documentType={docType}
        data={docData}
      />
    </div>
  );
};

export default function App() {
  return (
    <ERPProvider>
      <AppContent />
    </ERPProvider>
  );
}
