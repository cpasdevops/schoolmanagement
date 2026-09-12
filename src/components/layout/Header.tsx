import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Role } from '../../types/erp';
import {
  Bell,
  Search,
  School,
  Calendar,
  UserCheck,
  RotateCcw,
  Check,
  ChevronDown,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebarMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onToggleSidebarMobile }) => {
  const {
    currentRole,
    currentUser,
    currentBranch,
    currentSession,
    branches,
    academicSessions,
    switchRole,
    switchBranch,
    switchSession,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveModule,
    resetAllData
  } = useERP();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showSessionMenu, setShowSessionMenu] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read);

  const roleLabels: Record<Role, { label: string; icon: string; category: string }> = {
    super_admin: { label: 'Super Administrator', icon: '⚡', category: 'Executive' },
    school_admin: { label: 'School Administrator', icon: '🏛️', category: 'Executive' },
    principal: { label: 'Principal', icon: '🎓', category: 'Academic Leadership' },
    vice_principal: { label: 'Vice Principal', icon: '📋', category: 'Academic Leadership' },
    teacher: { label: 'Teacher (Sarah Jenkins)', icon: '👩‍🏫', category: 'Faculty' },
    accountant: { label: 'Accountant (Franklin W.)', icon: '💼', category: 'Finance' },
    librarian: { label: 'Librarian (Victoria S.)', icon: '📚', category: 'Operations' },
    transport_manager: { label: 'Transport Manager', icon: '🚌', category: 'Operations' },
    receptionist: { label: 'Receptionist (Amanda K.)', icon: '🛎️', category: 'Front Office' },
    staff: { label: 'Staff / Employee', icon: '👔', category: 'Operations' },
    student: { label: 'Student (Lucas Vance)', icon: '🎒', category: 'Learners' },
    parent: { label: 'Parent (Michael Vance)', icon: '👨‍👧‍👦', category: 'Guardians' },
    driver: { label: 'Transport Driver', icon: '🚐', category: 'Transport' }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-slate-200/90 shadow-2xs">
      {/* Left: Mobile Menu button & Campus + Session Switchers */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebarMobile}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label="Toggle Navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Branch / Campus Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowBranchMenu(!showBranchMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <School className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="hidden sm:inline font-medium text-slate-500">Campus:</span>
            <span className="max-w-[140px] truncate text-slate-900">{currentBranch.name.split('-')[1]?.trim() || currentBranch.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showBranchMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Campus / Branch
              </div>
              {branches.map(branch => (
                <button
                  key={branch.id}
                  onClick={() => {
                    switchBranch(branch.id);
                    setShowBranchMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50/60 transition-colors ${
                    branch.id === currentBranch.id ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <p>{branch.name}</p>
                    <p className="text-[10px] text-slate-400">{branch.code} • {branch.principalName}</p>
                  </div>
                  {branch.id === currentBranch.id && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Academic Session Selector */}
        <div className="relative">
          <button
            onClick={() => setShowSessionMenu(!showSessionMenu)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Session: <strong>{currentSession.name}</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showSessionMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Academic Session
              </div>
              {academicSessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => {
                    switchSession(session.id);
                    setShowSessionMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50/60 ${
                    session.id === currentSession.id ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-slate-700'
                  }`}
                >
                  <span>{session.name} {session.isCurrent && '(Current)'}</span>
                  {session.id === currentSession.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Quick Search Trigger */}
      <button
        onClick={onOpenSearch}
        className="hidden md:flex items-center gap-3 px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors w-72 justify-between"
      >
        <span className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <span>Search students, staff, invoices...</span>
        </span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 shadow-2xs">
          ⌘K
        </kbd>
      </button>

      {/* Right Controls: Role Switcher, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Quick Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-indigo-950 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors shadow-2xs"
            title="Switch User Role to test various personas"
          >
            <span className="text-sm">{roleLabels[currentRole]?.icon}</span>
            <span className="hidden lg:inline text-indigo-900">
              Role: <strong>{roleLabels[currentRole]?.label}</strong>
            </span>
            <span className="lg:hidden text-indigo-900 uppercase text-[11px] font-bold">
              {currentRole.replace('_', ' ')}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 max-h-[80vh] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Switch Demo Persona</p>
                <p className="text-[11px] text-slate-500">Test role-tailored dashboards, permissions & workflows</p>
              </div>

              <div className="py-1">
                {(Object.keys(roleLabels) as Role[]).map(roleKey => {
                  const item = roleLabels[roleKey];
                  const isSelected = currentRole === roleKey;
                  return (
                    <button
                      key={roleKey}
                      onClick={() => {
                        switchRole(roleKey);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        isSelected ? 'bg-indigo-50/80 text-indigo-950 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <p>{item.label}</p>
                          <span className="text-[10px] text-slate-400">{item.category}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full animate-pulse">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <Badge variant="rose" size="sm">{unreadNotifications.length} New</Badge>
                </div>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-indigo-600 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-center text-slate-400">No active notifications</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkToModule) {
                          setActiveModule(n.linkToModule);
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-semibold ${!n.read ? 'text-indigo-950' : 'text-slate-700'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-500 mt-1 text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">{currentRole.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Reset State Tooltip button */}
        <button
          onClick={resetAllData}
          title="Reset ERP Database to Initial State"
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
