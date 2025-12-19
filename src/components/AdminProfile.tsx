import { useState } from 'react';
import { Menu, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ViewType } from '../App';

interface AdminProfileProps {
  onNavigate?: (view: ViewType) => void;
  onMenuClick?: () => void;
}

export function AdminProfile({ onNavigate, onMenuClick }: AdminProfileProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [fullName, setFullName] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');
  const [phone, setPhone] = useState('0123456789');
  const [role, setRole] = useState('Super Admin');
  const [status, setStatus] = useState('Active');

  return (
    <>
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl">My Profile</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-600 mb-6">View and manage your profile information.</p>

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* User Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 bg-[#8B5CF6] flex items-center justify-center">
                      <span className="text-2xl text-white">👤</span>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg sm:text-xl">{fullName}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                          onClick={() => setEditDialogOpen(true)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">{role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="p-6">
                <div className="bg-indigo-50 px-4 py-2 mb-4 rounded">
                  <h3 className="text-sm">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full names</p>
                    <p className="text-sm">{fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-sm break-all">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-sm">{phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Role</p>
                    <p className="text-sm">{role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Department</p>
                    <p className="text-sm">Administration</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Join Date</p>
                    <p className="text-sm">January 1, 2024</p>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="p-6 border-t border-gray-100">
                <div className="bg-indigo-50 px-4 py-2 mb-4 rounded">
                  <h3 className="text-sm">Account Settings</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Two-Factor Authentication</p>
                    <p className="text-sm text-green-600">Enabled</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Password Change</p>
                    <p className="text-sm">December 10, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Login Sessions</p>
                    <p className="text-sm">3 active sessions</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Account Created</p>
                    <p className="text-sm">January 1, 2024</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <Button variant="outline">
                    Security Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm mb-4">Activity Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Logins</span>
                    <span>1,234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Login</span>
                    <span>Today, 10:30 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Actions Performed</span>
                    <span>5,678</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm mb-4">Permissions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">User Management</span>
                    <span className="text-green-600">Full Access</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Campaign Management</span>
                    <span className="text-green-600">Full Access</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">System Settings</span>
                    <span className="text-green-600">Full Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription className="sr-only">
              Edit your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="admin-fullname">Full Names</Label>
              <Input
                id="admin-fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="admin-phone">Phone</Label>
              <Input
                id="admin-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="admin-role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="admin-role" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
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
    </>
  );
}
