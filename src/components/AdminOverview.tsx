import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Layout } from './Layout';
import { Megaphone, Building2, Gift, CheckCircle2, User, Download } from 'lucide-react';
import { useRef, useState } from 'react';
import QRCode from 'qrcode';
import React from 'react';
import jsPDF from 'jspdf';
import { ViewType } from '../App';

const chartData = [
  { month: 'Jan', value: 25, color: '#9575CD' },
  { month: 'Feb', value: 28, color: '#7E57C2' },
  { month: 'Mar', value: 32, color: '#5E35B1' },
  { month: 'Apr', value: 35, color: '#673AB7' },
  { month: 'May', value: 18, color: '#BA68C8' },
];

const recentActivity = [
  { 
    icon: 'document', 
    text: 'CIPC document will expire in 5 days', 
    time: '1 hour ago',
    iconColor: '#10B981',
    link: 'reports' as ViewType
  },
  { 
    icon: 'document', 
    text: 'Monthly platform report is new available to view', 
    time: '4 hour ago',
    iconColor: '#10B981',
    link: 'reports' as ViewType
  },
  { 
    icon: 'user', 
    text: 'New campaign has been created by user 001c5tP', 
    time: '4 days ago',
    iconColor: '#8B5CF6',
    link: 'campaigns' as ViewType
  },
  { 
    icon: 'user', 
    text: 'New campaign has been created by user 001c0tP', 
    time: '4 days ago',
    iconColor: '#8B5CF6',
    link: 'campaigns' as ViewType
  },
];

interface AdminOverviewProps {
  onNavigate?: (view: ViewType) => void;
}

export function AdminOverview({ onNavigate }: AdminOverviewProps) {
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
    <Layout onNavigate={onNavigate}>
      <div className="p-6">
        <h1 className="mb-6">Admin overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* User Overview */}
          <button
            onClick={() => onNavigate?.('members')}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-sm text-gray-500 mb-2">User Overview</div>
            <div className="text-3xl mb-1">1,200</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </button>

          {/* Campaigns Overview */}
          <button
            onClick={() => onNavigate?.('campaigns')}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-sm text-gray-500 mb-2">Campaigns Overview</div>
            <div className="text-3xl mb-1">65</div>
            <div className="flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm text-gray-600">Active</span>
            </div>
          </button>

          {/* Vendors Overview */}
          <button
            onClick={() => onNavigate?.('vendors')}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-sm text-gray-500 mb-2">Vendors Overview</div>
            <div className="text-3xl text-green-600 mb-1">80</div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Active Vendors</span>
            </div>
          </button>

          {/* Corporate Overview */}
          <button
            onClick={() => onNavigate?.('vouchers')}
            className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg text-left transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-sm text-gray-500 mb-2">Corporate Overview</div>
            <div className="text-3xl text-purple-600 mb-1">100</div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">Active available</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Campaign Activity */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-lg">Campaign activity</h3>
              <div className="text-right flex-shrink-0">
                <div className="text-sm text-gray-500 mb-1">Active Campaigns</div>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="#E5E7EB"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke="#8B5CF6"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 34 * 0.32} ${2 * Math.PI * 34}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-lg">32%</div>
                </div>
                <div className="text-sm text-[#8B5CF6] mt-1">+7.2%</div>
              </div>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    ticks={[0, 10, 20, 30, 40]}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active this week */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Active this week</div>
            <div className="text-3xl mb-1">251</div>
            <div className="text-sm text-gray-600 mb-6">New users this week</div>
            <div className="flex justify-center mb-4">
              <canvas 
                ref={qrCodeRef}
                className="border-2 border-white shadow-lg"
                style={{ width: '140px', height: '140px' }}
              />
            </div>
            <div className="relative">
              <Button 
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="w-full bg-[#8363F2] hover:bg-[#6B51D4] text-white py-2.5 rounded-lg text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
              
              {showDownloadMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDownloadMenu(false)}
                  />
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
                    <button
                      onClick={downloadQRCodePNG}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download as PNG
                    </button>
                    <div className="border-t border-gray-100" />
                    <button
                      onClick={downloadQRCodePDF}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download as PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-lg">
          <h3 className="text-lg mb-4">Recent activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <button
                key={index}
                onClick={() => onNavigate?.(activity.link)}
                className="flex items-center gap-3 py-2 w-full text-left hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${activity.iconColor}20` }}>
                  {activity.icon === 'document' ? (
                    <CheckCircle2 className="w-5 h-5" style={{ color: activity.iconColor }} />
                  ) : (
                    <User className="w-5 h-5" style={{ color: activity.iconColor }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}