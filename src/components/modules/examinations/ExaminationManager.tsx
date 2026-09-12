import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Examination, ExamResultRecord, Student } from '../../../types/erp';
import {
  ClipboardList,
  Calendar,
  Award,
  Save,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  FileText,
  Filter,
  BarChart2
} from 'lucide-react';
import { Badge } from '../../common/Badge';

interface ExaminationManagerProps {
  onOpenReportCard: (studentId: string) => void;
}

export const ExaminationManager: React.FC<ExaminationManagerProps> = ({
  onOpenReportCard
}) => {
  const {
    examinations,
    classes,
    subjects,
    students,
    examResults,
    saveExamResults
  } = useERP();

  const [activeTab, setActiveTab] = useState<'schedules' | 'marks_entry' | 'analytics'>('marks_entry');
  const [selectedExamId, setSelectedExamId] = useState(examinations[0]?.id || 'exam-1');
  const [selectedClassId, setSelectedClassId] = useState('class-gr10');
  const [selectedSubjectId, setSelectedSubjectId] = useState('sub-phys-10');

  // Filter students for the class
  const classStudents = students.filter(s => s.classId === selectedClassId && s.status === 'Active');
  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
  const selectedExam = examinations.find(e => e.id === selectedExamId) || examinations[0];

  // Local draft of marks
  const [marksDraft, setMarksDraft] = useState<Record<string, { marks: number; remarks: string }>>(() => {
    const draft: Record<string, { marks: number; remarks: string }> = {};
    examResults.forEach(r => {
      if (r.examinationId === selectedExamId && r.subjectId === selectedSubjectId) {
        draft[r.studentId] = { marks: r.marksObtained, remarks: r.remarks || '' };
      }
    });
    return draft;
  });

  const getStudentMarks = (studentId: string): number => {
    if (marksDraft[studentId] !== undefined) return marksDraft[studentId].marks;
    const existing = examResults.find(
      r => r.examinationId === selectedExamId && r.subjectId === selectedSubjectId && r.studentId === studentId
    );
    return existing ? existing.marksObtained : 88;
  };

  const getStudentRemarks = (studentId: string): string => {
    if (marksDraft[studentId] !== undefined) return marksDraft[studentId].remarks;
    const existing = examResults.find(
      r => r.examinationId === selectedExamId && r.subjectId === selectedSubjectId && r.studentId === studentId
    );
    return existing?.remarks || 'Good proficiency';
  };

  const calculateGrade = (marks: number, max: number = 100): string => {
    const pct = (marks / max) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 40) return 'C';
    return 'F';
  };

  const handleUpdateMarks = (studentId: string, marks: number) => {
    setMarksDraft(prev => ({
      ...prev,
      [studentId]: {
        marks,
        remarks: prev[studentId]?.remarks || getStudentRemarks(studentId)
      }
    }));
  };

  const handleUpdateRemarks = (studentId: string, remarks: string) => {
    setMarksDraft(prev => ({
      ...prev,
      [studentId]: {
        marks: prev[studentId]?.marks !== undefined ? prev[studentId].marks : getStudentMarks(studentId),
        remarks
      }
    }));
  };

  const handleSaveMarksSheet = () => {
    const recordsToSave: ExamResultRecord[] = classStudents.map(student => {
      const marks = getStudentMarks(student.id);
      const grade = calculateGrade(marks, 100);
      return {
        id: `res-${selectedExamId}-${student.id}-${selectedSubjectId}`,
        examinationId: selectedExamId,
        studentId: student.id,
        subjectId: selectedSubjectId,
        marksObtained: marks,
        maxMarks: 100,
        grade,
        remarks: getStudentRemarks(student.id)
      };
    });

    saveExamResults(recordsToSave);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Examinations & Marks Evaluation Master</h2>
          <p className="text-xs text-slate-500">
            Term schedules, marks sheet grading, automatic GPA scoring, and report card generation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('marks_entry')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'marks_entry' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Marks Entry Sheet
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'schedules' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Examination Sessions
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'analytics' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Term Report Cards
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: MARKS ENTRY SHEET */}
      {activeTab === 'marks_entry' && (
        <div className="space-y-4">
          {/* Filter ribbon */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Exam:</span>
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  {examinations.map(e => (
                    <option key={e.id} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Class:</span>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Subject:</span>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  {subjects
                    .filter(s => s.classId === selectedClassId)
                    .map(s => (
                      <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveMarksSheet}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" /> Save Marks Sheet
            </button>
          </div>

          {/* Marks Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">
                Gradebook: {selectedExam?.title} &bull; {selectedSubject?.name} (Max Marks: 100)
              </span>
              <span className="text-slate-500">Grading scale: A+ (90-100), A (80-89), B+ (70-79), C (40-59), F (&lt;40)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Adm #</th>
                    <th className="p-3 text-center">Max Marks</th>
                    <th className="p-3 text-center">Marks Obtained</th>
                    <th className="p-3 text-center">Grade</th>
                    <th className="p-3">Teacher Remarks</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.map(student => {
                    const marks = getStudentMarks(student.id);
                    const grade = calculateGrade(marks, 100);
                    const remarks = getStudentRemarks(student.id);

                    return (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-800">{student.rollNo}</td>
                        <td className="p-3 font-semibold text-slate-900">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="p-3 font-mono text-slate-500">{student.admissionNo}</td>
                        <td className="p-3 text-center font-mono font-bold text-slate-500">100</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={marks}
                            onChange={(e) => handleUpdateMarks(student.id, Number(e.target.value))}
                            className="w-20 p-1.5 text-center font-mono font-bold border border-slate-200 rounded-lg outline-none focus:border-indigo-600 bg-white"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded font-bold font-mono text-xs ${
                              grade === 'A+' || grade === 'A'
                                ? 'bg-emerald-100 text-emerald-800'
                                : grade === 'B+' || grade === 'B'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {grade}
                          </span>
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={remarks}
                            onChange={(e) => handleUpdateRemarks(student.id, e.target.value)}
                            className="w-full p-1.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 bg-white"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onOpenReportCard(student.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                          >
                            View Card
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

      {/* TAB 2: EXAM SESSIONS */}
      {activeTab === 'schedules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {examinations.map(exam => (
            <div key={exam.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-sm">{exam.title}</h3>
                </div>
                <Badge variant={exam.status === 'Completed' ? 'emerald' : 'amber'}>
                  {exam.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[10px]">Start Date:</span>
                  <span className="font-semibold text-slate-800">{exam.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">End Date:</span>
                  <span className="font-semibold text-slate-800">{exam.endDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Passing Standard:</span>
                  <span className="font-bold text-indigo-700">{exam.passingPercent}% Minimum</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Weightage:</span>
                  <span className="font-semibold text-slate-800">40% of Cumulative GPA</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    setActiveTab('marks_entry');
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                >
                  Enter Subject Marks
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: REPORT CARDS LIST */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              Official Cumulative Report Cards: Grade 10-A
            </h3>
            <span className="text-xs text-slate-500">{classStudents.length} Students Registered</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {classStudents.map(student => (
              <div
                key={student.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{student.firstName} {student.lastName}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Roll: {student.rollNo} • Adm: {student.admissionNo} • Grade 10-A
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Overall Performance:</span>
                    <span className="font-bold text-indigo-700 font-mono text-sm">
                      GPA {student.academicRecord?.gpa || 3.9} / 4.0
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenReportCard(student.id)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" /> Print Marksheet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
