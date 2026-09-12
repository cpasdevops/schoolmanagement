import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { TimetableSlot, DayOfWeek } from '../../../types/erp';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Plus,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const TimetableManager: React.FC = () => {
  const { classes, subjects, staff, timetableSlots, addTimetableSlot } = useERP();

  const [selectedClassId, setSelectedClassId] = useState('class-gr10');
  const [selectedSectionId, setSelectedSectionId] = useState('sec-10a');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal form state
  const [slotDay, setSlotDay] = useState<DayOfWeek>('Monday');
  const [slotPeriod, setSlotPeriod] = useState(1);
  const [slotSubjectId, setSlotSubjectId] = useState('sub-phys-10');
  const [slotTeacherId, setSlotTeacherId] = useState('staff-1');
  const [slotRoom, setSlotRoom] = useState('Room 302 (Lab)');
  const [slotStart, setSlotStart] = useState('08:30');
  const [slotEnd, setSlotEnd] = useState('09:15');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const periods = [
    { periodNumber: 1, time: '08:30 - 09:15' },
    { periodNumber: 2, time: '09:20 - 10:05' },
    { periodNumber: 3, time: '10:20 - 11:05' },
    { periodNumber: 4, time: '11:10 - 11:55' },
    { periodNumber: 5, time: '12:35 - 01:20' }
  ];

  // Filter slots
  const filteredSlots = timetableSlots.filter(
    s => s.classId === selectedClassId && s.sectionId === selectedSectionId
  );

  const getSlot = (day: DayOfWeek, periodNumber: number) => {
    return filteredSlots.find(s => s.day === day && s.periodNumber === periodNumber);
  };

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    addTimetableSlot({
      classId: selectedClassId,
      sectionId: selectedSectionId,
      day: slotDay,
      periodNumber: Number(slotPeriod),
      startTime: slotStart,
      endTime: slotEnd,
      subjectId: slotSubjectId,
      teacherId: slotTeacherId,
      roomNumber: slotRoom
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Schedule & Timetable Master</h2>
          <p className="text-xs text-slate-500">
            Interactive weekly periods distribution, room allocations, and teacher schedules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print Timetable
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Allocate Period
          </button>
        </div>
      </div>

      {/* Selector Filters */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
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
            <span className="font-semibold text-slate-700">Section:</span>
            <select
              value={selectedSectionId}
              onChange={(e) => setSelectedSectionId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
            >
              <option value="sec-10a">Section A</option>
              <option value="sec-10b">Section B</option>
            </select>
          </div>
        </div>

        {/* Day Filter Chips */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              selectedDay === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Full Week Grid
          </button>
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                selectedDay === d ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Weekly Master Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <th className="p-3.5 border-r border-slate-200 w-32">Day / Time</th>
                {periods.map(p => (
                  <th key={p.periodNumber} className="p-3.5 border-r border-slate-200 text-center min-w-[180px]">
                    <span className="font-bold text-slate-900 block">Period {p.periodNumber}</span>
                    <span className="text-[10px] text-slate-500 font-mono block font-normal">{p.time}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {days
                .filter(d => selectedDay === 'all' || selectedDay === d)
                .map(day => (
                  <tr key={day} className="hover:bg-slate-50/50">
                    <td className="p-3.5 bg-slate-50/80 border-r border-slate-200 font-bold text-slate-900">
                      {day}
                    </td>

                    {periods.map(p => {
                      const slot = getSlot(day, p.periodNumber);
                      const sub = slot ? subjects.find(s => s.id === slot.subjectId) : null;
                      const teacher = slot ? staff.find(st => st.id === slot.teacherId) : null;

                      return (
                        <td key={p.periodNumber} className="p-3 border-r border-slate-200 align-top">
                          {slot && sub ? (
                            <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded-lg space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                                  {sub.code}
                                </span>
                                <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                                  <MapPin className="w-3 h-3 text-slate-400" /> {slot.roomNumber}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-xs truncate">{sub.name}</h4>
                              <div className="flex items-center gap-1.5 pt-1 border-t border-indigo-100 text-[11px] text-slate-600">
                                <User className="w-3 h-3 text-slate-400" />
                                <span className="truncate">
                                  {teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Instructor'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg text-center text-[11px] text-slate-400">
                              Free / Self Study
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Allocate Timetable Period"
        subtitle="Schedule a subject and assign classroom and faculty for Grade 10-A."
        maxWidth="md"
      >
        <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Day of Week</label>
              <select
                value={slotDay}
                onChange={(e) => setSlotDay(e.target.value as DayOfWeek)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Period Slot</label>
              <select
                value={slotPeriod}
                onChange={(e) => setSlotPeriod(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                {periods.map(p => (
                  <option key={p.periodNumber} value={p.periodNumber}>
                    Period {p.periodNumber} ({p.time})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subject</label>
            <select
              value={slotSubjectId}
              onChange={(e) => setSlotSubjectId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Faculty / Teacher</label>
            <select
              value={slotTeacherId}
              onChange={(e) => setSlotTeacherId(e.target.value)}
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
            <label className="block font-semibold text-slate-700 mb-1">Assigned Classroom / Lab</label>
            <input
              type="text"
              value={slotRoom}
              onChange={(e) => setSlotRoom(e.target.value)}
              placeholder="e.g. Science Lab 2"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
