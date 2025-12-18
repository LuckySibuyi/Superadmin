import { Layout } from './Layout';
import { ViewType } from '../App';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileDown, Calendar, Star, ArrowUpDown, ChevronDown, FileSpreadsheet, FileText } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const contributionData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 61000 },
  { month: 'May', value: 55000 },
  { month: 'Jun', value: 67000 },
];

const vendorsData = [
  { name: 'Woolworths', rating: 5, reviews: 234, image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=100&h=100&fit=crop' },
  { name: 'Pick n Pay', rating: 4, reviews: 189, image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=100&h=100&fit=crop' },
  { name: 'Checkers', rating: 5, reviews: 156, image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=100&h=100&fit=crop' },
];

const pieData = [
  { name: 'Environmental', value: 35, color: '#10B981' },
  { name: 'Education', value: 25, color: '#8B5CF6' },
  { name: 'Healthcare', value: 20, color: '#3B82F6' },
  { name: 'Community', value: 20, color: '#F59E0B' },
];

const reportsData = [
  { name: 'Monthly Campaign Report', value: 'R249,500', date: 'Dec 18, 2025', user: 'Admin User' },
  { name: 'User Activity Report', value: '1,200 users', date: 'Dec 17, 2025', user: 'System' },
  { name: 'Vendor Performance', value: '80 vendors', date: 'Dec 16, 2025', user: 'Admin User' },
  { name: 'Transaction Summary', value: 'R1.2M', date: 'Dec 15, 2025', user: 'Finance Team' },
  { name: 'Voucher Usage Report', value: '450 vouchers', date: 'Dec 14, 2025', user: 'Admin User' },
];

interface ReportsAnalyticProps {
  onNavigate?: (view: ViewType) => void;
}

export function ReportsAnalytic({ onNavigate }: ReportsAnalyticProps) {
  const [reports, setReports] = useState(reportsData);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'user'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedReportName, setSelectedReportName] = useState('');

  // Sort reports
  const sortedReports = [...reports].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'user') {
      return sortOrder === 'asc' ? a.user.localeCompare(b.user) : b.user.localeCompare(a.user);
    }
    return 0;
  });

  // Export to Excel (CSV format)
  const exportToExcel = () => {
    const headers = ['Report', 'Value', 'Date', 'User'];
    const rows = sortedReports.map(report => [
      report.name,
      report.value,
      report.date,
      report.user
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reports_analytics_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const exportToPDF = () => {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(20);
    pdf.text('Reports & Analytics', 14, 22);
    
    // Add date
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Add stats summary
    pdf.setFontSize(12);
    pdf.text('Summary Statistics', 14, 42);
    pdf.setFontSize(10);
    pdf.text('Total Active Users: 1,200', 14, 50);
    pdf.text('Total Active Campaigns: 800', 14, 56);
    pdf.text('Total Contribution: R249,500', 14, 62);
    
    // Add table header
    pdf.setFontSize(12);
    pdf.text('Reports', 14, 75);
    
    // Draw table manually
    pdf.setFontSize(10);
    let y = 85;
    
    // Table header
    pdf.setFillColor(139, 92, 246);
    pdf.rect(14, y, 182, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.text('Report', 16, y + 6);
    pdf.text('Value', 80, y + 6);
    pdf.text('Date', 120, y + 6);
    pdf.text('User', 160, y + 6);
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    y += 10;
    
    // Table rows
    sortedReports.forEach((report, index) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      
      // Alternate row background
      if (index % 2 === 0) {
        pdf.setFillColor(245, 245, 250);
        pdf.rect(14, y - 2, 182, 8, 'F');
      }
      
      // Truncate long text
      const truncate = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
      };
      
      pdf.text(truncate(report.name, 25), 16, y + 4);
      pdf.text(truncate(report.value, 15), 80, y + 4);
      pdf.text(truncate(report.date, 15), 120, y + 4);
      pdf.text(truncate(report.user, 15), 160, y + 4);
      
      y += 10;
    });
    
    pdf.save(`reports_analytics_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Download individual report
  const downloadReport = (reportName: string) => {
    const report = reports.find(r => r.name === reportName);
    if (!report) return;

    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text(report.name, 14, 22);
    
    pdf.setFontSize(12);
    pdf.text(`Value: ${report.value}`, 14, 35);
    pdf.text(`Date: ${report.date}`, 14, 45);
    pdf.text(`Generated by: ${report.user}`, 14, 55);
    
    pdf.setFontSize(10);
    pdf.text('Report Details:', 14, 70);
    pdf.text('This report contains comprehensive analytics and insights', 14, 78);
    pdf.text('for the selected time period and parameters.', 14, 84);
    
    pdf.save(`${reportName.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Schedule report
  const handleScheduleReport = (reportName: string) => {
    setSelectedReportName(reportName);
    setScheduleDialogOpen(true);
  };

  const submitSchedule = () => {
    // In a real app, this would send to backend
    alert(`Report "${selectedReportName}" has been scheduled successfully!`);
    setScheduleDialogOpen(false);
  };

  return (
    <Layout onNavigate={onNavigate}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">Reports & Analytic</h1>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2 h-auto">
                Lastest
              </Button>
            </div>
          </div>
          <div className="flex gap-2 relative">
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                Sort by
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              {showSortMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowSortMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-3">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Sort By</Label>
                        <Select
                          value={sortBy}
                          onValueChange={(value: string) => setSortBy(value as 'name' | 'date' | 'user')}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Order</Label>
                        <Select
                          value={sortOrder}
                          onValueChange={(value: string) => setSortOrder(value as 'asc' | 'desc')}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setShowSortMenu(false)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Button variant="outline" className="gap-2" onClick={exportToExcel}>
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2" onClick={exportToPDF}>
              <FileText className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Active users</div>
            <div className="text-3xl mb-1">1,200</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Active Campaigns</div>
            <div className="text-3xl mb-1">800</div>
            <div className="text-sm text-green-600">Active Campaigns</div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Total Contribution</div>
            <div className="text-3xl">R249.500</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Contribution over time */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="mb-4">Contribution over time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Vendors/Corporates */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="mb-4">Top Vendors/Corporates</h3>
            <div className="space-y-3">
              {vendorsData.map((vendor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm">{vendor.name}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(vendor.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-600">({vendor.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Categories */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="mb-4">Campaign Categories</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Report</th>
                <th className="px-6 py-3 text-left text-sm">Value</th>
                <th className="px-6 py-3 text-left text-sm">Date</th>
                <th className="px-6 py-3 text-left text-sm">User</th>
                <th className="px-6 py-3 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.map((report, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{report.name}</td>
                  <td className="px-6 py-4 text-sm">{report.value}</td>
                  <td className="px-6 py-4 text-sm">{report.date}</td>
                  <td className="px-6 py-4 text-sm">{report.user}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2" onClick={() => downloadReport(report.name)}>
                        <FileDown className="w-4 h-4" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="gap-2" onClick={() => handleScheduleReport(report.name)}>
                        <Calendar className="w-4 h-4" />
                        Schedule Report
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Report Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              Schedule the report "{selectedReportName}" to be sent to your email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue>Weekly</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 text-gray-900"
              onClick={() => setScheduleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={submitSchedule}>
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}