import { useState } from 'react';
import { Eye, Edit, Ban, Trash2, Plus, Menu, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Alert } from './ui/alert';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { users, userStats } from '../data/mockData';
import { ViewType } from '../App';
import { UserProfile } from './UserProfile';

interface UsersProps {
  onNavigate?: (view: ViewType) => void;
  onMenuClick?: () => void;
}

type UserType = 'all' | 'User' | 'Corporate' | 'Vendor';
type AccountType = 'user' | 'corporate' | 'vendor';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  ratings: string;
  comment: string;
}

export function Users({ onNavigate, onMenuClick }: UsersProps) {
  const [activeTab, setActiveTab] = useState<UserType>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  // Modal states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createAccountType, setCreateAccountType] = useState<AccountType>('user');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('User');
  const [status, setStatus] = useState('Active');
  const [suspensionReason, setSuspensionReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create account form states
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [vendorCategory, setVendorCategory] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleViewUser = (user: UserData) => {
    setSelectedUser(user);
    setFullName(user.name);
    setEmail(user.email);
    setPhone('0834573828');
    setRole(user.role);
    setStatus(user.status);
    setShowUserProfile(true);
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setFullName(user.name);
    setEmail(user.email);
    setPhone('0834573828');
    setRole(user.role);
    setStatus(user.status);
    setEditDialogOpen(true);
  };

  const handleSuspendUser = (user: UserData) => {
    setSelectedUser(user);
    setFullName(user.name);
    setEmail(user.email);
    setPhone('0834573828');
    setRole(user.role);
    setStatus(user.status);
    setSuspensionReason('');
    setSuspendDialogOpen(true);
  };

  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setFullName(user.name);
    setEmail(user.email);
    setPhone('0834573828');
    setRole(user.role);
    setStatus(user.status);
    setDeleteDialogOpen(true);
  };

  const handleCreateAccount = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setBusinessType('');
    setVendorCategory('');
    setCreateAccountType('user');
    setCreateDialogOpen(true);
  };

  const renderUserActions = (user: UserData) => (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleViewUser(user)}
        className="h-8 w-8 p-0 hover:bg-indigo-50 hover:text-[#8B5CF6]"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleEditUser(user)}
        className="h-8 w-8 p-0 hover:bg-indigo-50 hover:text-[#8B5CF6]"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleSuspendUser(user)}
        className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
      >
        <Ban className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleDeleteUser(user)}
        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl">Users Management</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                <Plus className="w-4 h-4 mr-2" />
                Create Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => { setCreateAccountType('user'); handleCreateAccount(); }}>
                Create User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setCreateAccountType('corporate'); handleCreateAccount(); }}>
                Create Corporate User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setCreateAccountType('vendor'); handleCreateAccount(); }}>
                Create Vendor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Total Users</div>
            <div className="text-2xl sm:text-3xl">+{userStats.totalUsers.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Active Users</div>
            <div className="text-2xl sm:text-3xl text-green-600">+{userStats.activeUsers}</div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Suspended Users</div>
            <div className="text-2xl sm:text-3xl text-orange-600">{userStats.suspendedUsers}</div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Banned Users</div>
            <div className="text-2xl sm:text-3xl text-red-600">{userStats.bannedUsers}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as UserType)} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="User">Users</TabsTrigger>
                <TabsTrigger value="Corporate">Corporate</TabsTrigger>
                <TabsTrigger value="Vendor">Vendors</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Last Sign In</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleViewUser(user)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewUser(user)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base truncate mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <Badge
                  className={`ml-2 ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {user.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                <p>Last Sign In: {user.lastLogin}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="sr-only">
              Edit user information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-fullname">Full Names</Label>
              <Input
                id="edit-fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="edit-role" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="edit-status" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => setEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend User Dialog */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription className="sr-only">
              Suspend user access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert className="bg-red-50 border-red-200">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  ⚠
                </div>
                <div>
                  <p className="text-sm text-red-900">Are you Sure you want to Suspend this user?</p>
                  <p className="text-xs text-red-700">This action will restrict their access until reactivated</p>
                </div>
              </div>
            </Alert>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <h4 className="text-sm">Personal Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Full names</p>
                  <p>{fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="break-all">{email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p>{phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Currently role</p>
                  <p>{role}</p>
                </div>
                <div>
                  <p className="text-gray-600">Currently Status</p>
                  <p className="text-green-600">{status}</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="suspend-reason">Reason for Suspension</Label>
              <Textarea
                id="suspend-reason"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                className="mt-1 min-h-[100px]"
                placeholder="Enter reason..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setSuspendDialogOpen(false)}>
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="sr-only">
              Delete user permanently
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert className="bg-red-50 border-red-200">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  ⚠
                </div>
                <div>
                  <p className="text-sm text-red-900">Are you Sure you want to Delete this user?</p>
                  <p className="text-xs text-red-700">This action cannot be undone</p>
                </div>
              </div>
            </Alert>

            <div className="space-y-3">
              <h4 className="text-sm">Personal Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Full names</span>
                  <span>{fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email</span>
                  <span className="break-all">{email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phone</span>
                  <span>{phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Currently role</span>
                  <span>{role}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Currently Status</span>
                  <span className={status === 'Active' ? 'text-green-600' : 'text-orange-600'}>{status}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Account Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Create {createAccountType === 'user' ? 'User' : createAccountType === 'corporate' ? 'Corporate User' : 'Vendor'} Account
            </DialogTitle>
            <DialogDescription className="sr-only">
              Create a new account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Common Fields */}
            <div>
              <Label htmlFor="create-fullname">Full Name {createAccountType === 'vendor' ? '/ Business Name' : ''}</Label>
              <Input
                id="create-fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
                placeholder={createAccountType === 'vendor' ? 'Enter business name' : 'Enter full name'}
              />
            </div>
            <div>
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="create-phone">Phone</Label>
              <Input
                id="create-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
                placeholder="Enter phone number"
              />
            </div>

            {/* Corporate User Specific Fields */}
            {createAccountType === 'corporate' && (
              <>
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger id="business-type" className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Vendor Specific Fields */}
            {createAccountType === 'vendor' && (
              <>
                <div>
                  <Label htmlFor="vendor-category">Vendor Category</Label>
                  <Select value={vendorCategory} onValueChange={setVendorCategory}>
                    <SelectTrigger id="vendor-category" className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="activities">Activities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1"
                    placeholder="Enter business name"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="create-status">Initial Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="create-status" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => setCreateDialogOpen(false)}>
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Profile */}
      {showUserProfile && selectedUser && (
        <UserProfile
          onClose={() => setShowUserProfile(false)}
          userData={{
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role,
            status: selectedUser.status,
            phone: '0834573828'
          }}
        />
      )}
    </div>
  );
}