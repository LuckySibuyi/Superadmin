import { Eye, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Layout } from './Layout';
import { useState, useRef, useEffect } from 'react';
import { ViewType } from '../App';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

const vouchers = [
  { id: '#6252', name: 'Beach_Cleanup_V001', vendor: 'Woolworths', discount: '15% OFF', validity: '01 Sept 2025-08 Sept 2025', status: 'Redeemed', redemption: '3/5' },
  { id: '#6253', name: 'Summer_Drive_V002', vendor: 'Pick n Pay', discount: '20% OFF', validity: '15 Aug 2025-20 Aug 2025', status: 'Available', redemption: '0/10' },
  { id: '#6254', name: 'Winter_Sale_V003', vendor: 'Checkers', discount: 'R100 OFF', validity: '10 Jul 2025-15 Jul 2025', status: 'Expired', redemption: '5/5' },
  { id: '#6255', name: 'Black_Friday_V004', vendor: 'Shoprite', discount: '25% OFF', validity: '20 Nov 2025-30 Nov 2025', status: 'Active', redemption: '2/8' },
  { id: '#6256', name: 'Holiday_Special_V005', vendor: 'Woolworths', discount: 'R200 OFF', validity: '15 Dec 2025-31 Dec 2025', status: 'Active', redemption: '1/12' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Redeemed':
      return 'bg-green-100 text-green-700 hover:bg-green-100';
    case 'Available':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    case 'Expired':
      return 'bg-red-100 text-red-700 hover:bg-red-100';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

interface VoucherManagementProps {
  onNavigate?: (view: ViewType) => void;
  onMenuClick?: () => void;
}

export function VoucherManagement({ onNavigate, onMenuClick }: VoucherManagementProps) {
  const [viewVoucherOpen, setViewVoucherOpen] = useState(false);
  const [editVoucherOpen, setEditVoucherOpen] = useState(false);
  const [deleteVoucherOpen, setDeleteVoucherOpen] = useState(false);
  const [createVoucherOpen, setCreateVoucherOpen] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(null);
  const [voucherName, setVoucherName] = useState('Room_aasfhcdkfhaP');
  const [selectedVendor, setSelectedVendor] = useState('Seaview Lodge hotel');
  const [selectedDiscount, setSelectedDiscount] = useState('15% OFF');
  const [validity, setValidity] = useState('01 Sept 2025-06 Sept 2025');
  const [status, setStatus] = useState('Active');
  const [activeFilter, setActiveFilter] = useState<'all' | 'Active' | 'Redeemed' | 'Cancelled'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'vendor' | 'validity' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [vouchersList, setVouchersList] = useState(vouchers);

  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code when dialog opens
  useEffect(() => {
    if (viewVoucherOpen && qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, 'https://example.com/voucher/12345', {
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }).catch(err => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [viewVoucherOpen]);

  // Calculate counts based on actual data
  const totalVouchers = vouchersList.length;
  const activeVouchers = vouchersList.filter(v => v.status === 'Active').length;
  const redeemedVouchers = vouchersList.filter(v => v.status === 'Redeemed').length;
  const cancelledVouchers = vouchersList.filter(v => v.status === 'Cancelled').length;

  const exportAsPdf = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font
    pdf.setFont('helvetica');
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Voucher Details', 105, 20, { align: 'center' });
    
    // Left column - Details
    pdf.setFontSize(12);
    let yPos = 40;
    
    // Voucher name
    pdf.setTextColor(100, 100, 100);
    pdf.text('Voucher name', 30, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Room_aasfhcdchfhbP', 30, yPos + 6);
    
    yPos += 20;
    
    // Vendor
    pdf.setTextColor(100, 100, 100);
    pdf.text('Vendor', 30, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Seaview Lodge hotel', 30, yPos + 6);
    
    yPos += 20;
    
    // Discount
    pdf.setTextColor(100, 100, 100);
    pdf.text('Discount/value', 30, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text('15% OFF', 30, yPos + 6);
    
    yPos += 20;
    
    // Validity
    pdf.setTextColor(100, 100, 100);
    pdf.text('Validity', 30, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text('01 Sept 2025-08 Sept 2025', 30, yPos + 6);
    
    // Add QR code from canvas
    if (qrCodeRef.current) {
      const qrDataUrl = qrCodeRef.current.toDataURL('image/png');
      
      // Add QR code to PDF
      pdf.setDrawColor(139, 92, 246); // Indigo color
      pdf.setLineWidth(1);
      pdf.rect(130, 40, 40, 40); // Border
      pdf.addImage(qrDataUrl, 'PNG', 132, 42, 36, 36);
      
      // Redemption text
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Redemption', 150, 88, { align: 'center' });
      pdf.setTextColor(0, 0, 0);
      pdf.text('1/5', 150, 94, { align: 'center' });
    }
    
    // Save the PDF
    pdf.save('voucher.pdf');
  };

  return (
    <>
      <Layout 
        onNavigate={onNavigate} 
        onMenuClick={onMenuClick}
        showCreateButton={true}
        onCreateClick={() => setCreateVoucherOpen(true)}
        createButtonText="Create Voucher"
        showSearch={false}
      >
        <div className="p-6 bg-[#F5F5FA] min-h-full">
          <h1 className="mb-6">Voucher Management</h1>

          {/* Tabs */}
          <div className="mb-6">
            <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2" onClick={() => setActiveFilter('all')}>
              All
            </Button>
            <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2" onClick={() => setActiveFilter('Active')}>
              Active
            </Button>
            <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2" onClick={() => setActiveFilter('Redeemed')}>
              Redeemed
            </Button>
            <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2" onClick={() => setActiveFilter('Cancelled')}>
              Cancelled
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`bg-white rounded-lg p-6 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'all' ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="text-sm text-gray-600 mb-2">Total Vouchers</div>
              <div className="text-3xl">{totalVouchers}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Active')}
              className={`bg-white rounded-lg p-6 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Active' ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="text-sm text-gray-600 mb-2">Active Vouchers</div>
              <div className="text-3xl">{activeVouchers}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Redeemed')}
              className={`bg-white rounded-lg p-6 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Redeemed' ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="text-sm text-gray-600 mb-2">Redeemed</div>
              <div className="text-3xl">{redeemedVouchers}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Cancelled')}
              className={`bg-white rounded-lg p-6 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Cancelled' ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="text-sm text-gray-600 mb-2">Cancelled</div>
              <div className="text-3xl text-red-600">{cancelledVouchers}</div>
            </button>
          </div>

          {/* Sort button */}
          <div className="flex justify-end mb-4 relative">
            <Button variant="outline" className="gap-2" onClick={() => setSortMenuOpen(!sortMenuOpen)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Sort by
            </Button>
            {sortMenuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1" role="menu">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortBy('name');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      setSortMenuOpen(false);
                    }}
                  >
                    Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortBy('vendor');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      setSortMenuOpen(false);
                    }}
                  >
                    Vendor {sortBy === 'vendor' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortBy('validity');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      setSortMenuOpen(false);
                    }}
                  >
                    Validity {sortBy === 'validity' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortBy('status');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      setSortMenuOpen(false);
                    }}
                  >
                    Status {sortBy === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm w-[18%]">Voucher name</th>
                  <th className="px-4 py-3 text-left text-sm w-[16%]">Vendor</th>
                  <th className="px-4 py-3 text-left text-sm w-[10%]">Discount</th>
                  <th className="px-4 py-3 text-left text-sm w-[14%]">Validity</th>
                  <th className="px-4 py-3 text-left text-sm w-[12%]">Status</th>
                  <th className="px-4 py-3 text-left text-sm w-[12%]">Redemption</th>
                  <th className="px-4 py-3 text-left text-sm w-[18%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {vouchersList
                  .filter(voucher => activeFilter === 'all' || voucher.status === activeFilter)
                  .sort((a, b) => {
                    if (sortBy === 'name') {
                      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                    } else if (sortBy === 'vendor') {
                      return sortOrder === 'asc' ? a.vendor.localeCompare(b.vendor) : b.vendor.localeCompare(a.vendor);
                    } else if (sortBy === 'validity') {
                      return sortOrder === 'asc' ? a.validity.localeCompare(b.validity) : b.validity.localeCompare(a.validity);
                    } else if (sortBy === 'status') {
                      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
                    }
                    return 0;
                  })
                  .map((voucher) => (
                    <tr key={voucher.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm truncate">{voucher.name}</td>
                      <td className="px-4 py-3 text-sm truncate">{voucher.vendor}</td>
                      <td className="px-4 py-3 text-sm">{voucher.discount}</td>
                      <td className="px-4 py-3 text-sm">{voucher.validity}</td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(voucher.status)}>
                          {voucher.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">{voucher.redemption}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setViewVoucherOpen(true)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setEditVoucherOpen(true)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => {
                              setDeleteVoucherOpen(true);
                              setSelectedVoucherId(voucher.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>

      {/* View Voucher Dialog */}
      <Dialog open={viewVoucherOpen} onOpenChange={setViewVoucherOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>View Voucher</DialogTitle>
            <DialogDescription className="sr-only">
              View voucher details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4 bg-white">
            <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Left side - Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '4px', color: '#6b7280' }}>Voucher name</div>
                    <div style={{ fontSize: '14px', color: '#000000' }}>Room_aasfhcdchfhbP</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '4px', color: '#6b7280' }}>Vendor</div>
                    <div style={{ fontSize: '14px', color: '#000000' }}>Seaview Lodge hotel</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '4px', color: '#6b7280' }}>Discount/value</div>
                    <div style={{ fontSize: '14px', color: '#000000' }}>15% OFF</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '4px', color: '#6b7280' }}>Validity</div>
                    <div style={{ fontSize: '14px', color: '#000000' }}>01 Sept 2025-08 Sept 2025</div>
                  </div>
                </div>

                {/* Right side - QR Code */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '120px', height: '120px', border: '4px solid #8B5CF6', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                    <canvas ref={qrCodeRef} className="w-full h-full" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px', color: '#6b7280' }}>Redemption</div>
                    <div style={{ fontSize: '14px', color: '#000000' }}>1/5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewVoucherOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={exportAsPdf}>
              Export as Pdf
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Voucher Dialog */}
      <Dialog open={editVoucherOpen} onOpenChange={setEditVoucherOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Voucher</DialogTitle>
            <DialogDescription className="sr-only">
              Edit voucher details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="voucher-name">Voucher name</Label>
              <Input
                id="voucher-name"
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Seaview Lodge hotel">Seaview Lodge hotel</SelectItem>
                  <SelectItem value="Paradise Motel">Paradise Motel</SelectItem>
                  <SelectItem value="South Beach Hotel">South Beach Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="discount">Discount/value</Label>
              <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15% OFF">15% OFF</SelectItem>
                  <SelectItem value="20% OFF">20% OFF</SelectItem>
                  <SelectItem value="25% OFF">25% OFF</SelectItem>
                  <SelectItem value="R100 OFF">R100 OFF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="validity">Validity</Label>
                <Input
                  id="validity"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Redeemed">Redeemed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditVoucherOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setEditVoucherOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Voucher Dialog */}
      <Dialog open={deleteVoucherOpen} onOpenChange={setDeleteVoucherOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Voucher</DialogTitle>
            <DialogDescription className="sr-only">
              Delete voucher
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this voucher? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteVoucherOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
              if (selectedVoucherId !== null) {
                setVouchersList(vouchersList.filter(v => v.id !== selectedVoucherId));
              }
              setDeleteVoucherOpen(false);
            }}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Voucher Dialog */}
      <Dialog open={createVoucherOpen} onOpenChange={setCreateVoucherOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Voucher</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new voucher
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="create-voucher-name">Voucher Name</Label>
              <Input
                id="create-voucher-name"
                className="mt-1"
                placeholder="Enter voucher name"
              />
            </div>

            <div>
              <Label htmlFor="create-vendor">Vendor</Label>
              <Select>
                <SelectTrigger id="create-vendor" className="mt-1">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seaview">Seaview Lodge hotel</SelectItem>
                  <SelectItem value="paradise">Paradise Motel</SelectItem>
                  <SelectItem value="beach">South Beach Hotel</SelectItem>
                  <SelectItem value="woolworths">Woolworths</SelectItem>
                  <SelectItem value="picknpay">Pick n Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="create-discount">Discount/Value</Label>
              <Select>
                <SelectTrigger id="create-discount" className="mt-1">
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15off">15% OFF</SelectItem>
                  <SelectItem value="20off">20% OFF</SelectItem>
                  <SelectItem value="25off">25% OFF</SelectItem>
                  <SelectItem value="r100">R100 OFF</SelectItem>
                  <SelectItem value="r200">R200 OFF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-start-date">Start Date</Label>
                <Input
                  id="create-start-date"
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="create-end-date">End Date</Label>
                <Input
                  id="create-end-date"
                  type="date"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="create-redemption-limit">Redemption Limit</Label>
              <Input
                id="create-redemption-limit"
                type="number"
                className="mt-1"
                placeholder="Enter maximum redemptions"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateVoucherOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => setCreateVoucherOpen(false)}>
              Create Voucher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}