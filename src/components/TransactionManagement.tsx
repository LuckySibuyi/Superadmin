import { Eye, Edit2, Trash2, Filter, ArrowUpDown, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Layout } from './Layout';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { ViewType } from '../App';

const transactions = [
  { id: '#6252', date: 'Aug 20,2025', user: 'Manila Mayo', vendor: 'Game', amount: 'R1900.00', status: 'Completed' },
  { id: '#6253', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
  { id: '#6254', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Failed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Completed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Failed' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Refund' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
  { id: '#6202', date: 'Aug 20,2025', user: 'MoMo Gift', vendor: 'Seaview Lodge', amount: 'R15 000.00', status: 'Pending' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700 hover:bg-green-100';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
    case 'Failed':
      return 'bg-red-100 text-red-700 hover:bg-red-100';
    case 'Refund':
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

interface TransactionManagementProps {
  onNavigate?: (view: ViewType) => void;
  selectedTransactionId?: string;
}

export function TransactionManagement({ onNavigate, selectedTransactionId }: TransactionManagementProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editTransactionOpen, setEditTransactionOpen] = useState(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Completed' | 'Pending' | 'Failed' | 'Refund'>('all');
  const [sortBy, setSortBy] = useState<'id' | 'date' | 'user' | 'vendor' | 'amount' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [transactionsList, setTransactionsList] = useState(transactions);

  // Auto-open transaction details if selectedTransactionId is provided
  useEffect(() => {
    if (selectedTransactionId) {
      const index = transactionsList.findIndex(t => t.id === selectedTransactionId);
      if (index !== -1) {
        setSelectedTransactionIndex(index);
        setViewDetailsOpen(true);
      }
    }
  }, [selectedTransactionId, transactionsList]);

  // Calculate counts based on actual data
  const totalTransactions = transactionsList.length;
  const completedTransactions = transactionsList.filter(t => t.status === 'Completed').length;
  const pendingTransactions = transactionsList.filter(t => t.status === 'Pending').length;
  const failedTransactions = transactionsList.filter(t => t.status === 'Failed').length;
  const refundTransactions = transactionsList.filter(t => t.status === 'Refund').length;

  // Filter transactions based on active filter
  const filteredTransactions = transactionsList.filter(transaction => {
    if (activeFilter === 'all') return true;
    return transaction.status === activeFilter;
  });

  // Sort transactions based on sortBy and sortOrder
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortBy === 'id') {
      return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    } else if (sortBy === 'user') {
      return sortOrder === 'asc' ? a.user.localeCompare(b.user) : b.user.localeCompare(a.user);
    } else if (sortBy === 'vendor') {
      return sortOrder === 'asc' ? a.vendor.localeCompare(b.vendor) : b.vendor.localeCompare(a.vendor);
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? parseFloat(a.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(b.amount.replace(/[^0-9.-]+/g, '')) : parseFloat(b.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(a.amount.replace(/[^0-9.-]+/g, ''));
    } else if (sortBy === 'status') {
      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    return 0;
  });

  return (
    <>
      <Layout onNavigate={onNavigate}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="mb-1">Transaction Management</h1>
              <div className="flex gap-2">
                <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2 h-auto">
                  All
                </Button>
              </div>
            </div>
            <div className="flex gap-2 relative">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
              >
                <Filter className="w-4 h-4" />
                Sort by
              </Button>
              {sortMenuOpen && (
                <div className="absolute right-28 top-10 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1" role="menu">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy('id');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        setSortMenuOpen(false);
                      }}
                    >
                      ID {sortBy === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy('date');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        setSortMenuOpen(false);
                      }}
                    >
                      Date {sortBy === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortBy('user');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        setSortMenuOpen(false);
                      }}
                    >
                      User {sortBy === 'user' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
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
                        setSortBy('amount');
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        setSortMenuOpen(false);
                      }}
                    >
                      Amount {sortBy === 'amount' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
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
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Show Transactions
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`bg-white rounded-lg p-4 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'all' ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="text-sm text-gray-500 mb-1">Total Transactions</div>
              <div className="text-2xl">{totalTransactions}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Completed')}
              className={`bg-white rounded-lg p-4 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Completed' ? 'ring-2 ring-green-600' : ''}`}
            >
              <div className="text-sm text-gray-500 mb-1">Completed</div>
              <div className="text-2xl text-green-600">{completedTransactions}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Pending')}
              className={`bg-white rounded-lg p-4 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Pending' ? 'ring-2 ring-yellow-600' : ''}`}
            >
              <div className="text-sm text-gray-500 mb-1">Pending</div>
              <div className="text-2xl text-yellow-600">{pendingTransactions}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Failed')}
              className={`bg-white rounded-lg p-4 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Failed' ? 'ring-2 ring-red-600' : ''}`}
            >
              <div className="text-sm text-gray-500 mb-1">Failed</div>
              <div className="text-2xl text-red-600">{failedTransactions}</div>
            </button>
            <button 
              onClick={() => setActiveFilter('Refund')}
              className={`bg-white rounded-lg p-4 shadow-sm text-left transition-all cursor-pointer hover:shadow-md ${activeFilter === 'Refund' ? 'ring-2 ring-indigo-600' : ''}`}
            >
              <div className="text-sm text-gray-500 mb-1">Refund</div>
              <div className="text-2xl text-indigo-600">{refundTransactions}</div>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">ID</th>
                  <th className="px-6 py-3 text-left text-sm">Date</th>
                  <th className="px-6 py-3 text-left text-sm">User</th>
                  <th className="px-6 py-3 text-left text-sm">Vendor</th>
                  <th className="px-6 py-3 text-left text-sm">Amount</th>
                  <th className="px-6 py-3 text-left text-sm">Status</th>
                  <th className="px-6 py-3 text-left text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">{transaction.user}</td>
                    <td className="px-6 py-4 text-sm">{transaction.vendor}</td>
                    <td className="px-6 py-4 text-sm">{transaction.amount}</td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setViewDetailsOpen(true);
                            setSelectedTransactionIndex(index);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditTransactionOpen(true);
                            setSelectedTransactionIndex(index);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setDeleteDialogOpen(true);
                            setSelectedTransactionIndex(index);
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

      {/* View Transaction Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewDetailsOpen(false)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <DialogTitle>Transaction Details</DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              View transaction details
            </DialogDescription>
          </DialogHeader>

          <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm">#5252</div>
            </div>
            <div>
              <div className="text-sm">Aug 20,2025</div>
            </div>
            <div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Completed
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-2">User</div>
                <div className="text-sm">Manila Mayo</div>
              </div>
              <div>
                <div className="text-sm mb-2">Items Purchased</div>
                <div className="text-sm">Seaview lodge -2 nights</div>
                <div className="text-sm">Tastelofuls catering</div>
                <div className="text-sm">Horse riding</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-2">Vendor</div>
                <div className="text-sm">Game</div>
              </div>
              <div>
                <div className="text-sm mb-2">Notes/Description</div>
                <div className="text-sm">Client paid via ewallet</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm mb-2">Payment Methods</div>
                <div className="text-sm">E-wallet</div>
              </div>
              <div>
                <div className="text-sm mb-2">Reference</div>
                <div className="text-sm">9754625625215</div>
              </div>
            </div>

            <div>
              <div className="text-sm mb-2">Amount</div>
              <div className="text-sm">R7500.00</div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setViewDetailsOpen(false);
                setDeleteDialogOpen(true);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {
                const doc = new jsPDF();
                doc.text("Transaction Details", 10, 10);
                doc.text("Order ID: #5252", 10, 20);
                doc.text("Date: Aug 20,2025", 10, 30);
                doc.text("User: Manila Mayo", 10, 40);
                doc.text("Vendor: Game", 10, 50);
                doc.text("Amount: R7500.00", 10, 60);
                doc.text("Status: Completed", 10, 70);
                doc.text("Payment Methods: E-wallet", 10, 80);
                doc.text("Reference: 9754625625215", 10, 90);
                doc.text("Items Purchased: Seaview lodge -2 nights, Tastelofuls catering, Horse riding", 10, 100);
                doc.text("Notes/Description: Client paid via ewallet", 10, 110);
                doc.save("transaction_details.pdf");
              }}
            >
              Export PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={editTransactionOpen} onOpenChange={setEditTransactionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditTransactionOpen(false)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <DialogTitle>Edit Transaction</DialogTitle>
            </div>
            <DialogDescription className="sr-only">
              Edit transaction details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="order-id">Order ID</Label>
              <Input
                id="order-id"
                defaultValue="#5252"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="order-name">Oder name</Label>
              <Input
                id="order-name"
                defaultValue="Seaview lodge -2 nights"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                defaultValue="R7500.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="payment-method">Payment Methods</Label>
              <Input
                id="payment-method"
                defaultValue="E-wallet"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                defaultValue="Aug 20,2025"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="reference">Reference number</Label>
              <Input
                id="reference"
                defaultValue="9754625625215"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTransactionOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setEditTransactionOpen(false)}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Transaction Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <span className="text-sm">⚠</span>
              </div>
              Delete Transaction
            </DialogTitle>
            <DialogDescription className="sr-only">
              Delete transaction confirmation
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              This action cannot be undone. are you sure you want to delete this transaction
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedTransactionIndex !== null) {
                  const transactionToDelete = sortedTransactions[selectedTransactionIndex];
                  setTransactionsList(transactionsList.filter(t => 
                    !(t.id === transactionToDelete.id && 
                      t.date === transactionToDelete.date && 
                      t.user === transactionToDelete.user && 
                      t.vendor === transactionToDelete.vendor)
                  ));
                }
                setDeleteDialogOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}