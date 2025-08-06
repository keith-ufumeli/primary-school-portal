"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  userRole?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
  roles: string[];
}

const navigationItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠', roles: ['admin', 'teacher', 'parent'] },
  { href: '/dashboard/classes', label: 'Classes', icon: '👥', roles: ['admin', 'teacher'] },
  { href: '/dashboard/student', label: 'Students', icon: '🎓', roles: ['admin', 'teacher', 'parent'] },
  { href: '/dashboard/timetable', label: 'Timetable', icon: '📅', roles: ['admin', 'teacher', 'parent'] },
  { href: '/dashboard/announcements', label: 'Announcements', icon: '📢', roles: ['admin', 'teacher', 'parent'] },
  { href: '/dashboard/messages', label: 'Messages', icon: '💬', roles: ['admin', 'teacher', 'parent'] },
  { href: '/dashboard/fees', label: 'Fees', icon: '💳', roles: ['admin', 'parent'] },
];

export default function Sidebar({ userRole = 'parent' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Enhanced backdrop overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-30 md:hidden"
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleSidebar();
            }
          }}
        />
      )}

      {/* Mobile toggle button */}
      <Button
        onClick={toggleSidebar}
        className={`
          fixed top-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg md:hidden transition-all duration-300
          ${isOpen ? 'right-4' : 'left-4'}
        `}
        size="sm"
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? '✕' : '☰'}
      </Button>

      {/* Desktop toggle button */}
      <Button
        onClick={toggleSidebar}
        className={`
          hidden md:block fixed top-4 z-50 bg-white hover:bg-gray-50 text-gray-600 p-2 rounded-lg shadow-md border transition-all duration-300
          ${isOpen ? 'left-72' : 'left-20'}
        `}
        size="sm"
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? '◀' : '▶'}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-white shadow-xl border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'w-64' : 'md:w-16'}
          ${isMobile ? 'w-64' : ''}
        `}
        aria-hidden={!isOpen && isMobile}
      >
        <div className="flex flex-col h-full">
          {/* Header with proper spacing for toggle button */}
          <div className={`${isMobile ? 'pt-16' : 'pt-4'} px-4 pb-4 border-b border-gray-200 ${!isOpen && !isMobile ? 'px-2' : ''}`}>
            <div className={`flex items-center space-x-3 ${!isOpen && !isMobile ? 'justify-center' : ''}`}>
              <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                <span className="text-blue-600 text-xl">📚</span>
              </div>
              {(isOpen || isMobile) && (
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-800 text-sm truncate">Lorem Primary</h2>
                  <p className="text-xs text-gray-500 capitalize truncate">{userRole} Portal</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${!isOpen && !isMobile ? 'justify-center px-2' : ''}
                  `}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {(isOpen || isMobile) && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className={`p-4 border-t border-gray-200 ${!isOpen && !isMobile ? 'px-2' : ''}`}>
            <Link
              href="/login"
              className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200
                ${!isOpen && !isMobile ? 'justify-center px-2' : ''}
              `}
              onClick={() => {
                sessionStorage.clear();
              }}
            >
              <span className="text-lg flex-shrink-0">🚪</span>
              {(isOpen || isMobile) && (
                <span className="font-medium text-sm">Logout</span>
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}