import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { FeeInvoice, FeeStructure, PaymentMethod } from '../../../types/erp';
import {
  Receipt,
  Plus,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Calendar,
  Search,
  CreditCard,
  Building,
  TrendingUp
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

interface FinanceManagerProps {
  onOpenReceipt: (invoiceId: string) => void;
}

export const FinanceManager: React.FC<FinanceManagerProps> = ({
  onOpenReceipt
}) => {
  const {
    feeInvoices,
    feeStructures,
    students,
    classes,
    recordFeePayment,
    currentUser
  } = useERP();

  const [activeTab, setActiveTab] = useState<'invoices' | 'structures'>('invoices');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);

  // Collect Payment Form state
  const [paymentAmount, setPaymentAmount] = useState<number>(1000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online');
  const [transactionRef, setTransactionRef] = useState('TXN-ONL-89410');

  // Computed totals
  const totalInvoiced = feeInvoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = feeInvoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalPending = totalInvoiced - totalCollected;
  const collectionRate = totalInvoiced > 0 ? ((totalCollected / totalInvoiced) * 100).toFixed(1) : '100';

  const filteredInvoices = feeInvoices.filter(inv => {
    const student = students.find(s => s.id === inv.studentId);
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student && (student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || student.lastName.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCollectModal = (invoice: FeeInvoice) => {
    setSelectedInvoice(invoice);
    const remaining = invoice.totalAmount - invoice.paidAmount;
    setPaymentAmount(remaining);
    setTransactionRef(`TXN-FEE-${Math.floor(10000 + Math.random() * 90000)}`);
    setShowCollectModal(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    recordFeePayment(selectedInvoice.id, Number(paymentAmount), paymentMethod, transactionRef);
    setShowCollectModal(false);
    onOpenReceipt(selectedInvoice.id);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Fee Invoicing, Collections & Bursar Hub</h2>
          <p className="text-xs text-slate-500">
            Student tuition invoicing, partial/full payment vouchers, and digital receipts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'invoices' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Fee Invoices & Dues
            </button>
            <button
              onClick={() => setActiveTab('structures')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'structures' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Fee Schedules & Heads
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-500 font-medium">Total Invoiced</span>
          <p className="text-xl font-bold font-mono text-slate-900">${totalInvoiced.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400">Academic Session 2025-2026</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-500 font-medium">Total Collected</span>
          <p className="text-xl font-bold font-mono text-emerald-700">${totalCollected.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-600 font-bold">{collectionRate}% Collection Rate</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-500 font-medium">Outstanding Balance</span>
          <p className="text-xl font-bold font-mono text-rose-600">${totalPending.toLocaleString()}</p>
          <span className="text-[10px] text-rose-500 font-bold">Overdue / Pending Dues</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-slate-500 font-medium">Payment Gateway</span>
          <p className="text-xl font-bold text-indigo-700">Stripe & Direct</p>
          <span className="text-[10px] text-slate-400">Instant reconciliation active</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {activeTab === 'invoices' && (
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-1 items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice number, student name..."
              className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              <option value="all">All Invoices</option>
              <option value="Paid">Paid Only</option>
              <option value="Partial">Partially Paid</option>
              <option value="Unpaid">Unpaid / Due</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      )}

      {/* Invoices Table */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Invoice #</th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Fee Title</th>
                  <th className="p-3.5 text-right">Total Fee</th>
                  <th className="p-3.5 text-right">Paid</th>
                  <th className="p-3.5 text-right">Balance</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map(inv => {
                  const student = students.find(s => s.id === inv.studentId);
                  const balance = inv.totalAmount - inv.paidAmount;

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{inv.invoiceNo}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900">
                          {student ? `${student.firstName} ${student.lastName}` : 'Enrolled Student'}
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">Adm: {student?.admissionNo}</p>
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium">{inv.title}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        ${inv.totalAmount.toFixed(2)}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                        ${inv.paidAmount.toFixed(2)}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-rose-600">
                        ${balance.toFixed(2)}
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">{inv.dueDate}</td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            inv.status === 'Paid'
                              ? 'emerald'
                              : inv.status === 'Partial'
                              ? 'amber'
                              : 'rose'
                          }
                        >
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => handleOpenCollectModal(inv)}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded text-[11px] transition-colors shadow-2xs"
                            >
                              Collect Fee
                            </button>
                          )}
                          <button
                            onClick={() => onOpenReceipt(inv.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px] flex items-center gap-1 transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" /> Receipt
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fee Structures Tab */}
      {activeTab === 'structures' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {feeStructures.map(structure => (
            <div key={structure.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{structure.title}</h3>
                  <p className="text-[11px] text-slate-400">Frequency: {structure.frequency}</p>
                </div>
                <Badge variant="indigo">Official Schedule</Badge>
              </div>

              <div className="divide-y divide-slate-100">
                {structure.breakdown.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">{item.head}</span>
                    <span className="font-mono font-bold text-slate-900">${item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">Total Term Assessment:</span>
                <span className="font-mono font-bold text-base text-indigo-700">
                  ${structure.breakdown.reduce((a, b) => a + b.amount, 0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Collect Fee Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={showCollectModal}
          onClose={() => setShowCollectModal(false)}
          title={`Collect Fee: Invoice #${selectedInvoice.invoiceNo}`}
          subtitle={`Student: ${students.find(s => s.id === selectedInvoice.studentId)?.firstName} ${students.find(s => s.id === selectedInvoice.studentId)?.lastName}`}
          maxWidth="md"
        >
          <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice Total:</span>
                <span className="font-mono font-bold text-slate-900">${selectedInvoice.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Already Paid:</span>
                <span className="font-mono font-bold text-emerald-700">${selectedInvoice.paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1">
                <span className="font-bold text-slate-900">Remaining Balance:</span>
                <span className="font-mono font-bold text-rose-600">
                  ${(selectedInvoice.totalAmount - selectedInvoice.paidAmount).toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Amount to Collect ($) *</label>
              <input
                type="number"
                min={1}
                max={selectedInvoice.totalAmount - selectedInvoice.paidAmount}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none font-mono font-bold text-sm bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
              >
                <option value="Online">Online / Credit Card</option>
                <option value="Cash">Cash at Bursar Desk</option>
                <option value="Bank Transfer">Direct Bank Wire</option>
                <option value="Cheque">Bankers Cheque</option>
                <option value="UPI">UPI / Digital QR</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Transaction Reference / Receipt Voucher #</label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none font-mono bg-white"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCollectModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
              >
                Confirm & Generate Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
