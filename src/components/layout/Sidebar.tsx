import React from 'react';
import { useERP } from '../../context/ERPContext';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  CalendarDays,
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  Receipt,
  Briefcase,
  CalendarCheck,
  Bus,
  Library,
  Megaphone,
  Calendar,
  ShieldAlert,
  Award,
  PhoneCall,
  Package,
  BarChart3,
  History,
  Settings,
  HeartPulse,
  DollarSign,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles?: string[]; // If omitted, visible to all
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { activeModule, setActiveModule, currentRole } = useERP();

  const navGroups: NavGroup[] = [
    {
      title: 'Core & Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Academics & Classroom',
      items: [
        { id: 'academics', label: 'Classes & Subjects', icon: GraduationCap, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'teacher'] },
        { id: 'attendance', label: 'Attendance Register', icon: UserCheck, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'teacher', 'student', 'parent'] },
        { id: 'timetable', label: 'Class Timetable', icon: CalendarDays },
        { id: 'homework', label: 'Homework & Assignments', icon: BookOpen },
        { id: 'examinations', label: 'Examinations & Marks', icon: ClipboardList },
        { id: 'report_cards', label: 'Report Cards', icon: FileSpreadsheet }
      ]
    },
    {
      title: 'Student & Guardian Affairs',
      items: [
        { id: 'students', label: 'Student Directory', icon: Users, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'teacher', 'receptionist'] },
        { id: 'ptm', label: 'PTM Meetings', icon: CalendarCheck },
        { id: 'health_discipline', label: 'Discipline & Health', icon: HeartPulse, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'teacher', 'student', 'parent'] },
        { id: 'certificates', label: 'Certificates & TC', icon: Award, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'receptionist', 'student', 'parent'] }
      ]
    },
    {
      title: 'Finance & Human Resources',
      items: [
        { id: 'finance', label: 'Fees & Invoicing', icon: Receipt, roles: ['super_admin', 'school_admin', 'principal', 'accountant', 'student', 'parent'] },
        { id: 'staff', label: 'Staff & Teachers', icon: Briefcase, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'accountant'] },
        { id: 'payroll', label: 'Payroll & Salaries', icon: DollarSign, roles: ['super_admin', 'school_admin', 'principal', 'accountant', 'staff'] },
        { id: 'leave', label: 'Leave Management', icon: CalendarCheck }
      ]
    },
    {
      title: 'Operations & Logistics',
      items: [
        { id: 'library', label: 'Library Management', icon: Library, roles: ['super_admin', 'school_admin', 'principal', 'librarian', 'teacher', 'student'] },
        { id: 'transport', label: 'Fleet & Transport', icon: Bus, roles: ['super_admin', 'school_admin', 'principal', 'transport_manager', 'driver', 'student', 'parent'] },
        { id: 'inventory', label: 'Assets & Inventory', icon: Package, roles: ['super_admin', 'school_admin', 'principal', 'accountant', 'staff'] }
      ]
    },
    {
      title: 'Administration & Desk',
      items: [
        { id: 'frontoffice', label: 'Front Office & Visitors', icon: PhoneCall, roles: ['super_admin', 'school_admin', 'principal', 'receptionist'] },
        { id: 'complaints', label: 'Feedback & Grievances', icon: MessageSquare },
        { id: 'communication', label: 'Notice Board & Alerts', icon: Megaphone },
        { id: 'events', label: 'School Calendar', icon: Calendar }
      ]
    },
    {
      title: 'Analytics & Settings',
      items: [
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, roles: ['super_admin', 'school_admin', 'principal', 'vice_principal', 'accountant', 'transport_manager', 'librarian'] },
        { id: 'audit', label: 'Audit & Activity Logs', icon: History, roles: ['super_admin', 'school_admin', 'principal'] },
        { id: 'settings', label: 'System & RBAC Setup', icon: Settings, roles: ['super_admin', 'school_admin'] }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800 bg-slate-950/60">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md shadow-indigo-600/30">
            GW
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Greenwood ERP</h1>
            <p className="text-[10px] text-indigo-400 font-mono">Enterprise Portal v4.2</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs scrollbar-thin scrollbar-thumb-slate-700">
          {navGroups.map((group, gIdx) => {
            // Filter items visible to current role
            const visibleItems = group.items.filter(
              item => !item.roles || item.roles.includes(currentRole)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={gIdx} className="space-y-1">
                <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {group.title}
                </p>
                {visibleItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveModule(item.id);
                        if (mobileOpen) onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors font-medium ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-indigo-500 text-white rounded">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Active Role:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono uppercase text-[10px] font-semibold">
            {currentRole.replace('_', ' ')}
          </span>
        </div>
      </aside>
    </>
  );
};
