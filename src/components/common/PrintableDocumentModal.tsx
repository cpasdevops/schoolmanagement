import React from 'react';
import { Modal } from './Modal';
import { Printer, Download, Award, FileText, CheckCircle } from 'lucide-react';
import { Student, ClassGrade, Section, Examination, ExamResultRecord, Subject, FeeInvoice, FeePayment, StaffMember, CertificateRecord } from '../../types/erp';

export type DocumentType = 'report_card' | 'fee_receipt' | 'payslip' | 'certificate';

interface PrintableDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: DocumentType;
  data: {
    student?: Student;
    classGrade?: ClassGrade;
    section?: Section;
    exam?: Examination;
    examResults?: { subject: Subject; result: ExamResultRecord }[];
    invoice?: FeeInvoice;
    payment?: FeePayment;
    staff?: StaffMember;
    certificate?: CertificateRecord;
    branchName?: string;
  };
}

export const PrintableDocumentModal: React.FC<PrintableDocumentModalProps> = ({
  isOpen,
  onClose,
  documentType,
  data
}) => {
  const handlePrint = () => {
    window.print();
  };

  const titles = {
    report_card: 'Official Student Cumulative Report Card',
    fee_receipt: 'Official Fee Payment Receipt',
    payslip: 'Monthly Employee Salary Payslip',
    certificate: 'Official Institutional Certificate'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[documentType]}
      subtitle="Printable Official School Record • ISO 9001:2015 Compliant"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Document verified and digitally sealed by school administration.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* The Printable Page Area */}
        <div
          id="printable-area"
          className="bg-white border-2 border-slate-300 p-8 rounded-lg shadow-inner text-slate-800 font-sans relative overflow-hidden"
        >
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-slate-800 pb-6 mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-900 text-amber-400 flex items-center justify-center font-serif text-2xl font-black border-2 border-amber-400/80 shadow-md">
                GW
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                  Greenwood World Academy
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Affiliated to International Baccalaureate & Global Secondary Education Board
                </p>
                <p className="text-xs text-slate-500">
                  {data.branchName || 'Main Academic Campus'} • 450 Oakridge Parkway, Metropolitan District
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Phone: +1 (555) 234-8900 • Email: registrar@greenwoodacademy.edu
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-300 rounded text-xs font-mono font-bold text-slate-700">
                REF: GWA/{new Date().getFullYear()}/DOC-
                {Math.floor(1000 + Math.random() * 9000)}
              </span>
              <p className="text-xs text-slate-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* DOCUMENT BODY CONTENT */}
          {documentType === 'report_card' && data.student && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide underline underline-offset-4">
                  {data.exam?.title || 'Academic Performance Report'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Academic Session 2025 - 2026</p>
              </div>

              {/* Student Metadata Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Student Name:</span>
                  <span className="font-bold text-slate-900">
                    {data.student.firstName} {data.student.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Admission No:</span>
                  <span className="font-bold font-mono text-slate-900">{data.student.admissionNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class & Section:</span>
                  <span className="font-bold text-slate-900">
                    {data.classGrade?.name} - Section {data.section?.name || 'A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Roll No:</span>
                  <span className="font-bold text-slate-900">{data.student.rollNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Attendance Rate:</span>
                  <span className="font-bold text-emerald-700">
                    {data.student.academicRecord?.attendancePercent || 95}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Cumulative GPA:</span>
                  <span className="font-bold text-indigo-700">
                    {data.student.academicRecord?.gpa || 3.9} / 4.0
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date of Birth:</span>
                  <span className="font-medium text-slate-800">{data.student.dob}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status:</span>
                  <span className="font-bold text-emerald-600">Passed / Promoted</span>
                </div>
              </div>

              {/* Marks Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-300">
                  <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 uppercase font-semibold">
                    <tr>
                      <th className="p-2.5 border-r border-slate-300">Code</th>
                      <th className="p-2.5 border-r border-slate-300">Subject Name</th>
                      <th className="p-2.5 border-r border-slate-300 text-center">Max Marks</th>
                      <th className="p-2.5 border-r border-slate-300 text-center">Pass Marks</th>
                      <th className="p-2.5 border-r border-slate-300 text-center">Marks Obtained</th>
                      <th className="p-2.5 border-r border-slate-300 text-center">Grade</th>
                      <th className="p-2.5">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.examResults && data.examResults.length > 0 ? (
                      data.examResults.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="p-2.5 border-r border-slate-300 font-mono">{item.subject.code}</td>
                          <td className="p-2.5 border-r border-slate-300 font-medium">{item.subject.name}</td>
                          <td className="p-2.5 border-r border-slate-300 text-center">{item.result.maxMarks}</td>
                          <td className="p-2.5 border-r border-slate-300 text-center">40</td>
                          <td className="p-2.5 border-r border-slate-300 text-center font-bold text-slate-900">
                            {item.result.marksObtained}
                          </td>
                          <td className="p-2.5 border-r border-slate-300 text-center font-bold text-indigo-700">
                            {item.result.grade}
                          </td>
                          <td className="p-2.5 text-slate-600 italic">{item.result.remarks || 'Satisfactory'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-slate-500">
                          Subject marks details recorded in curriculum registry.
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-800">
                    <tr>
                      <td colSpan={2} className="p-2.5 border-r border-slate-300 text-right">
                        GRAND TOTAL:
                      </td>
                      <td className="p-2.5 border-r border-slate-300 text-center">
                        {data.examResults ? data.examResults.length * 100 : 500}
                      </td>
                      <td className="p-2.5 border-r border-slate-300 text-center">200</td>
                      <td className="p-2.5 border-r border-slate-300 text-center text-indigo-800">
                        {data.examResults ? data.examResults.reduce((acc, curr) => acc + curr.result.marksObtained, 0) : 467}
                      </td>
                      <td className="p-2.5 border-r border-slate-300 text-center text-indigo-700">A+</td>
                      <td className="p-2.5 text-emerald-700">First Division with Distinction</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Grading Key */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 flex flex-wrap justify-between">
                <span><strong>A+</strong> (90-100%): Outstanding</span>
                <span><strong>A</strong> (80-89%): Excellent</span>
                <span><strong>B+</strong> (70-79%): Very Good</span>
                <span><strong>B</strong> (60-69%): Good</span>
                <span><strong>C</strong> (40-59%): Pass</span>
                <span><strong>F</strong> (&lt;40%): Remedial</span>
              </div>
            </div>
          )}

          {documentType === 'fee_receipt' && data.invoice && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                  Official Fee Payment Receipt & Voucher
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Receipt No: {data.payment?.receiptNo || 'RCP-2026-9042'} | Invoice No: {data.invoice.invoiceNo}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Student:</span>
                  <span className="font-bold text-slate-900">{data.student?.firstName} {data.student?.lastName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Admission No:</span>
                  <span className="font-bold font-mono text-slate-900">{data.student?.admissionNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Date:</span>
                  <span className="font-medium text-slate-900">{data.payment?.paymentDate || new Date().toISOString().substring(0, 10)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Method:</span>
                  <span className="font-bold text-indigo-700">{data.payment?.paymentMethod || 'Online Transfer'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Txn Reference:</span>
                  <span className="font-mono text-slate-700">{data.payment?.transactionRef || 'TXN-ONLINE-99124'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Collected By:</span>
                  <span className="font-medium text-slate-800">{data.payment?.receivedBy || 'Bursar Office'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> PAID IN FULL
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Academic Session:</span>
                  <span className="font-medium text-slate-800">2025 - 2026</span>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-xs text-left border border-slate-300">
                <thead className="bg-slate-100 border-b border-slate-300 uppercase font-semibold text-slate-700">
                  <tr>
                    <th className="p-2.5 border-r border-slate-300">#</th>
                    <th className="p-2.5 border-r border-slate-300">Fee Particulars</th>
                    <th className="p-2.5 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.invoice.items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2.5 border-r border-slate-300">{i + 1}</td>
                      <td className="p-2.5 border-r border-slate-300 font-medium">{item.description}</td>
                      <td className="p-2.5 text-right font-mono">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  {data.invoice.discountAmount > 0 && (
                    <tr className="text-emerald-700 bg-emerald-50/50">
                      <td className="p-2.5 border-r border-slate-300">-</td>
                      <td className="p-2.5 border-r border-slate-300 font-medium">Institutional Concession / Scholarship Applied</td>
                      <td className="p-2.5 text-right font-mono">-${data.invoice.discountAmount.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold">
                  <tr>
                    <td colSpan={2} className="p-2.5 text-right border-r border-slate-300">TOTAL PAID AMOUNT:</td>
                    <td className="p-2.5 text-right text-sm text-indigo-900 font-mono">
                      ${(data.payment?.amount || data.invoice.paidAmount).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {documentType === 'certificate' && (
            <div className="py-8 px-6 text-center space-y-6 border-4 border-double border-amber-600/50 bg-amber-50/20 rounded-lg">
              <div className="flex justify-center mb-2">
                <Award className="w-16 h-16 text-amber-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-widest">
                Certificate of {data.certificate?.type || 'Bonafide Student'}
              </h2>
              <p className="text-xs font-mono text-slate-500">
                Certificate No: {data.certificate?.certificateNo || 'GWA/CERT/2026/041'}
              </p>

              <div className="text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed text-justify indent-8">
                This is to certify that{' '}
                <strong className="text-slate-950 font-bold underline">
                  {data.student?.firstName} {data.student?.lastName}
                </strong>
                , bearing Admission Number{' '}
                <strong className="text-slate-950 font-mono">{data.student?.admissionNo}</strong>, son/daughter of{' '}
                <strong>Michael & Elena Vance</strong>, is a bonafide student of{' '}
                <strong>Grade 10, Section A</strong> at Greenwood World Academy for the academic year 2025-2026.
                To the best of our institutional knowledge, they bear an exemplary moral character and active civic conduct.
              </div>

              <div className="p-4 bg-white/80 rounded border border-amber-200 text-xs text-slate-600 max-w-lg mx-auto">
                <strong>Purpose of Issue:</strong> {data.certificate?.purpose || 'Official Institutional Reference & Verification'}
              </div>
            </div>
          )}

          {/* Signatures & Seal Footer */}
          <div className="pt-12 mt-10 border-t border-slate-300 grid grid-cols-3 gap-8 text-center text-xs">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center pb-1 font-serif italic text-slate-500">
                Sarah Jenkins
              </div>
              <p className="font-semibold text-slate-700">Class Teacher / Tutor</p>
              <p className="text-[10px] text-slate-400">Greenwood World Academy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-300 flex items-center justify-center text-[10px] uppercase font-bold text-indigo-400 text-center leading-tight">
                OFFICIAL<br />SEAL
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Registrar Seal</p>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center pb-1 font-serif italic text-slate-700 font-bold">
                Dr. Eleanor Thorne
              </div>
              <p className="font-semibold text-slate-700">Principal / Executive Director</p>
              <p className="text-[10px] text-slate-400">Greenwood World Academy</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
