import { Card } from './ui/card';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Layout } from './Layout';
import { Megaphone, Building2, Gift, CheckCircle2, User, Download, FileImage, FileText } from 'lucide-react';
import { useRef, useState } from 'react';
import QRCode from 'qrcode';
import React from 'react';
import jsPDF from 'jspdf';
import { ViewType } from '../App';

const chartData = [
  { month: 'Jan', campaigns: 25 },
  { month: 'Feb', campaigns: 28 },
  { month: 'Mar', campaigns: 32 },
  { month: 'Apr', campaigns: 35 },
  { month: 'May', campaigns: 18 },
];

const activities = [
  { 
    id: 1,
    icon: CheckCircle2, 
    description: 'CIPC document will expire in 5 days', 
    time: '1 hour ago',
    link: 'reports' as ViewType
  },
  { 
    id: 2,
    icon: CheckCircle2, 
    description: 'Monthly platform report is new available to view', 
    time: '4 hour ago',
    link: 'reports' as ViewType
  },
  { 
    id: 3,
    icon: User, 
    description: 'New campaign has been created by user 001c5tP', 
    time: '4 days ago',
    link: 'campaigns' as ViewType
  },
  { 
    id: 4,
    icon: User, 
    description: 'New campaign has been created by user 001c0tP', 
    time: '4 days ago',
    link: 'campaigns' as ViewType
  },
];

interface AdminOverviewProps {
  onNavigate?: (view: ViewType) => void;
  onMenuClick?: () => void;
}

export function AdminOverview({ onNavigate, onMenuClick }: AdminOverviewProps) {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Generate QR code when component mounts
  const generateQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        await QRCode.toCanvas(qrCodeRef.current, 'https://admin.platform.app/dashboard/251', {
          width: 160,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    }
  };

  // Download QR code as PNG
  const downloadQRCodePNG = () => {
    if (qrCodeRef.current) {
      const url = qrCodeRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'admin-dashboard-qr-code.png';
      link.href = url;
      link.click();
      setShowDownloadMenu(false);
    }
  };

  // Download QR code as PDF
  const downloadQRCodePDF = async () => {
    if (qrCodeRef.current) {
      // Create a simple PDF with the QR code
      const canvas = qrCodeRef.current;
      const imgData = canvas.toDataURL('image/png');
      
      // Create a new jsPDF instance
      const pdf = new jsPDF();
      pdf.setFontSize(24);
      pdf.text('Admin Dashboard QR Code', 105, 20, { align: 'center' });
      pdf.addImage(imgData, 'PNG', 70, 30, 70, 70);
      pdf.setFontSize(12);
      pdf.text('Scan this code to access the admin dashboard', 105, 110, { align: 'center' });
      
      // Save the PDF
      pdf.save('admin-dashboard-qr-code.pdf');
      setShowDownloadMenu(false);
    }
  };

  // Generate QR code on mount
  React.useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <Layout onNavigate={onNavigate} onMenuClick={onMenuClick}>
      <div className="p-3 sm:p-6 max-w-full overflow-hidden">
        <h1 className="mb-4 sm:mb-6 text-xl sm:text-2xl">Admin overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* User Overview */}
          <button
            onClick={() => onNavigate?.('members')}
            className="p-4 sm:p-6 bg-blue-50 border border-blue-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">User Overview</div>
            <div className="text-2xl sm:text-3xl text-blue-600 mb-1">1,200</div>
            <div className="text-xs sm:text-sm text-blue-700">Total Users</div>
          </button>

          {/* Campaigns Overview */}
          <button
            onClick={() => onNavigate?.('campaigns')}
            className="p-4 sm:p-6 bg-purple-50 border border-purple-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-xs sm:text-sm text-[#8B5CF6] mb-1 sm:mb-2">Campaigns Overview</div>
            <div className="text-2xl sm:text-3xl text-[#8B5CF6] mb-1">65</div>
            <div className="flex items-center gap-1.5">
              <Megaphone className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B5CF6]" />
              <span className="text-xs sm:text-sm text-purple-700">Active</span>
            </div>
          </button>

          {/* Vendors Overview */}
          <button
            onClick={() => onNavigate?.('vendors')}
            className="p-4 sm:p-6 bg-green-50 border border-green-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-xs sm:text-sm text-green-600 mb-1 sm:mb-2">Vendors Overview</div>
            <div className="text-2xl sm:text-3xl text-green-600 mb-1">80</div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-xs sm:text-sm text-green-700">Active Vendors</span>
            </div>
          </button>

          {/* Corporate Overview */}
          <button
            onClick={() => onNavigate?.('vouchers')}
            className="p-4 sm:p-6 bg-purple-50 border border-purple-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-xs sm:text-sm text-purple-600 mb-1 sm:mb-2">Corporate Overview</div>
            <div className="text-2xl sm:text-3xl text-purple-600 mb-1">100</div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <span className="text-xs sm:text-sm text-purple-700">Active available</span>
            </div>
          </button>
        </div>

        {/* Campaign Activity Chart and QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
          {/* Campaign Activity - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg">Campaign Activity</h2>
              <button className="text-xs sm:text-sm text-[#8B5CF6] hover:underline">View all</button>
            </div>
            <div className="w-full h-[200px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="campaigns" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg mb-4">Quick Access</h2>
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                <canvas ref={qrCodeRef} className="w-32 h-32 sm:w-40 sm:h-40" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
                Scan to access dashboard
              </p>
              <div className="relative w-full">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                >
                  <Download className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Download QR</span>
                </Button>
                {showDownloadMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDownloadMenu(false)}
                    />
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                      <button
                        onClick={downloadQRCodePNG}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <FileImage className="w-4 h-4" />
                        Download as PNG
                      </button>
                      <button
                        onClick={downloadQRCodePDF}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Download as PDF
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg">Recent Activity</h2>
            <button className="text-xs sm:text-sm text-[#8B5CF6] hover:underline">View all</button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 sm:pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-900 mb-1 break-words">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}