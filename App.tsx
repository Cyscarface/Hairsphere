import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CalendarPlanner from './components/Calendar';
import HairEducation from './components/HairEducation';
import Progress from './components/Progress';
import AIConsultant from './components/AIConsultant';
import Login from './components/Login';
import ProductScanner from './components/ProductScanner';
import { NavigationTab, UserProfile } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [user, setUser] = useState<UserProfile | null>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard />;
      case NavigationTab.CALENDAR:
        return <CalendarPlanner />;
      case NavigationTab.EDUCATION:
        return <HairEducation />;
      case NavigationTab.SCANNER:
        return <ProductScanner />;
      case NavigationTab.PROGRESS:
        return <Progress />;
      case NavigationTab.AI_CONSULTANT:
        return <AIConsultant />;
      case NavigationTab.PROFILE:
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full border-4 border-peach-200" />
                <h2 className="text-2xl font-serif text-gray-800">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <button 
                  onClick={() => setUser(null)}
                  className="mt-4 px-6 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
                <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 max-w-md">
                    Note: Profile management features are coming in Phase 2.
                </div>
            </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} user={user}>
      {renderContent()}
    </Layout>
  );
};

export default App;