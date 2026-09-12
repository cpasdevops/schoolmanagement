import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Homework, HomeworkSubmission, Student } from '../../../types/erp';
import {
  BookOpen,
  Plus,
  Calendar,
  FileCheck,
  CheckCircle,
  Clock,
  Paperclip,
  Award,
  Send,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const HomeworkManager: React.FC = () => {
  const { homework, students, subjects, classes, addHomework, gradeHomeworkSubmission, currentUser, currentRole } = useERP();

  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Homework state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newClassId, setNewClassId] = useState('class-gr10');
  const [newSectionId, setNewSectionId] = useState('sec-10a');
  const [newSubjectId, setNewSubjectId] = useState('sub-phys-10');
  const [newDueDate, setNewDueDate] = useState('2026-09-18');
  const [newMaxMarks, setNewMaxMarks] = useState(50);
  const [newAttachment, setNewAttachment] = useState('Kinematics_Problem_Set.pdf');

  // Grading state for selected submission
  const [gradingMarks, setGradingMarks] = useState<number>(45);
  const [gradingFeedback, setGradingFeedback] = useState<string>('Excellent problem solving!');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    addHomework({
      classId: newClassId,
      sectionId: newSectionId,
      subjectId: newSubjectId,
      teacherId: 'staff-1',
      title: newTitle,
      description: newDesc,
      assignedDate: new Date().toISOString().substring(0, 10),
      dueDate: newDueDate,
      maxMarks: Number(newMaxMarks),
      attachmentName: newAttachment,
      submissions: [
        {
          id: `sub-demo-${Date.now()}`,
          studentId: 'stu-1',
          submittedDate: new Date().toISOString().substring(0, 10),
          fileUrl: 'lucas_solution_v1.pdf',
          status: 'Submitted',
          content: 'Completed all 5 physics kinematics equation derivations with graph plots attached.'
        }
      ]
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleSaveGrade = (submissionId: string) => {
    if (!selectedHomework) return;
    gradeHomeworkSubmission(selectedHomework.id, submissionId, Number(gradingMarks), gradingFeedback);
    setSelectedSubmissionId(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Homework & Assignment Evaluation Hub</h2>
          <p className="text-xs text-slate-500">
            Publish academic assignments, track student turn-ins, and record evaluation grades.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Assignment
          </button>
        </div>
      </div>

      {/* Homework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {homework.map(hw => {
          const sub = subjects.find(s => s.id === hw.subjectId);
          const cls = classes.find(c => c.id === hw.classId);
          const submittedCount = hw.submissions.length;
          const gradedCount = hw.submissions.filter(s => s.status === 'Graded').length;

          return (
            <div
              key={hw.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 rounded">
                    {sub?.code || 'SCI-101'}
                  </span>
                  <Badge variant={new Date(hw.dueDate) < new Date() ? 'rose' : 'amber'}>
                    Due: {hw.dueDate}
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{hw.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{hw.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Class: {cls?.name || 'Grade 10-A'}</span>
                  <span>Max Marks: <strong>{hw.maxMarks}</strong></span>
                </div>

                {hw.attachmentName && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 truncate">
                    <Paperclip className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{hw.attachmentName}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Submissions Status:</span>
                  <span className="font-semibold text-slate-900">
                    {submittedCount} Submitted • {gradedCount} Graded
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedHomework(hw)}
                className="w-full py-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" /> Review Submissions ({submittedCount})
              </button>
            </div>
          );
        })}
      </div>

      {/* Review Submissions Modal */}
      {selectedHomework && (
        <Modal
          isOpen={!!selectedHomework}
          onClose={() => setSelectedHomework(null)}
          title={`Submissions: ${selectedHomework.title}`}
          subtitle={`Max Marks: ${selectedHomework.maxMarks} • Due Date: ${selectedHomework.dueDate}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-700 leading-relaxed">{selectedHomework.description}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Student Submissions Log</h4>
              {selectedHomework.submissions.length === 0 ? (
                <p className="py-6 text-center text-slate-400">No student submissions turned in yet.</p>
              ) : (
                selectedHomework.submissions.map(sub => {
                  const student = students.find(s => s.id === sub.studentId);
                  const isGradingThis = selectedSubmissionId === sub.id;

                  return (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={student?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-bold text-slate-900">
                              {student ? `${student.firstName} ${student.lastName}` : 'Lucas Vance'}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Turned in on {sub.submittedDate} • Attachment: {sub.fileUrl || 'file.pdf'}
                            </p>
                          </div>
                        </div>

                        <Badge variant={sub.status === 'Graded' ? 'emerald' : 'indigo'}>
                          {sub.status === 'Graded' ? `Score: ${sub.marksObtained}/${selectedHomework.maxMarks}` : 'Pending Evaluation'}
                        </Badge>
                      </div>

                      {sub.content && (
                        <div className="p-2.5 bg-slate-50 rounded text-slate-700 border border-slate-100 italic">
                          "{sub.content}"
                        </div>
                      )}

                      {sub.feedback && (
                        <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded">
                          <strong>Teacher Feedback:</strong> {sub.feedback}
                        </div>
                      )}

                      {/* Grading Form or trigger button */}
                      {isGradingThis ? (
                        <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">
                                Marks (Max {selectedHomework.maxMarks})
                              </label>
                              <input
                                type="number"
                                min={0}
                                max={selectedHomework.maxMarks}
                                value={gradingMarks}
                                onChange={(e) => setGradingMarks(Number(e.target.value))}
                                className="w-full p-2 border border-slate-200 rounded outline-none bg-white font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold text-slate-700 mb-1">Teacher Feedback</label>
                              <input
                                type="text"
                                value={gradingFeedback}
                                onChange={(e) => setGradingFeedback(e.target.value)}
                                placeholder="e.g. Well written derivations!"
                                className="w-full p-2 border border-slate-200 rounded outline-none bg-white"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedSubmissionId(null)}
                              className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded text-xs"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveGrade(sub.id)}
                              className="px-3 py-1 bg-indigo-600 text-white rounded font-semibold text-xs shadow-xs"
                            >
                              Save Grade
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setSelectedSubmissionId(sub.id);
                              setGradingMarks(sub.marksObtained || selectedHomework.maxMarks - 5);
                              setGradingFeedback(sub.feedback || 'Good work.');
                            }}
                            className="px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded font-semibold text-xs transition-colors"
                          >
                            {sub.status === 'Graded' ? 'Modify Grade' : 'Grade Submission'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Create Homework Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Publish New Assignment / Project"
        subtitle="Notifies students and guardians with submission instructions and deadline."
        maxWidth="md"
      >
        <form onSubmit={handleCreateHomework} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Thermodynamics and Heat Transfer Problems"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructions / Description *</label>
            <textarea
              required
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Detail required derivations, chapters to reference, and presentation expectations..."
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Class</label>
              <select
                value={newClassId}
                onChange={(e) => setNewClassId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject</label>
              <select
                value={newSubjectId}
                onChange={(e) => setNewSubjectId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Marks</label>
              <input
                type="number"
                value={newMaxMarks}
                onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reference Worksheet (Attachment)</label>
            <input
              type="text"
              value={newAttachment}
              onChange={(e) => setNewAttachment(e.target.value)}
              placeholder="e.g. Chapter_4_Questions.pdf"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Publish Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
