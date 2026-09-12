import React, { useState } from 'react';
import { useERP } from '../../../context/ERPContext';
import { Vehicle, TransportRoute } from '../../../types/erp';
import {
  Bus,
  Plus,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  Phone,
  DollarSign
} from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const TransportManager: React.FC = () => {
  const { vehicles, transportRoutes, students, addVehicle } = useERP();

  const [activeTab, setActiveTab] = useState<'fleet' | 'routes' | 'allocations'>('fleet');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  // New Vehicle form
  const [vehicleNo, setVehicleNo] = useState('');
  const [capacity, setCapacity] = useState(36);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('+1 (555) 334-9911');
  const [driverLicense, setDriverLicense] = useState('DL-COMM-2024-991');

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNo || !driverName) return;

    addVehicle({
      vehicleNumber: vehicleNo,
      type: 'Bus',
      capacity: Number(capacity),
      driverName,
      driverPhone,
      driverLicense,
      routeId: transportRoutes[0]?.id || 'route-1',
      insuranceExpiry: '2027-06-30',
      status: 'Active'
    });

    setShowAddVehicleModal(false);
    setVehicleNo('');
    setDriverName('');
  };

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Fleet Logistics & Student Transport</h2>
          <p className="text-xs text-slate-500">
            School bus fleet tracking, route schedules, driver certifications, and stop pickups.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'fleet' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Vehicles & Fleet ({vehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'routes' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Routes & Stops ({transportRoutes.length})
            </button>
            <button
              onClick={() => setActiveTab('allocations')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'allocations' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Student Allocations
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: FLEET & VEHICLES */}
      {activeTab === 'fleet' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Vehicle to Fleet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {vehicles.map(v => {
              const route = transportRoutes.find(r => r.id === v.routeId);

              return (
                <div key={v.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold shadow-xs">
                        <Bus className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm font-mono">{v.vehicleNumber}</h3>
                        <p className="text-slate-500">{v.type} &bull; Capacity {v.capacity} Passengers</p>
                      </div>
                    </div>
                    <Badge variant={v.status === 'Active' ? 'emerald' : 'rose'}>{v.status}</Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Designated Driver:</span>
                      <strong className="text-slate-900">{v.driverName}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Driver Contact:</span>
                      <span className="font-mono text-indigo-700">{v.driverPhone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">License Number:</span>
                      <span className="font-mono text-slate-700">{v.driverLicense}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Assigned Route:</span>
                      <span className="font-bold text-slate-900">{route?.name || 'Oakridge Parkway'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Insurance Expiry:</span>
                      <span className="font-mono text-slate-700">{v.insuranceExpiry}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ROUTES & STOPS */}
      {activeTab === 'routes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {transportRoutes.map(route => (
              <div key={route.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 rounded">
                      {route.routeNumber}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1">{route.name}</h3>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    ${route.monthlyFare} / mo
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    Scheduled Stops & Timings:
                  </p>
                  <div className="space-y-2">
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span className="font-medium text-slate-800">{stop.stopName}</span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600">
                          <span>Pick: {stop.pickupTime}</span>
                          <span>Drop: {stop.dropTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT ALLOCATIONS */}
      {activeTab === 'allocations' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">Student Transport Route Allocations</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Admission #</th>
                  <th className="p-3.5">Route</th>
                  <th className="p-3.5">Designated Stop</th>
                  <th className="p-3.5">Emergency Contact</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{student.admissionNo}</td>
                    <td className="p-3.5 font-semibold text-indigo-700">Route 1 (Oakridge)</td>
                    <td className="p-3.5 text-slate-700">{student.transportStop || 'Oakridge Plaza Stop 2'}</td>
                    <td className="p-3.5 font-mono text-slate-600">{student.emergencyContact}</td>
                    <td className="p-3.5">
                      <Badge variant="emerald">Bus Pass Active</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={showAddVehicleModal}
        onClose={() => setShowAddVehicleModal(false)}
        title="Add Vehicle to School Fleet"
        subtitle="Registers bus registration, seating capacity, and driver credentials."
        maxWidth="md"
      >
        <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Registration / Bus Number *</label>
            <input
              type="text"
              required
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              placeholder="e.g. BUS-2026-03"
              className="w-full p-2.5 border border-slate-200 rounded-lg outline-none uppercase font-mono bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Passenger Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Driver *</label>
              <input
                type="text"
                required
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="e.g. Harold Vance"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Driver Phone</label>
              <input
                type="text"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Driver Commercial License</label>
              <input
                type="text"
                value={driverLicense}
                onChange={(e) => setDriverLicense(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddVehicleModal(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
