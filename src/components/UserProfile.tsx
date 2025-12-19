import { X, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert } from './ui/alert';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface UserProfileProps {
  onClose: () => void;
  userData?: {
    name: string;
    email: string;
    role: string;
    status: string;
    phone?: string;
  };
}

export function UserProfile({ onClose, userData }: UserProfileProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fullName, setFullName] = useState(userData?.name || 'Ndzulamo Mireya Baloyi');
  const [email, setEmail] = useState(userData?.email || 'Ndzulamo@example.com');
  const [phone, setPhone] = useState(userData?.phone || '012356789');
  const [role, setRole] = useState(userData?.role || 'Admin');
  const [status, setStatus] = useState(userData?.status || 'Active');
  const [suspensionReason, setSuspensionReason] = useState('');

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white overflow-auto">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2>User Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 mb-6">View and manage all details of specific user.</p>

          {/* User Header */}
          <div className="bg-white rounded-lg border border-gray-100 p-6 mb-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16 bg-[#8B5CF6] flex items-center justify-center">
                <span className="text-2xl text-white">👤</span>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl">{fullName}</h2>
                  <Badge
                    className={`${
                      status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">{role}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <div className="bg-indigo-50 px-4 py-2 mb-4 rounded">
                <h3 className="text-sm">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Full names</p>
                  <p className="text-sm">{fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-sm">{phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Registered Date</p>
                  <p className="text-sm">01 Aug 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  <p className="text-sm">{role}</p>
                </div>
              </div>
            </div>

            {/* Campaigns Activity */}
            <div className="mb-6">
              <div className="bg-indigo-50 px-4 py-2 mb-4 rounded">
                <h3 className="text-sm">Campaigns Activity</h3>
              </div>
              <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Campaigns Owned</p>
                  <p className="text-xl">3</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Campaigns Sponsor</p>
                  <p className="text-xl">5</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Campaigns Contributed</p>
                  <p className="text-xl">5</p>
                </div>
              </div>
            </div>

            {/* Performance/Reputation */}
            <div className="mb-6">
              <div className="bg-indigo-50 px-4 py-2 mb-4 rounded">
                <h3 className="text-sm">Performance/Reputation</h3>
              </div>
              <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Campaigns Success</p>
                  <p className="text-xl">80%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vendor Rating</p>
                  <p className="text-xl">4.2</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contribution Consistency</p>
                  <p className="text-xl">80%</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-100">
              <Button onClick={() => setEditDialogOpen(true)} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                Edit User
              </Button>
              <Button variant="destructive" onClick={() => setSuspendDialogOpen(true)}>
                Suspend User
              </Button>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(true)}>Delete User</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="sr-only">
              Edit user information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="fullname">Full Names</Label>
              <Input
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="mt-1">
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
            <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={() => setEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend User Dialog */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription className="sr-only">
              Suspend user access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Alert className="bg-red-50 border-red-200 p-3">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs">!</span>
                </div>
                <div>
                  <p className="text-sm text-red-900">Are you sure you want to Suspend this user?</p>
                  <p className="text-xs text-red-700 mt-0.5">This action will restrict their access until reactivated</p>
                </div>
              </div>
            </Alert>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h4 className="text-sm text-gray-900 mb-3">Personal Information</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Full names</p>
                  <p className="text-sm text-gray-900">{fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm text-gray-900 break-all">{email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <p className="text-sm text-gray-900">{phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Currently role</p>
                  <p className="text-sm text-gray-900">{role}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-0.5">Currently Status</p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {status}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="reason" className="text-sm text-gray-700 mb-1.5 block">Reason for Suspension</Label>
              <Textarea
                id="reason"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                className="min-h-[80px] resize-none"
                placeholder="Enter reason..."
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
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
        <DialogContent className="sm:max-w-md">
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
                  <p className="text-xs text-red-700">This action will restrict their access until reactivated</p>
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
                  <span>{email}</span>
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
                  <span className="text-green-600">{status}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <Label htmlFor="delete-reason" className="text-sm text-gray-600">Reason for Suspension</Label>
                  <div className="mt-2 h-20 bg-gray-50 rounded border border-gray-200"></div>
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
    </>
  );
}