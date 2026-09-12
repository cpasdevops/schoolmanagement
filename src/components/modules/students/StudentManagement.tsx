import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Student, ClassGrade } from '../../../types/erp';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  FileText,
  Award,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  MapPin,
  HeartPulse,
  Bus
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

interface StudentManagementProps {
  onOpenReportCard: (studentId: string) => void;
  onOpenCertificate: (studentId: string) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  onOpenReportCard,
  onOpenCertificate
}) => {
  const { students, classes, currentBranch, currentSession, addStudent, updateStudent } = useERP();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // New Admission Form state
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newDob, setNewDob] = useState('2011-05-15');
  const [newBloodGroup, setNewBloodGroup] = useState('O+');
  const [newClassId, setNewClassId] = useState(classes[0]?.id || 'class-gr10');
  const [newSectionId, setNewSectionId] = useState('sec-10a');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+1 (555) 000-1122');
  const [newAddress, setNewAddress] = useState('100 Maple St, Metro');
  const [newCategory, setNewCategory] = useState<'General' | 'Scholarship' | 'Staff Ward'>('General');
  const [newAllergies, setNewAllergies] = useState('None');

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClassId === 'all' || s.classId === selectedClassId;
    const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName || !newLastName) return;

    addStudent({
      rollNo: `${newClassId.replace('class-gr', '')}A-${Math.floor(10 + Math.random() * 80)}`,
      firstName: newFirstName,
      lastName: newLastName,
      gender: newGender,
      dob: newDob,
      bloodGroup: newBloodGroup,
      classId: newClassId,
      sectionId: newSectionId,
      academicSessionId: currentSession.id,
      branchId: currentBranch.id,
      admissionDate: new Date().toISOString().substring(0, 10),
      status: 'Active',
      avatar: `https://images.unsplash.com/photo-${newGender === 'Female' ? '1534528741775-53994a69daeb' : '1539571696357-5a69c17a67c6'}?w=150&auto=format&fit=crop&q=80`,
      email: newEmail || `${newFirstName.toLowerCase()}.${newLastName.toLowerCase()}@student.greenwood.edu`,
      phone: newPhone,
      address: newAddress,
      parentId: 'parent-1',
      emergencyContact: newPhone,
      category: newCategory,
      allergies: newAllergies
    });

    setShowAdmissionModal(false);
    // Reset form
    setNewFirstName('');
    setNewLastName('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Student Information & Admissions</h2>
          <p className="text-xs text-slate-500">
            Comprehensive student directory, academic portfolios, and admission enrollments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdmissionModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> Enroll New Student
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-1 items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, roll no, admission no..."
            className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium outline-none"
          >
            <option value="all">All Grades ({classes.length})</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Transferred">Transferred</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Admission #</th>
                <th className="p-3.5">Class & Section</th>
                <th className="p-3.5">Roll No</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">GPA</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No student records found matching the query.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const classInfo = classes.find(c => c.id === student.classId);
                  const att = student.academicRecord?.attendancePercent || 95;
                  const isDefaulter = att < 75;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{student.firstName} {student.lastName}</p>
                            <p className="text-[11px] text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-slate-700">{student.admissionNo}</td>
                      <td className="p-3.5 font-medium text-slate-800">
                        {classInfo?.name || 'Grade 10'} - Sec A
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">{student.rollNo}</td>
                      <td className="p-3.5">
                        <span className={`font-semibold font-mono ${isDefaulter ? 'text-rose-600 font-bold' : 'text-emerald-700'}`}>
                          {att}%
                        </span>
                        {isDefaulter && (
                          <span className="ml-1 text-[9px] bg-rose-100 text-rose-800 px-1 py-0.5 rounded font-bold">
                            Defaulter
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-indigo-700">
                        {student.academicRecord?.gpa ? `${student.academicRecord.gpa} / 4.0` : '3.8 / 4.0'}
                      </td>
                      <td className="p-3.5">
                        <Badge variant={student.status === 'Active' ? 'emerald' : 'slate'}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            title="View Complete Profile"
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenReportCard(student.id)}
                            title="Generate Report Card"
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenCertificate(student.id)}
                            title="Issue Certificate"
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Student Profile Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Portfolio: ${selectedStudent.firstName} ${selectedStudent.lastName}`}
          subtitle={`Admission No: ${selectedStudent.admissionNo} • Roll: ${selectedStudent.rollNo}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Top Identity Header */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt=""
                className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-sm"
              />
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h3>
                  <Badge variant={selectedStudent.status === 'Active' ? 'emerald' : 'slate'}>
                    {selectedStudent.status}
                  </Badge>
                </div>
                <p className="text-slate-600 font-medium">
                  Grade 10 - Section A • Greenwood World Academy ({currentBranch.name.split('-')[1]?.trim()})
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {selectedStudent.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {selectedStudent.phone}</span>
                </div>
              </div>
            </div>

            {/* Information Tabs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Academic Metrics */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <Award className="w-4 h-4 text-indigo-600" /> Academic & Performance Metrics
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Attendance Rate:</span>
                  <span className="font-bold text-emerald-700">{selectedStudent.academicRecord?.attendancePercent || 95}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Cumulative GPA:</span>
                  <span className="font-bold text-indigo-700">{selectedStudent.academicRecord?.gpa || 3.9} / 4.0</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Enrolled Date:</span>
                  <span className="font-medium text-slate-800">{selectedStudent.admissionDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Enrollment Category:</span>
                  <span className="font-semibold text-slate-800">{selectedStudent.category}</span>
                </div>
              </div>

              {/* Personal & Medical Profile */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <HeartPulse className="w-4 h-4 text-rose-500" /> Health & Emergency Info
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Date of Birth:</span>
                  <span className="font-medium text-slate-800">{selectedStudent.dob}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Blood Group:</span>
                  <span className="font-bold font-mono text-rose-700">{selectedStudent.bloodGroup}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Allergies / Notes:</span>
                  <span className="font-medium text-amber-700">{selectedStudent.allergies || 'None reported'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Emergency Contact:</span>
                  <span className="font-semibold text-slate-800">{selectedStudent.emergencyContact}</span>
                </div>
              </div>

              {/* Transportation & Logistics */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <Bus className="w-4 h-4 text-indigo-600" /> Transport & Route Allocation
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Assigned Route:</span>
                  <span className="font-bold text-slate-800">Route 1 (Oakridge Parkway)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Designated Stop:</span>
                  <span className="font-medium text-slate-800">{selectedStudent.transportStop || 'Oakridge Plaza Stop 2'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Residential Address:</span>
                  <span className="font-medium text-slate-800 text-right">{selectedStudent.address}</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-4 rounded-xl border border-slate-200 bg-indigo-50/40 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-indigo-950 pb-1">Administrative Documents</h4>
                  <p className="text-slate-600 text-[11px] mb-3">
                    Generate and download verified institutional records for this student.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onOpenReportCard(selectedStudent.id);
                      setSelectedStudent(null);
                    }}
                    className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <FileText className="w-4 h-4" /> Generate Official Marksheet
                  </button>
                  <button
                    onClick={() => {
                      onOpenCertificate(selectedStudent.id);
                      setSelectedStudent(null);
                    }}
                    className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-4 h-4" /> Issue Bonafide / Transfer Cert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* New Admission Modal */}
      <Modal
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        title="Student Admission & Enrollment Registration"
        subtitle="Registers new student into the SIS registry and allocates academic session."
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                placeholder="e.g. Liam"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                placeholder="e.g. Bennett"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={newDob}
                onChange={(e) => setNewDob(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={newBloodGroup}
                onChange={(e) => setNewBloodGroup(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Enrolling Grade / Class</label>
              <select
                value={newClassId}
                onChange={(e) => setNewClassId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="General">General</option>
                <option value="Scholarship">Merit Scholarship</option>
                <option value="Staff Ward">Staff Ward</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Guardian Contact Phone</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Full street address and city"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAdmissionModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Complete Enrollment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
