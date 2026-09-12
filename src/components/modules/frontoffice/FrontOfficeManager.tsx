import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { VisitorRecord, AdmissionEnquiry, ComplaintTicket } from '../../../types/erp';
import {
  PhoneCall,
  Plus,
  Search,
  UserCheck,
  CheckCircle,
  Clock,
  LogOut,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const FrontOfficeManager: React.FC = () => {
  const {
    visitors,
    admissionEnquiries,
    complaintTickets,
    addVisitor,
    checkoutVisitor,
    addAdmissionEnquiry,
    updateEnquiryStatus,
    resolveComplaint
  } = useERP();

  const [activeTab, setActiveTab] = useState<'visitors' | 'enquiries' | 'complaints'>('visitors');
  const [showAddVisitorModal, setShowAddVisitorModal] = useState(false);
  const [showAddEnquiryModal, setShowAddEnquiryModal] = useState(false);

  // New Visitor state
  const [vName, setVName] = useState('');
  const [vPhone, setVPhone] = useState('+1 (555) 441-2299');
  const [vPurpose, setVPurpose] = useState('Parent-Principal Consultation');
  const [vMeetingWhom, setVMeetingWhom] = useState('Dr. Eleanor Thorne');

  // New Enquiry state
  const [enqStudentName, setEnqStudentName] = useState('');
  const [enqParentName, setEnqParentName] = useState('');
  const [enqPhone, setEnqPhone] = useState('+1 (555) 902-1144');
  const [enqClass, setEnqClass] = useState('Grade 9');
  const [enqPreviousSchool, setEnqPreviousSchool] = useState('Oakridge Elementary');

  const handleCreateVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName) return;

    addVisitor({
      visitorName: vName,
      phone: vPhone,
      purpose: vPurpose,
      meetingWhom: vMeetingWhom,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().substring(0, 10),
      badgeNumber: `V-BADGE-${Math.floor(100 + Math.random() * 900)}`
    });

    setShowAddVisitorModal(false);
    setVName('');
  };

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enqStudentName || !enqParentName) return;

    addAdmissionEnquiry({
      studentName: enqStudentName,
      parentName: enqParentName,
      phone: enqPhone,
      email: `${enqStudentName.toLowerCase().replace(' ', '')}@gmail.com`,
      classAppliedFor: enqClass,
      previousSchool: enqPreviousSchool,
      status: 'Inquired',
      date: new Date().toISOString().substring(0, 10),
      notes: 'Parent interested in STEM curriculum and bus facility.'
    });

    setShowAddEnquiryModal(false);
    setEnqStudentName('');
    setEnqParentName('');
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Front Office, Visitor Pass & Admissions Desk</h2>
          <p className="text-xs text-slate-500">
            Visitor security gate passes, prospect admission inquiries, and grievance resolution tickets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'visitors' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Visitor Gate Pass ({visitors.filter(v => !v.checkOutTime).length} On Premises)
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'enquiries' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Admission Inquiries ({admissionEnquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'complaints' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Grievance Tickets ({complaintTickets.filter(c => c.status !== 'Resolved').length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: VISITORS REGISTER */}
      {activeTab === 'visitors' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Today's Campus Visitor Log</h3>
            <button
              onClick={() => setShowAddVisitorModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Issue Visitor Pass
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Badge #</th>
                    <th className="p-3.5">Visitor Name</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Purpose of Visit</th>
                    <th className="p-3.5">Meeting With</th>
                    <th className="p-3.5">Check-In Time</th>
                    <th className="p-3.5">Check-Out</th>
                    <th className="p-3.5 text-right">Gate Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visitors.map(visitor => (
                    <tr key={visitor.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-indigo-700">{visitor.badgeNumber}</td>
                      <td className="p-3.5 font-bold text-slate-900">{visitor.visitorName}</td>
                      <td className="p-3.5 font-mono text-slate-600">{visitor.phone}</td>
                      <td className="p-3.5 text-slate-700">{visitor.purpose}</td>
                      <td className="p-3.5 font-medium text-slate-800">{visitor.meetingWhom}</td>
                      <td className="p-3.5 font-mono text-slate-600">{visitor.checkInTime}</td>
                      <td className="p-3.5 font-mono">
                        {visitor.checkOutTime ? (
                          <span className="text-slate-500">{visitor.checkOutTime}</span>
                        ) : (
                          <Badge variant="emerald">On Campus</Badge>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        {!visitor.checkOutTime && (
                          <button
                            onClick={() => checkoutVisitor(visitor.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px] flex items-center gap-1 ml-auto transition-colors"
                          >
                            <LogOut className="w-3 h-3" /> Check Out
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADMISSION ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Prospect Student Admission Enquiries</h3>
            <button
              onClick={() => setShowAddEnquiryModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Log New Enquiry
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Candidate Name</th>
                    <th className="p-3.5">Parent / Guardian</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Target Grade</th>
                    <th className="p-3.5">Previous School</th>
                    <th className="p-3.5">Enquiry Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Pipeline Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissionEnquiries.map(enq => (
                    <tr key={enq.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{enq.studentName}</td>
                      <td className="p-3.5 text-slate-700">{enq.parentName}</td>
                      <td className="p-3.5 font-mono text-slate-600">{enq.phone}</td>
                      <td className="p-3.5 font-semibold text-indigo-700">{enq.classAppliedFor}</td>
                      <td className="p-3.5 text-slate-500">{enq.previousSchool}</td>
                      <td className="p-3.5 font-mono text-slate-600">{enq.date}</td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            enq.status === 'Enrolled'
                              ? 'emerald'
                              : enq.status === 'Interview Scheduled'
                              ? 'indigo'
                              : 'amber'
                          }
                        >
                          {enq.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        {enq.status !== 'Enrolled' && (
                          <button
                            onClick={() => updateEnquiryStatus(enq.id, 'Interview Scheduled')}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded text-[11px] transition-colors"
                          >
                            Schedule Interview
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GRIEVANCES & COMPLAINTS */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {complaintTickets.map(ticket => (
              <div key={ticket.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400">
                      TICKET #{ticket.id.toUpperCase()}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{ticket.subject}</h4>
                  </div>
                  <Badge variant={ticket.status === 'Resolved' ? 'emerald' : 'amber'}>
                    {ticket.status}
                  </Badge>
                </div>

                <p className="text-slate-600 leading-relaxed">{ticket.description}</p>

                <div className="p-2.5 bg-slate-50 rounded-lg space-y-1 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Filed By:</span>
                    <strong className="text-slate-900">{ticket.submittedBy}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium text-slate-800">{ticket.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date Filed:</span>
                    <span className="font-mono">{ticket.date}</span>
                  </div>
                </div>

                {ticket.status !== 'Resolved' && (
                  <button
                    onClick={() => resolveComplaint(ticket.id, 'Resolved and communicated to family')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Visitor Modal */}
      <Modal
        isOpen={showAddVisitorModal}
        onClose={() => setShowAddVisitorModal(false)}
        title="Issue Campus Visitor Pass"
        subtitle="Registers visitor identity and issues physical access pass."
        maxWidth="md"
      >
        <form onSubmit={handleCreateVisitor} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Visitor Full Name *</label>
            <input
              type="text"
              required
              value={vName}
              onChange={(e) => setVName(e.target.value)}
              placeholder="e.g. Robert Sterling"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={vPhone}
              onChange={(e) => setVPhone(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Purpose of Visit</label>
            <input
              type="text"
              value={vPurpose}
              onChange={(e) => setVPurpose(e.target.value)}
              placeholder="e.g. Admission Inquiry & School Tour"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Person / Officer to Meet</label>
            <input
              type="text"
              value={vMeetingWhom}
              onChange={(e) => setVMeetingWhom(e.target.value)}
              placeholder="e.g. Registrar Office"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddVisitorModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Issue Gate Pass
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Enquiry Modal */}
      <Modal
        isOpen={showAddEnquiryModal}
        onClose={() => setShowAddEnquiryModal(false)}
        title="Register Admission Inquiry"
        subtitle="Enters prospect candidate into the admissions pipeline."
        maxWidth="md"
      >
        <form onSubmit={handleCreateEnquiry} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Candidate Name *</label>
              <input
                type="text"
                required
                value={enqStudentName}
                onChange={(e) => setEnqStudentName(e.target.value)}
                placeholder="e.g. Charlotte Hayes"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian *</label>
              <input
                type="text"
                required
                value={enqParentName}
                onChange={(e) => setEnqParentName(e.target.value)}
                placeholder="e.g. Daniel Hayes"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={enqPhone}
                onChange={(e) => setEnqPhone(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Class / Grade</label>
              <input
                type="text"
                value={enqClass}
                onChange={(e) => setEnqClass(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Previous Institution</label>
            <input
              type="text"
              value={enqPreviousSchool}
              onChange={(e) => setEnqPreviousSchool(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddEnquiryModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Save Inquiry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
