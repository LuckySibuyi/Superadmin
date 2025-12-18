import { LayoutDashboard, Megaphone, Building2, Users, User, Share2, FileText, LogOut, Ticket, Receipt, BarChart3, HelpCircle, Shield, FileCheck } from 'lucide-react';
import { ViewType } from '../App';
import imgKcLogoWhite2Transparent2 from "figma:asset/4b4bad59041302b06eae37218f1d3bd7c64d7d1e.png";

interface SidebarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const menuItems: { icon: any; label: string; view: ViewType }[] = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Megaphone, label: 'Campaigns', view: 'campaigns' },
    { icon: Ticket, label: 'Vouchers', view: 'vouchers' },
    { icon: Receipt, label: 'Transactions', view: 'transactions' },
    { icon: User, label: 'Profile', view: 'profile' },
    { icon: BarChart3, label: 'Overview', view: 'reports' },
    { icon: FileText, label: 'Draft', view: 'draft' },
    { icon: FileCheck, label: 'Verified', view: 'vendors' },
  ];

  return (
    <div className="w-[222px] bg-white border-r border-[#E5E5E5] flex flex-col h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#E5E5E5] h-[80px] flex items-center justify-center">
        <div className="h-[50px] w-[50px] relative overflow-hidden">
          <img 
            alt="KC Logo" 
            className="absolute h-[152.98%] left-[-72.22%] max-w-none top-[-0.08%] w-[225.56%]" 
            src={imgKcLogoWhite2Transparent2} 
          />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // If viewing campaign detail, highlight Campaigns menu item
          const isActive = activeView === item.view || 
            (activeView === 'campaign-detail' && item.view === 'campaigns');
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-[16px] ${
                isActive
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Feedback Section */}
      <div className="border-t border-[#E5E5E5] px-5 py-4">
        <div className="text-[11px] text-[#8B5CF6] mb-3 uppercase tracking-wide font-semibold">
          Feedback
        </div>
        <button className="w-full flex items-center gap-3 py-2.5 text-[16px] text-gray-700 hover:bg-gray-50 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </button>
        <button className="w-full flex items-center gap-3 py-2.5 text-[16px] text-gray-700 hover:bg-gray-50 transition-colors">
          <LogOut className="w-5 h-5 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}