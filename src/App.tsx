import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Dashboard } from './components/Dashboard';
import { TherapyScheduling } from './components/TherapyScheduling';
import { PatientTracking } from './components/PatientTracking';
import { NotificationCenter } from './components/NotificationCenter';
import { Analytics } from './components/Analytics';
import { UserProfile } from './components/UserProfile';
import { storage } from './lib/storage';

type ViewType = 'home' | 'dashboard' | 'scheduling' | 'tracking' | 'notifications' | 'analytics' | 'profile';
type UserRole = 'patient' | 'practitioner' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() =>
    storage.get<ViewType>('app.currentView', 'home')
  );
  const [userRole, setUserRole] = useState<UserRole>(() =>
    storage.get<UserRole>('app.userRole', 'patient')
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    storage.get<boolean>('app.isAuthenticated', false)
  );

  // Persist state changes
  useEffect(() => {
    storage.set('app.currentView', currentView);
  }, [currentView]);
  useEffect(() => {
    storage.set('app.userRole', userRole);
  }, [userRole]);
  useEffect(() => {
    storage.set('app.isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const renderCurrentView = () => {
    if (!isAuthenticated && currentView !== 'home') {
      return <HeroSection onGetStarted={() => setCurrentView('home')} />;
    }

    switch (currentView) {
      case 'home':
        return <HeroSection onGetStarted={() => {
          setIsAuthenticated(true);
          setCurrentView('dashboard');
        }} />;
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'scheduling':
        return <TherapyScheduling userRole={userRole} />;
      case 'tracking':
        return <PatientTracking userRole={userRole} />;
      case 'notifications':
        return <NotificationCenter userRole={userRole} />;
      case 'analytics':
        return <Analytics userRole={userRole} />;
      case 'profile':
        return <UserProfile userRole={userRole} />;
      default:
        return <HeroSection onGetStarted={() => setCurrentView('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;