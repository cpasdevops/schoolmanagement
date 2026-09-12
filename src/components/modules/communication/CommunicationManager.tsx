import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Notice, SchoolEvent, PTMMeeting } from '../../../types/erp';
import {
  Megaphone,
  Calendar,
  Plus,
  Users,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle,
  CalendarCheck
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const CommunicationManager: React.FC = () => {
  const {
    notices,
    events,
    ptmMeetings,
    students,
    staff,
    addNotice,
    addSchoolEvent,
    schedulePTM,
    currentUser
  } = useERP();

  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'ptm'>('notices');
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSchedulePTMModal, setShowSchedulePTMModal] = useState(false);

  // New Notice state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePriority, setNoticePriority] = useState<'General' | 'Important' | 'Urgent'>('Important');
  const [noticeAudience, setNoticeAudience] = useState<'All' | 'Students' | 'Parents' | 'Staff'>('All');

  // New Event state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventStart, setEventStart] = useState('2026-10-15');
  const [eventEnd, setEventEnd] = useState('2026-10-16');
  const [eventLocation, setEventLocation] = useState('Main Sports Complex');
  const [eventType, setEventType] = useState<'Academic' | 'Holiday' | 'Sports' | 'Cultural' | 'Exam'>('Sports');

  // PTM state
  const [ptmStudentId, setPtmStudentId] = useState(students[0]?.id || '');
  const [ptmDate, setPtmDate] = useState('2026-09-26');
  const [ptmTime, setPtmTime] = useState('11:00 AM');
  const [ptmAgenda, setPtmAgenda] = useState('Term 1 Academic Progress and Physics lab evaluation');

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;

    addNotice({
      title: noticeTitle,
      content: noticeContent,
      publishedDate: new Date().toISOString().substring(0, 10),
      priority: noticePriority,
      targetAudience: noticeAudience,
      authorName: currentUser.name,
      authorRole: currentUser.role.replace('_', ' ')
    });

    setShowAddNoticeModal(false);
    setNoticeTitle('');
    setNoticeContent('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;

    addSchoolEvent({
      title: eventTitle,
      description: eventDesc,
      startDate: eventStart,
      endDate: eventEnd,
      type: eventType,
      location: eventLocation,
      organizer: 'School Administration'
    });

    setShowAddEventModal(false);
    setEventTitle('');
  };

  const handleSchedulePTM = (e: React.FormEvent) => {
    e.preventDefault();
    schedulePTM({
      studentId: ptmStudentId,
      parentId: 'parent-1',
      teacherId: 'staff-1',
      scheduledDate: ptmDate,
      timeSlot: ptmTime,
      status: 'Scheduled',
      agenda: ptmAgenda
    });

    setShowSchedulePTMModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Notice Board, Events & PTM Consultations</h2>
          <p className="text-xs text-slate-500">
            Publish institutional broadcasts, annual event timelines, and schedule parent-teacher meetings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('notices')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'notices' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Notice Board
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'events' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Calendar & Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('ptm')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'ptm' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              PTM Meetings ({ptmMeetings.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Institutional Notice Stream</h3>
            <button
              onClick={() => setShowAddNoticeModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Issue Notice / Alert
            </button>
          </div>

          <div className="space-y-4">
            {notices.map(notice => (
              <div
                key={notice.id}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        notice.priority === 'Urgent'
                          ? 'rose'
                          : notice.priority === 'Important'
                          ? 'amber'
                          : 'blue'
                      }
                    >
                      {notice.priority}
                    </Badge>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Audience: {notice.targetAudience}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Published: {notice.publishedDate}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">{notice.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{notice.content}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Author: <strong>{notice.authorName}</strong> ({notice.authorRole})</span>
                  <span className="text-indigo-600 font-medium">Greenwood Official Dispatch</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CALENDAR & EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Academic & Extracurricular Calendar</h3>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Calendar Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {events.map(event => (
              <div key={event.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant={event.type === 'Holiday' ? 'amber' : 'indigo'}>
                      {event.type}
                    </Badge>
                    <h4 className="font-bold text-slate-900 text-sm mt-1.5">{event.title}</h4>
                  </div>
                  <div className="text-right font-mono text-slate-500 text-[11px]">
                    <span>{event.startDate}</span>
                    {event.endDate !== event.startDate && <span> to {event.endDate}</span>}
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">{event.description}</p>

                <div className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {event.location}
                  </span>
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PTM MEETINGS */}
      {activeTab === 'ptm' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Parent-Teacher Meeting Consultations</h3>
            <button
              onClick={() => setShowSchedulePTMModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Schedule PTM Slot
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {ptmMeetings.map(ptm => {
              const student = students.find(s => s.id === ptm.studentId);
              const teacher = staff.find(s => s.id === ptm.teacherId);

              return (
                <div key={ptm.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Consultation: {student ? `${student.firstName} ${student.lastName}` : 'Lucas Vance'}
                      </h4>
                      <p className="text-[11px] text-slate-500">Grade 10-A Academic Progress Review</p>
                    </div>
                    <Badge variant={ptm.status === 'Completed' ? 'emerald' : 'indigo'}>
                      {ptm.status}
                    </Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Scheduled Date & Time:</span>
                      <strong className="font-mono text-slate-800">{ptm.scheduledDate} at {ptm.timeSlot}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Faculty Teacher:</span>
                      <span className="font-medium text-slate-800">{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Sarah Jenkins'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Parent Guardian:</span>
                      <span className="font-medium text-slate-800">Michael Vance</span>
                    </div>
                  </div>

                  <p className="text-slate-600 italic">"Agenda: {ptm.agenda}"</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Notice Modal */}
      <Modal
        isOpen={showAddNoticeModal}
        onClose={() => setShowAddNoticeModal(false)}
        title="Publish Institutional Announcement"
        subtitle="Broadcasts alert to student portal, parent app, and staff notice stream."
        maxWidth="md"
      >
        <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Headline *</label>
            <input
              type="text"
              required
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="e.g. Schedule for Second Term Diagnostic Assessments"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Announcement Body *</label>
            <textarea
              required
              rows={4}
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              placeholder="Provide complete details, dates, instructions, and department contact..."
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority Level</label>
              <select
                value={noticePriority}
                onChange={(e) => setNoticePriority(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
              >
                <option value="General">General Notice</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent / Alert</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
              <select
                value={noticeAudience}
                onChange={(e) => setNoticeAudience(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="All">All School Community</option>
                <option value="Parents">Parents Only</option>
                <option value="Students">Students Only</option>
                <option value="Staff">Faculty & Staff</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddNoticeModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        title="Schedule School Event"
        subtitle="Adds to institutional academic and activity calendar."
        maxWidth="md"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="e.g. Annual Inter-School Debating Championship"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={eventEnd}
                onChange={(e) => setEventEnd(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Holiday">School Holiday</option>
                <option value="Exam">Examination</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Location / Venue</label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="e.g. Main Auditorium"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddEventModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Save Event
            </button>
          </div>
        </form>
      </Modal>

      {/* Schedule PTM Modal */}
      <Modal
        isOpen={showSchedulePTMModal}
        onClose={() => setShowSchedulePTMModal(false)}
        title="Schedule Parent-Teacher Consultation"
        subtitle="Books conference slot with student guardians and assigned class faculty."
        maxWidth="md"
      >
        <form onSubmit={handleSchedulePTM} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
            <select
              value={ptmStudentId}
              onChange={(e) => setPtmStudentId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} (Roll: {s.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={ptmDate}
                onChange={(e) => setPtmDate(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
              <input
                type="text"
                value={ptmTime}
                onChange={(e) => setPtmTime(e.target.value)}
                placeholder="e.g. 10:30 AM"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Discussion Agenda</label>
            <input
              type="text"
              value={ptmAgenda}
              onChange={(e) => setPtmAgenda(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowSchedulePTMModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Book Consultation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
