import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Subject, ClassGrade, Section } from '../../../types/erp';
import {
  GraduationCap,
  BookOpen,
  Plus,
  Users,
  Layers,
  FileCheck,
  Award,
  CheckCircle2,
  Clock,
  Edit2
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const AcademicsManager: React.FC = () => {
  const { classes, subjects, staff, addSubject, updateSubject } = useERP();

  const [activeTab, setActiveTab] = useState<'classes' | 'subjects' | 'syllabus'>('classes');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'class-gr10');
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  // New Subject form state
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubType, setNewSubType] = useState<'Core' | 'Elective' | 'Vocational' | 'Lab'>('Core');
  const [newSubTeacherId, setNewSubTeacherId] = useState(staff[0]?.id || '');
  const [newSubCredits, setNewSubCredits] = useState(4);

  const selectedClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classSubjects = subjects.filter(s => s.classId === selectedClassId);

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName || !newSubCode) return;

    addSubject({
      name: newSubName,
      code: newSubCode.toUpperCase(),
      classId: selectedClassId,
      teacherId: newSubTeacherId,
      credits: Number(newSubCredits),
      type: newSubType,
      syllabusProgressPercent: 0
    });

    setShowAddSubjectModal(false);
    setNewSubName('');
    setNewSubCode('');
  };

  const handleUpdateProgress = (subjectId: string, current: number) => {
    const next = Math.min(100, current + 10);
    updateSubject(subjectId, { syllabusProgressPercent: next });
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Structure & Curriculum Setup</h2>
          <p className="text-xs text-slate-500">
            Manage grade levels, sections, subject offerings, syllabus timelines, and teacher assignments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'classes' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Classes & Sections
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'subjects' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Curriculum Subjects
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'syllabus' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Syllabus Tracker
            </button>
          </div>
        </div>
      </div>

      {/* Class Selector strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {classes.map(c => {
          const isSelected = c.id === selectedClassId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedClassId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.name} ({c.code})
            </button>
          );
        })}
      </div>

      {/* TAB 1: Classes & Sections View */}
      {activeTab === 'classes' && selectedClass && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{selectedClass.name} Overview</h3>
                <Badge variant="indigo">Grade {selectedClass.gradeNumber}</Badge>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Class Code:</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedClass.code}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Sections Operating:</span>
                  <span className="font-semibold text-slate-900">{selectedClass.sections.length}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Active Subjects:</span>
                  <span className="font-semibold text-slate-900">{classSubjects.length} Courses</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Affiliation Track:</span>
                  <span className="font-semibold text-slate-900">IB Diploma / CBSE Senior</span>
                </div>
              </div>
            </div>

            {/* Sections Cards */}
            {selectedClass.sections.map(sec => {
              const teacher = staff.find(st => st.id === sec.classTeacherId);
              return (
                <div key={sec.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Section {sec.name}</h4>
                      <p className="text-[11px] text-slate-400">Classroom: {sec.roomNumber}</p>
                    </div>
                    <Badge variant="emerald">Capacity: {sec.currentStrength}/{sec.capacity}</Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3 text-xs">
                    <img
                      src={teacher?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Class Teacher</p>
                      <p className="font-bold text-slate-900">{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Assigned Faculty'}</p>
                      <p className="text-[10px] text-slate-500">{teacher?.email}</p>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(sec.currentStrength / sec.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Subjects Catalog */}
      {activeTab === 'subjects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Prescribed Subjects for {selectedClass.name} ({classSubjects.length} Courses)
            </h3>
            <button
              onClick={() => setShowAddSubjectModal(true)}
              className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Subject to Class
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classSubjects.map(sub => {
              const teacher = staff.find(st => st.id === sub.teacherId);
              return (
                <div key={sub.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {sub.code}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{sub.name}</h4>
                    </div>
                    <Badge variant={sub.type === 'Core' ? 'indigo' : sub.type === 'Lab' ? 'emerald' : 'amber'}>
                      {sub.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
                    <img
                      src={teacher?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unassigned'}
                      </p>
                      <p className="text-[10px] text-slate-500">Lead Faculty • {sub.credits} Credits</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Syllabus Completion:</span>
                      <span className="font-bold text-indigo-700">{sub.syllabusProgressPercent || 65}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${sub.syllabusProgressPercent || 65}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Syllabus Tracking */}
      {activeTab === 'syllabus' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              Term 1 Syllabus Progress & Milestone Verification
            </h3>
            <span className="text-xs text-slate-500">Mid-Term Exam Readiness</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {classSubjects.map(sub => {
              const currentP = sub.syllabusProgressPercent || 60;
              return (
                <div key={sub.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-indigo-700">{sub.code}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{sub.name}</h4>
                      <Badge variant="slate">{sub.type}</Badge>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Curriculum Units Covered: 4 of 6 Units • Next milestone: Kinematics & Wave Optics Lab
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-36 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>Progress:</span>
                        <span className="font-bold text-indigo-900">{currentP}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all"
                          style={{ width: `${currentP}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleUpdateProgress(sub.id, currentP)}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg transition-colors"
                    >
                      +10% Lesson Done
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      <Modal
        isOpen={showAddSubjectModal}
        onClose={() => setShowAddSubjectModal(false)}
        title={`Add Subject to ${selectedClass.name}`}
        subtitle="Registers subject code and assigns qualified teaching faculty."
        maxWidth="md"
      >
        <form onSubmit={handleCreateSubject} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subject Name *</label>
            <input
              type="text"
              required
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              placeholder="e.g. World History & Civics"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject Code *</label>
              <input
                type="text"
                required
                value={newSubCode}
                onChange={(e) => setNewSubCode(e.target.value)}
                placeholder="e.g. HIST-101"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none uppercase font-mono bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Course Type</label>
              <select
                value={newSubType}
                onChange={(e) => setNewSubType(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="Core">Core</option>
                <option value="Elective">Elective</option>
                <option value="Lab">Laboratory</option>
                <option value="Vocational">Vocational</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Teacher</label>
              <select
                value={newSubTeacherId}
                onChange={(e) => setNewSubTeacherId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-medium"
              >
                {staff.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.firstName} {st.lastName} ({st.department})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Weekly Credits</label>
              <input
                type="number"
                min={1}
                max={10}
                value={newSubCredits}
                onChange={(e) => setNewSubCredits(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddSubjectModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Add Subject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
