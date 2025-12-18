import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Layout } from './Layout';
import { users, userStats } from '../data/mockData';

export function UserManagement() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-6">User Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Total Users</div>
            <div className="text-3xl">+{userStats.totalUsers.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Active Users</div>
            <div className="text-3xl text-green-600">+{userStats.activeUsers}</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Suspended Users</div>
            <div className="text-3xl text-orange-600">{userStats.suspendedUsers}</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Banned Users</div>
            <div className="text-3xl text-red-600">{userStats.bannedUsers}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Registered" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Bulk action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="suspend">Suspend</SelectItem>
                <SelectItem value="activate">Activate</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1"></div>

            <Button variant="outline" className="text-sm">Filter action</Button>
            <Button variant="outline" className="text-sm">Filter</Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Last login</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Ratings</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Comment</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
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
                    <td className="px-6 py-4 text-sm text-gray-900">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.ratings}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}