import { ReactNode, useState } from 'react';
import { Bell, User as UserIcon, Plus, ArrowLeft, Search, ShoppingCart, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useApp } from '../contexts/AppContext';
import { ViewType } from '../App';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonText?: string;
  onNavigate?: (view: ViewType) => void;
  onMenuClick?: () => void;
}

export function Layout({
  children,
  title,
  showBackButton = false,
  onBack,
  showSearch = true,
  showCreateButton = true,
  onCreateClick,
  createButtonText = 'Create',
  onNavigate,
  onMenuClick,
}: LayoutProps) {
  const { notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationItems = [
    {
      id: 1,
      type: 'transaction',
      title: 'New Transaction',
      message: 'Manila Mayo completed a transaction of R1900.00',
      time: '5 min ago',
      unread: true,
      transactionId: '#6252',
    },
    {
      id: 2,
      type: 'campaign',
      title: 'New Campaign Created',
      message: 'User 001c5tP created a new campaign "Summer Voucher Drive"',
      time: '1 hour ago',
      unread: true,
      campaignId: 'campaign-1',
    },
    {
      id: 3,
      type: 'transaction',
      title: 'Payment Pending',
      message: 'MoMo Gift transaction of R15,000.00 is pending',
      time: '2 hours ago',
      unread: true,
      transactionId: '#6253',
    },
    {
      id: 4,
      type: 'campaign',
      title: 'Campaign Milestone',
      message: 'Beach Cleanup Campaign reached 50% of goal',
      time: '3 hours ago',
      unread: false,
      campaignId: 'campaign-2',
    },
    {
      id: 5,
      type: 'transaction',
      title: 'Transaction Failed',
      message: 'Payment of R15,000.00 failed - requires attention',
      time: '5 hours ago',
      unread: false,
      transactionId: '#6254',
    },
  ];

  const handleNotificationClick = (notification: typeof notificationItems[0]) => {
    if (notification.type === 'transaction' && notification.transactionId) {
      // Navigate to transactions page with specific transaction ID
      window.dispatchEvent(new CustomEvent('navigate-to-transaction', { 
        detail: { transactionId: notification.transactionId } 
      }));
    } else if (notification.type === 'campaign' && notification.campaignId) {
      // Navigate to campaign detail
      window.dispatchEvent(new CustomEvent('navigate-to-campaign', { 
        detail: { campaignId: notification.campaignId } 
      }));
    }
    setShowNotifications(false);
  };

  return (
    <div className="flex-1 bg-[#F5F5FA] flex flex-col min-w-0">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-3 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 h-[64px]">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Mobile menu button */}
          {onMenuClick && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden w-10 h-10 hover:bg-gray-100 flex-shrink-0"
              onClick={onMenuClick}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </Button>
          )}
          
          {showBackButton && onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          
          {title && <h1 className="text-base sm:text-xl truncate">{title}</h1>}
          
          {showSearch && (
            <div className="relative flex-1 max-w-md ml-4 hidden md:block">
              <Input
                placeholder="Search"
                className="pl-4 pr-10 bg-[#F5F5FA] border-0 rounded-lg h-10 text-sm shadow-[inset_-2px_-2px_4px_0px_rgba(255,255,255,0.5),inset_2px_2px_4px_0px_rgba(170,170,204,0.25)]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-[#7878AB]" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {showCreateButton && (
            <Button 
              className="bg-[#8363F2] hover:bg-[#6B51D4] text-white px-2 sm:px-4 py-2 h-10 rounded-lg text-xs sm:text-sm"
              onClick={onCreateClick}
            >
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">{createButtonText}</span>
            </Button>
          )}
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative w-10 h-10 hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-[90vw] sm:w-[380px] bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-[500px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{notifications} new notifications</p>
                  </div>
                  <div className="overflow-y-auto max-h-[400px]">
                    {notificationItems.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            notification.unread ? 'bg-blue-600' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <button 
                      className="text-sm text-[#8B5CF6] hover:text-[#6B51D4] font-medium w-full text-center"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-gray-100 hidden sm:flex">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10 hover:bg-gray-100 hidden sm:flex"
            onClick={() => onNavigate?.('profile')}
          >
            <UserIcon className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}