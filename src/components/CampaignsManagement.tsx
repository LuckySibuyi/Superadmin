import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Layout } from './Layout';
import { campaigns, campaignStats } from '../data/mockData';
import { getStatusColor, formatCurrency } from '../utils/formatters';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { ViewType } from '../App';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CampaignsManagementProps {
  onViewCampaign?: (campaignId: string) => void;
  onNavigate?: (view: ViewType) => void;
  onMenuClick?: () => void;
}

type FilterType = 'all' | 'active' | 'best-campaigns' | 'best-vendors';
type SortType = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc' | 'raised-desc' | 'raised-asc' | 'vendors-desc' | 'vendors-asc';

export function CampaignsManagement({ onViewCampaign, onNavigate, onMenuClick }: CampaignsManagementProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date-desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [campaignCategory, setCampaignCategory] = useState('');
  const [campaignEndDate, setCampaignEndDate] = useState('');
  const sortMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter campaigns based on active filter
  const getFilteredCampaigns = () => {
    switch (activeFilter) {
      case 'active':
        return campaigns.filter(c => c.status === 'Active');
      case 'best-campaigns':
        // Best campaigns are those that have raised the most or met their goal
        return campaigns
          .filter(c => c.raised >= c.goal * 0.8)
          .sort((a, b) => b.raised - a.raised)
          .slice(0, 25);
      case 'best-vendors':
        // Best vendors are those with the most vendors involved
        return campaigns
          .sort((a, b) => b.vendorsInvolved - a.vendorsInvolved)
          .slice(0, 12);
      default:
        return campaigns;
    }
  };

  // Sort campaigns based on sort option
  const getSortedCampaigns = (campaignsToSort: typeof campaigns) => {
    const sorted = [...campaignsToSort];
    
    switch (sortBy) {
      case 'date-desc':
        return sorted.reverse();
      case 'date-asc':
        return sorted;
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'raised-desc':
        return sorted.sort((a, b) => b.raised - a.raised);
      case 'raised-asc':
        return sorted.sort((a, b) => a.raised - b.raised);
      case 'vendors-desc':
        return sorted.sort((a, b) => b.vendorsInvolved - a.vendorsInvolved);
      case 'vendors-asc':
        return sorted.sort((a, b) => a.vendorsInvolved - b.vendorsInvolved);
      default:
        return sorted;
    }
  };

  const filteredCampaigns = getFilteredCampaigns();
  const sortedCampaigns = getSortedCampaigns(filteredCampaigns);

  const sortOptions = [
    { value: 'date-desc' as SortType, label: 'Date (Newest First)' },
    { value: 'date-asc' as SortType, label: 'Date (Oldest First)' },
    { value: 'name-asc' as SortType, label: 'Name (A-Z)' },
    { value: 'name-desc' as SortType, label: 'Name (Z-A)' },
    { value: 'raised-desc' as SortType, label: 'Amount Raised (High to Low)' },
    { value: 'raised-asc' as SortType, label: 'Amount Raised (Low to High)' },
    { value: 'vendors-desc' as SortType, label: 'Vendors Involved (Most First)' },
    { value: 'vendors-asc' as SortType, label: 'Vendors Involved (Least First)' },
  ];

  const handleSortSelect = (value: SortType) => {
    setSortBy(value);
    setShowSortMenu(false);
  };

  const getSortLabel = () => {
    return sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort by';
  };

  return (
    <Layout 
      onNavigate={onNavigate} 
      onMenuClick={onMenuClick}
      showCreateButton={true}
      onCreateClick={() => setCreateDialogOpen(true)}
      createButtonText="Create Campaign"
      showSearch={false}
    >
      <div className="p-6">
        <h1 className="mb-6">Campaigns Management</h1>

        {/* Tabs */}
        <div className="mb-6">
          <Button variant="ghost" className="text-indigo-600 border-b-2 border-indigo-600 rounded-none px-4 py-2">
            All
          </Button>
        </div>

        {/* Stats Cards - Now clickable filters */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`bg-white rounded-lg p-6 text-left transition-all hover:shadow-md ${
              activeFilter === 'all' ? 'ring-2 ring-indigo-500 shadow-md' : ''
            }`}
          >
            <div className="text-sm text-gray-600 mb-2">Total Campaigns</div>
            <div className="text-3xl">{campaignStats.totalCampaigns}</div>
            {activeFilter === 'all' && (
              <div className="text-xs text-indigo-600 mt-2">● Active Filter</div>
            )}
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`bg-white rounded-lg p-6 text-left transition-all hover:shadow-md ${
              activeFilter === 'active' ? 'ring-2 ring-indigo-500 shadow-md' : ''
            }`}
          >
            <div className="text-sm text-gray-600 mb-2">Active Campaigns</div>
            <div className="text-3xl">{campaignStats.activeCampaigns}</div>
            {activeFilter === 'active' && (
              <div className="text-xs text-indigo-600 mt-2">● Active Filter</div>
            )}
          </button>
          <button
            onClick={() => setActiveFilter('best-campaigns')}
            className={`bg-white rounded-lg p-6 text-left transition-all hover:shadow-md ${
              activeFilter === 'best-campaigns' ? 'ring-2 ring-indigo-500 shadow-md' : ''
            }`}
          >
            <div className="text-sm text-gray-600 mb-2">Best Campaigns</div>
            <div className="text-3xl">{campaignStats.bestCampaigns}</div>
            {activeFilter === 'best-campaigns' && (
              <div className="text-xs text-indigo-600 mt-2">● Active Filter</div>
            )}
          </button>
          <button
            onClick={() => setActiveFilter('best-vendors')}
            className={`bg-white rounded-lg p-6 text-left transition-all hover:shadow-md ${
              activeFilter === 'best-vendors' ? 'ring-2 ring-indigo-500 shadow-md' : ''
            }`}
          >
            <div className="text-sm text-gray-600 mb-2">Best Vendors</div>
            <div className="text-3xl">{campaignStats.bestVendors}</div>
            {activeFilter === 'best-vendors' && (
              <div className="text-xs text-indigo-600 mt-2">● Active Filter</div>
            )}
          </button>
        </div>

        {/* Sort button */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Showing {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="ml-2 text-indigo-600 hover:text-indigo-700 underline"
              >
                Clear filter
              </button>
            )}
          </div>
          <div className="relative" ref={sortMenuRef}>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              {getSortLabel()}
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </Button>
            {showSortMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              >
                <div className="py-1">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        sortBy === option.value ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                      }`}
                      onClick={() => handleSortSelect(option.value)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {sortBy === option.value && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Campaigns</th>
                <th className="px-6 py-3 text-left text-sm">Owner</th>
                <th className="px-6 py-3 text-left text-sm">Vendors Involved</th>
                <th className="px-6 py-3 text-left text-sm">Goal vs Raised</th>
                <th className="px-6 py-3 text-left text-sm">Status</th>
                <th className="px-6 py-3 text-left text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedCampaigns.map((campaign) => (
                <tr 
                  key={campaign.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onViewCampaign?.(campaign.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={campaign.image}
                        alt={campaign.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="text-sm">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{campaign.owner}</td>
                  <td className="px-6 py-4 text-sm text-center">{campaign.vendorsInvolved}</td>
                  <td className="px-6 py-4 text-sm">{formatCurrency(campaign.goal)}/{formatCurrency(campaign.raised)}</td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{campaign.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No campaigns found for this filter
            </div>
          )}
        </div>
      </div>

      {/* Create Campaign Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new campaign
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="mt-1"
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <Label htmlFor="campaign-goal">Funding Goal</Label>
              <Input
                id="campaign-goal"
                type="number"
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value)}
                className="mt-1"
                placeholder="Enter funding goal (R)"
              />
            </div>
            <div>
              <Label htmlFor="campaign-category">Category</Label>
              <Select value={campaignCategory} onValueChange={setCampaignCategory}>
                <SelectTrigger id="campaign-category" className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="campaign-end-date">End Date</Label>
              <Input
                id="campaign-end-date"
                type="date"
                value={campaignEndDate}
                onChange={(e) => setCampaignEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea
                id="campaign-description"
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
                className="mt-1 min-h-[100px] resize-none"
                placeholder="Enter campaign description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => setCreateDialogOpen(false)}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}