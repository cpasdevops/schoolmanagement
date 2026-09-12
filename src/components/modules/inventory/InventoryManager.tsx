import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { InventoryItem, HostelRoom } from '../../../types/erp';
import {
  Boxes,
  Plus,
  Home,
  Search,
  CheckCircle,
  AlertTriangle,
  Building,
  DollarSign
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const InventoryManager: React.FC = () => {
  const { inventory, hostelRooms, students, addInventoryItem, allocateHostelRoom } = useERP();

  const [activeTab, setActiveTab] = useState<'inventory' | 'hostel'>('inventory');
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showAllocateHostelModal, setShowAllocateHostelModal] = useState(false);

  // New Item state
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<'Lab Apparatus' | 'IT Equipment' | 'Sports Gear' | 'Furniture' | 'Stationery'>('IT Equipment');
  const [quantity, setQuantity] = useState(20);
  const [unitPrice, setUnitPrice] = useState(650);
  const [location, setLocation] = useState('Computer Lab 2');

  // Allocate Hostel state
  const [selectedRoomId, setSelectedRoomId] = useState(hostelRooms[0]?.id || '');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const totalValuation = inventory.reduce((acc, curr) => acc + curr.quantity * curr.unitPrice, 0);

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;

    addInventoryItem({
      itemName,
      category,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      location,
      status: 'Operational',
      purchasedDate: new Date().toISOString().substring(0, 10)
    });

    setShowAddAssetModal(false);
    setItemName('');
  };

  const handleAllocateHostel = (e: React.FormEvent) => {
    e.preventDefault();
    allocateHostelRoom(selectedRoomId, selectedStudentId);
    setShowAllocateHostelModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Inventory, Fixed Assets & Hostel Dormitories</h2>
          <p className="text-xs text-slate-500">
            Institutional property registers, STEM equipment valuation, and campus residential dorms.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'inventory' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Assets & Supplies ({inventory.length})
            </button>
            <button
              onClick={() => setActiveTab('hostel')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'hostel' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Hostel Blocks ({hostelRooms.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: INVENTORY & ASSETS */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-slate-500">Total Tracked Asset Valuation:</span>
              <strong className="text-base font-mono font-bold text-emerald-700 ml-2">
                ${totalValuation.toLocaleString()}
              </strong>
            </div>

            <button
              onClick={() => setShowAddAssetModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Asset Item
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Asset Item</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5 text-center">Stock Qty</th>
                    <th className="p-3.5 text-right">Unit Value</th>
                    <th className="p-3.5 text-right">Total Value</th>
                    <th className="p-3.5">Location / Lab</th>
                    <th className="p-3.5">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{item.itemName}</td>
                      <td className="p-3.5">
                        <Badge variant="indigo">{item.category}</Badge>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-slate-800">{item.quantity}</td>
                      <td className="p-3.5 text-right font-mono text-slate-700">${item.unitPrice}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                        ${(item.quantity * item.unitPrice).toLocaleString()}
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium">{item.location}</td>
                      <td className="p-3.5">
                        <Badge variant={item.status === 'Operational' ? 'emerald' : 'amber'}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOSTEL RESIDENCES */}
      {activeTab === 'hostel' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Residential Dormitories & Hostels</h3>
            <button
              onClick={() => setShowAllocateHostelModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Allocate Student Room
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {hostelRooms.map(room => (
              <div key={room.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 font-bold">
                      {room.blockName} &bull; Room {room.roomNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{room.type} Room</h4>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    ${room.feePerTerm} / term
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capacity & Occupancy:</span>
                    <strong>{room.occupied} of {room.capacity} Beds Taken</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                    Resident Students:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {room.residentStudentIds.map(stId => {
                      const st = students.find(s => s.id === stId);
                      return (
                        <span
                          key={stId}
                          className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-medium text-[11px]"
                        >
                          {st ? `${st.firstName} ${st.lastName}` : 'Resident Student'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      <Modal
        isOpen={showAddAssetModal}
        onClose={() => setShowAddAssetModal(false)}
        title="Register Fixed Asset / Equipment"
        subtitle="Enters item into institutional property ledger."
        maxWidth="md"
      >
        <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Asset Description *</label>
            <input
              type="text"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. 4K Interactive Smart Board 75-inch"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              >
                <option value="IT Equipment">IT Equipment</option>
                <option value="Lab Apparatus">Lab Apparatus</option>
                <option value="Furniture">Classroom Furniture</option>
                <option value="Sports Gear">Sports Equipment</option>
                <option value="Stationery">Institutional Stationery</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Location / Room</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Smart Room 104"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unit Valuation ($)</label>
              <input
                type="number"
                min={1}
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddAssetModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Log Asset
            </button>
          </div>
        </form>
      </Modal>

      {/* Allocate Hostel Modal */}
      <Modal
        isOpen={showAllocateHostelModal}
        onClose={() => setShowAllocateHostelModal(false)}
        title="Allocate Hostel Dormitory Room"
        subtitle="Assigns resident room to enrolled boarding student."
        maxWidth="md"
      >
        <form onSubmit={handleAllocateHostel} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Hostel Dormitory Room</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {hostelRooms.map(r => (
                <option key={r.id} value={r.id} disabled={r.occupied >= r.capacity}>
                  {r.blockName} - Room {r.roomNumber} ({r.occupied}/{r.capacity} Occupied)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} (Roll: {s.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAllocateHostelModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Confirm Room Allocation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
