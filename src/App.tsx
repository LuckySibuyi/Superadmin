import { useState, useEffect } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Sidebar } from './components/Sidebar';
import { AdminOverview } from './components/AdminOverview';
import { CampaignsManagement } from './components/CampaignsManagement';
import { VoucherManagement } from './components/VoucherManagement';
import { TransactionManagement } from './components/TransactionManagement';
import { ReportsAnalytic } from './components/ReportsAnalytic';
import { UserManagement } from './components/UserManagement';
import { UserProfile } from './components/UserProfile';
import { CampaignDashboard } from './components/CampaignDashboard';

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
  | 'draft';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | undefined>(undefined);

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    if (view !== 'campaign-detail') {
      setSelectedCampaignId(null);
    }
    if (view !== 'transactions') {
      setSelectedTransactionId(undefined);
    }
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
    switch (activeView) {
      case 'dashboard':
        return <AdminOverview onNavigate={handleNavigate} />;
      
      case 'campaigns':
        return <CampaignsManagement onViewCampaign={handleViewCampaign} onNavigate={handleNavigate} />;
      
      case 'campaign-detail':
        return (
          <CampaignDashboard 
            headerImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
            onClose={handleCloseCampaign}
            onNavigate={handleNavigate}
          />
        );
      
      case 'vouchers':
        return <VoucherManagement onNavigate={handleNavigate} />;
      
      case 'transactions':
        return <TransactionManagement onNavigate={handleNavigate} selectedTransactionId={selectedTransactionId} />;
      
      case 'reports':
        return <ReportsAnalytic onNavigate={handleNavigate} />;
      
      case 'members':
        return <UserManagement onNavigate={handleNavigate} />;
      
      case 'profile':
        return <UserProfile onClose={() => handleNavigate('dashboard')} onNavigate={handleNavigate} />;
      
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
      
      default:
        return <AdminOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
        {renderContent()}
      </div>
    </AppProvider>
  );
}