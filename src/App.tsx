import { useState, useEffect } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Sidebar } from './components/Sidebar';
import { AdminOverview } from './components/AdminOverview';
import { CampaignsManagement } from './components/CampaignsManagement';
import { VoucherManagement } from './components/VoucherManagement';
import { TransactionManagement } from './components/TransactionManagement';
import { ReportsAnalytic } from './components/ReportsAnalytic';
import { UserManagement } from './components/UserManagement';
import { AdminProfile } from './components/AdminProfile';
import { CampaignDashboard } from './components/CampaignDashboard';
import { Users } from './components/Users';

export type ViewType = 
  | 'dashboard' 
  | 'campaigns' 
  | 'campaign-detail'
  | 'vouchers' 
  | 'transactions' 
  | 'reports' 
  | 'vendors'
  | 'members' 
  | 'profile'
  | 'social'
  | 'draft'
  | 'users';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    if (view !== 'campaign-detail') {
      setSelectedCampaignId(null);
    }
    if (view !== 'transactions') {
      setSelectedTransactionId(undefined);
    }
    // Close sidebar on navigation (mobile)
    setSidebarOpen(false);
  };

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setActiveView('campaign-detail');
  };

  const handleCloseCampaign = () => {
    setActiveView('campaigns');
    setSelectedCampaignId(null);
  };

  // Listen for custom events from notifications
  useEffect(() => {
    const handleNavigateToTransaction = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { transactionId } = customEvent.detail;
      setSelectedTransactionId(transactionId);
      setActiveView('transactions');
    };

    const handleNavigateToCampaign = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { campaignId } = customEvent.detail;
      handleViewCampaign(campaignId);
    };

    window.addEventListener('navigate-to-transaction', handleNavigateToTransaction);
    window.addEventListener('navigate-to-campaign', handleNavigateToCampaign);

    return () => {
      window.removeEventListener('navigate-to-transaction', handleNavigateToTransaction);
      window.removeEventListener('navigate-to-campaign', handleNavigateToCampaign);
    };
  }, []);

  const renderContent = () => {
    const commonProps = {
      onNavigate: handleNavigate,
      onMenuClick: () => setSidebarOpen(true),
    };

    switch (activeView) {
      case 'dashboard':
        return <AdminOverview {...commonProps} />;
      
      case 'campaigns':
        return <CampaignsManagement onViewCampaign={handleViewCampaign} {...commonProps} />;
      
      case 'campaign-detail':
        return (
          <CampaignDashboard 
            headerImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
            onClose={handleCloseCampaign}
            {...commonProps}
          />
        );
      
      case 'vouchers':
        return <VoucherManagement {...commonProps} />;
      
      case 'transactions':
        return <TransactionManagement {...commonProps} selectedTransactionId={selectedTransactionId} />;
      
      case 'reports':
        return <ReportsAnalytic {...commonProps} />;
      
      case 'members':
        return <UserManagement {...commonProps} />;
      
      case 'profile':
        return <AdminProfile onClose={() => handleNavigate('dashboard')} {...commonProps} />;
      
      case 'vendors':
      case 'social':
      case 'draft':
        return (
          <div className="flex-1 bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)} - Coming soon
            </p>
          </div>
        );
      
      case 'users':
        return <Users {...commonProps} />;
      
      default:
        return <AdminOverview {...commonProps} />;
    }
  };

  return (
    <AppProvider>
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onNavigate={handleNavigate} 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        {renderContent()}
      </div>
    </AppProvider>
  );
}