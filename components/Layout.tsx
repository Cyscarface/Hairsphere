import React, { useState } from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  MessageSquareHeart, 
  UserCircle,
  Menu,
  X,
  ScanLine
} from 'lucide-react';

interface LayoutProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  children: React.ReactNode;
  user: UserProfile;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, onTabChange, children, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: NavigationTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: NavigationTab.CALENDAR, label: 'Planner', icon: Calendar },
    { id: NavigationTab.EDUCATION, label: 'Hair Library', icon: BookOpen },
    { id: NavigationTab.SCANNER, label: 'Scan Product', icon: ScanLine },
    { id: NavigationTab.PROGRESS, label: 'Progress', icon: TrendingUp },
    { id: NavigationTab.AI_CONSULTANT, label: 'AI Consultant', icon: MessageSquareHeart },
    { id: NavigationTab.PROFILE, label: 'Profile', icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-peach-50 text-gray-800 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-peach-200 shadow-sm transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-peach-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-peach-500 flex items-center justify-center">
              <span className="font-serif text-white font-bold text-lg">H</span>
            </div>
            <span className="font-serif text-2xl font-bold text-gray-800">HairSphere</span>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-peach-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-peach-100 hover:text-peach-800'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-peach-100">
          <div className="flex items-center gap-3 bg-peach-50 p-3 rounded-lg cursor-pointer hover:bg-peach-100 transition-colors" onClick={() => onTabChange(NavigationTab.PROFILE)}>
             <img src={user.picture} alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
             <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-peach-200 p-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-peach-500 flex items-center justify-center">
              <span className="font-serif text-white font-bold text-lg">H</span>
            </div>
            <span className="font-serif text-xl font-bold">HairSphere</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
