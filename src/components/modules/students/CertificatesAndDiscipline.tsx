import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { CertificateRecord, Student } from '../../../types/erp';
import {
  Award,
  HeartPulse,
  Plus,
  Search,
  FileText,
  Printer,
  ShieldCheck,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

interface CertificatesAndDisciplineProps {
  onOpenCertificate: (certId: string) => void;
}

export const CertificatesAndDiscipline: React.FC<CertificatesAndDisciplineProps> = ({
  onOpenCertificate
}) => {
  const { certificates, students, issueCertificate, currentBranch } = useERP();

  const [activeTab, setActiveTab] = useState<'certificates' | 'health'>('certificates');
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New certificate form
  const [certType, setCertType] = useState<'Transfer Certificate' | 'Character Certificate' | 'Bonafide Certificate' | 'Sports Merit' | 'Academic Excellence'>('Transfer Certificate');
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [reason, setReason] = useState('Relocation of parent to another regional office');

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    issueCertificate(studentId, certType, reason);
    setShowIssueModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Certificates & Health Register</h2>
          <p className="text-xs text-slate-500">
            Issue verified Transfer Certificates (TC), Bonafide certificates, and track student medical records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'certificates' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Issued Certificates ({certificates.length})
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'health' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Health & Medical Roster
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Digital Certificate Issuance Register</h3>
            <button
              onClick={() => setShowIssueModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Issue New Certificate
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Certificate #</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Certificate Type</th>
                    <th className="p-3.5">Purpose / Reason</th>
                    <th className="p-3.5">Date Issued</th>
                    <th className="p-3.5">Issued By</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map(cert => {
                    const student = students.find(s => s.id === cert.studentId);

                    return (
                      <tr key={cert.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-indigo-700">{cert.certificateNo}</td>
                        <td className="p-3.5 font-bold text-slate-900">
                          {student ? `${student.firstName} ${student.lastName}` : 'Enrolled Student'}
                          <span className="block text-[10px] text-slate-400 font-mono">Adm: {student?.admissionNo}</span>
                        </td>
                        <td className="p-3.5">
                          <Badge variant="indigo">{cert.type}</Badge>
                        </td>
                        <td className="p-3.5 text-slate-600 max-w-xs">{cert.reason}</td>
                        <td className="p-3.5 font-mono text-slate-600">{cert.issueDate}</td>
                        <td className="p-3.5 text-slate-800 font-medium">{cert.issuedBy}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => onOpenCertificate(cert.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px] flex items-center gap-1 ml-auto transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" /> Print Certificate
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

      {/* TAB 2: HEALTH & MEDICAL */}
      {activeTab === 'health' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">Student Infirmary & Medical Health Profiles</h3>
            <p className="text-slate-500 text-[11px]">Blood groups, allergies, and emergency medical contacts.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5 text-center">Blood Group</th>
                  <th className="p-3.5">Allergies / Special Medical Notes</th>
                  <th className="p-3.5">Emergency Physician / Contact</th>
                  <th className="p-3.5">Fitness Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      {st.firstName} {st.lastName}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{st.rollNo}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        {st.bloodGroup || 'O+'}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {st.medicalConditions && st.medicalConditions.length > 0
                        ? st.medicalConditions.join(', ')
                        : 'No known allergies or chronic conditions'}
                    </td>
                    <td className="p-3.5 font-mono text-slate-700">{st.emergencyContact}</td>
                    <td className="p-3.5">
                      <Badge variant="emerald">Medically Cleared</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Issue Modal */}
      <Modal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title="Issue Official Institutional Certificate"
        subtitle="Generates verified certification document sealed by the Principal."
        maxWidth="md"
      >
        <form onSubmit={handleIssue} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} (Adm: {s.admissionNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Certificate Type</label>
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value as any)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              <option value="Transfer Certificate">School Transfer Certificate (TC)</option>
              <option value="Character Certificate">Conduct & Character Certificate</option>
              <option value="Bonafide Certificate">Bonafide Student Certificate</option>
              <option value="Sports Merit">Sports Merit & Athletic Honors</option>
              <option value="Academic Excellence">Academic Excellence Certificate</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Purpose / Reason for Issuance</label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State reason for certificate request..."
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowIssueModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Issue & Seal Certificate
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
