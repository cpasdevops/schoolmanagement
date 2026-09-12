import React, { useState, useMemo } from 'react';
import { useERP } from '../../context/ERPContext';
import { Search, User, BookOpen, Receipt, Megaphone, ArrowRight, X } from 'lucide-react';
import { Badge } from '../common/Badge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { students, staff, books, feeInvoices, notices, setActiveModule } = useERP();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedStudents = students.filter(
      s =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.admissionNo.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q)
    );

    const matchedStaff = staff.filter(
      st =>
        st.firstName.toLowerCase().includes(q) ||
        st.lastName.toLowerCase().includes(q) ||
        st.employeeCode.toLowerCase().includes(q) ||
        st.department.toLowerCase().includes(q)
    );

    const matchedBooks = books.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q)
    );

    const matchedInvoices = feeInvoices.filter(
      inv => inv.invoiceNo.toLowerCase().includes(q) || inv.title.toLowerCase().includes(q)
    );

    const matchedNotices = notices.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );

    return {
      students: matchedStudents,
      staff: matchedStaff,
      books: matchedBooks,
      invoices: matchedInvoices,
      notices: matchedNotices,
      totalCount:
        matchedStudents.length +
        matchedStaff.length +
        matchedBooks.length +
        matchedInvoices.length +
        matchedNotices.length
    };
  }, [query, students, staff, books, feeInvoices, notices]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across students, teachers, books, invoices, notices..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent border-none outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-slate-500 hover:bg-slate-200 rounded"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4 text-xs">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <p className="font-medium text-slate-600">Quick Global Search</p>
              <p className="text-xs">Type an admission number, student name, book title, invoice or teacher.</p>
              <div className="pt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setQuery('Lucas')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md"
                >
                  "Lucas"
                </button>
                <button
                  onClick={() => setQuery('Physics')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md"
                >
                  "Physics"
                </button>
                <button
                  onClick={() => setQuery('GWA-2024')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md"
                >
                  "GWA-2024"
                </button>
                <button
                  onClick={() => setQuery('INV-2025')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md"
                >
                  "INV-2025"
                </button>
              </div>
            </div>
          ) : searchResults && searchResults.totalCount === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p>No records found matching "{query}"</p>
            </div>
          ) : searchResults ? (
            <div className="space-y-4">
              {/* Students */}
              {searchResults.students.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Students ({searchResults.students.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.students.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setActiveModule('students');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-slate-900">{s.firstName} {s.lastName}</p>
                            <p className="text-[10px] text-slate-500 font-mono">
                              Adm: {s.admissionNo} • Roll: {s.rollNo} • Status: {s.status}
                            </p>
                          </div>
                        </div>
                        <Badge variant="indigo">View Profile</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Staff */}
              {searchResults.staff.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Staff & Faculty ({searchResults.staff.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.staff.map(st => (
                      <div
                        key={st.id}
                        onClick={() => {
                          setActiveModule('staff');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={st.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-slate-900">{st.firstName} {st.lastName}</p>
                            <p className="text-[10px] text-slate-500">
                              {st.designation} • {st.department}
                            </p>
                          </div>
                        </div>
                        <Badge variant="slate">View Staff</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Books */}
              {searchResults.books.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Library Books ({searchResults.books.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.books.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setActiveModule('library');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{b.title}</p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            By {b.author} • ISBN: {b.isbn} • {b.availableCopies} available
                          </p>
                        </div>
                        <Badge variant="emerald">In Library</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Invoices */}
              {searchResults.invoices.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5" /> Fee Invoices ({searchResults.invoices.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.invoices.map(inv => (
                      <div
                        key={inv.id}
                        onClick={() => {
                          setActiveModule('finance');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{inv.invoiceNo} - {inv.title}</p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Amount: ${inv.totalAmount} • Status: {inv.status}
                          </p>
                        </div>
                        <Badge variant={inv.status === 'Paid' ? 'emerald' : 'amber'}>{inv.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
