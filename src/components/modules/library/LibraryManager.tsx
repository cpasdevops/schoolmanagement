import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Book, BookIssue } from '../../../types/erp';
import {
  Library,
  BookOpen,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const LibraryManager: React.FC = () => {
  const { books, bookIssues, students, staff, addBook, issueBook, returnBook } = useERP();

  const [activeTab, setActiveTab] = useState<'catalog' | 'circulation'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New Book form
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newIsbn, setNewIsbn] = useState('');
  const [newCategory, setNewCategory] = useState('Science');
  const [newCopies, setNewCopies] = useState(5);
  const [newShelf, setNewShelf] = useState('Shelf A-1');

  // Issue Book form
  const [issueBookId, setIssueBookId] = useState(books[0]?.id || '');
  const [issueStudentId, setIssueStudentId] = useState(students[0]?.id || '');
  const [issueDueDate, setIssueDueDate] = useState('2026-09-25');

  const filteredBooks = books.filter(b => {
    const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor) return;

    addBook({
      title: newTitle,
      author: newAuthor,
      isbn: newIsbn || `978-0-${Math.floor(100000 + Math.random() * 900000)}`,
      category: newCategory,
      totalCopies: Number(newCopies),
      availableCopies: Number(newCopies),
      shelfNumber: newShelf
    });

    setShowAddBookModal(false);
    setNewTitle('');
    setNewAuthor('');
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    issueBook(issueBookId, issueStudentId, 'student', issueDueDate);
    setShowIssueModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Library & Catalog Master</h2>
          <p className="text-xs text-slate-500">
            Catalog inventory, ISBN barcode tracking, student loan circulation, and automated fines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'catalog' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Book Catalog ({books.length})
            </button>
            <button
              onClick={() => setActiveTab('circulation')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'circulation' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Active Loans ({bookIssues.filter(b => b.status === 'Issued').length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BOOK CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-1 items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, author, ISBN barcode..."
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                <option value="all">All Genres & Subjects</option>
                <option value="Physics">Physics & Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Literature">World Literature</option>
                <option value="History">History & Civics</option>
              </select>

              <button
                onClick={() => setShowIssueModal(true)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
              >
                <BookOpen className="w-4 h-4" /> Issue Book
              </button>

              <button
                onClick={() => setShowAddBookModal(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" /> Add to Catalog
              </button>
            </div>
          </div>

          {/* Book Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBooks.map(book => {
              const isAvailable = book.availableCopies > 0;

              return (
                <div
                  key={book.id}
                  className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">
                        ISBN: {book.isbn}
                      </span>
                      <Badge variant={isAvailable ? 'emerald' : 'rose'}>
                        {isAvailable ? `${book.availableCopies} Available` : 'All Out'}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{book.title}</h3>
                    <p className="text-xs text-slate-500">By <strong>{book.author}</strong></p>
                  </div>

                  <div className="space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <strong className="text-slate-900">{book.category}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Shelf / Rack:</span>
                      <strong className="font-mono text-indigo-700">{book.shelfNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Volume:</span>
                      <span>{book.totalCopies} copies stocked</span>
                    </div>
                  </div>

                  <button
                    disabled={!isAvailable}
                    onClick={() => {
                      setIssueBookId(book.id);
                      setShowIssueModal(true);
                    }}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      isAvailable
                        ? 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Issue to Student
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CIRCULATION REGISTER */}
      {activeTab === 'circulation' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Active Book Circulation & Loan Register</h3>
            <span className="text-slate-500">Automated fine policy: $0.50/day past due date</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Book Title</th>
                  <th className="p-3.5">Borrower</th>
                  <th className="p-3.5">Issued Date</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Fine Accrued</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookIssues.map(issue => {
                  const book = books.find(b => b.id === issue.bookId);
                  const borrower = students.find(s => s.id === issue.borrowerId);
                  const isOverdue = new Date(issue.dueDate) < new Date() && issue.status === 'Issued';

                  return (
                    <tr key={issue.id} className="hover:bg-slate-50">
                      <td className="p-3.5">
                        <p className="font-bold text-slate-900">{book?.title || 'Library Volume'}</p>
                        <p className="text-[10px] text-slate-400 font-mono">By {book?.author}</p>
                      </td>
                      <td className="p-3.5 font-medium text-slate-900">
                        {borrower ? `${borrower.firstName} ${borrower.lastName}` : 'Lucas Vance'}
                        <span className="block text-[10px] text-slate-400 capitalize">{issue.borrowerType}</span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">{issue.issuedDate}</td>
                      <td className="p-3.5 font-mono text-slate-600">{issue.dueDate}</td>
                      <td className="p-3.5">
                        <Badge variant={issue.status === 'Returned' ? 'emerald' : isOverdue ? 'rose' : 'indigo'}>
                          {isOverdue ? 'Overdue' : issue.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-800">
                        {issue.fineAmount > 0 ? `$${issue.fineAmount.toFixed(2)}` : '$0.00'}
                      </td>
                      <td className="p-3.5 text-right">
                        {issue.status === 'Issued' && (
                          <button
                            onClick={() => returnBook(issue.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1 ml-auto shadow-2xs transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" /> Return Book
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      <Modal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        title="Register Book into Library Catalog"
        subtitle="Adds book volume to central catalog and assigns physical shelf location."
        maxWidth="md"
      >
        <form onSubmit={handleAddBook} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Book Title *</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Introduction to Algorithms (CLRS)"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Author Name *</label>
            <input
              type="text"
              required
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="e.g. Thomas H. Cormen"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ISBN Barcode</label>
              <input
                type="text"
                value={newIsbn}
                onChange={(e) => setNewIsbn(e.target.value)}
                placeholder="e.g. 978-0262033848"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none font-mono bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Genre / Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="Physics">Physics & Science</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Literature">Literature</option>
                <option value="History">History</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Stock Copies</label>
              <input
                type="number"
                min={1}
                value={newCopies}
                onChange={(e) => setNewCopies(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Shelf Number</label>
              <input
                type="text"
                value={newShelf}
                onChange={(e) => setNewShelf(e.target.value)}
                placeholder="e.g. Rack C-04"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddBookModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Add to Catalog
            </button>
          </div>
        </form>
      </Modal>

      {/* Issue Book Modal */}
      <Modal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title="Issue Book to Borrower"
        subtitle="Records loan transaction, sets due date, and updates shelf count."
        maxWidth="md"
      >
        <form onSubmit={handleIssueBook} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Book</label>
            <select
              value={issueBookId}
              onChange={(e) => setIssueBookId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {books.map(b => (
                <option key={b.id} value={b.id} disabled={b.availableCopies === 0}>
                  {b.title} ({b.availableCopies} available)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Student Borrower</label>
            <select
              value={issueStudentId}
              onChange={(e) => setIssueStudentId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} ({s.rollNo} - Adm: {s.admissionNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Due Return Date</label>
            <input
              type="date"
              value={issueDueDate}
              onChange={(e) => setIssueDueDate(e.target.value)}
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
              Confirm Issue Loan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
