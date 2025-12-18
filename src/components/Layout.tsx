import { ReactNode, useState } from 'react';
import { Bell, User as UserIcon, Plus, ArrowLeft, Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useApp } from '../contexts/AppContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonText?: string;
}

export function Layout({
  children,
  title,
  showBackButton = false,
  onBack,
  showSearch = true,
  showCreateButton = true,
  onCreateClick,
  createButtonText = 'Create',
}: LayoutProps) {
  const { notifications } = useApp();

  return (
    <div className="flex-1 bg-[#F5F5FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-6 py-3 flex items-center justify-between flex-shrink-0 h-[64px]">
        <div className="flex items-center gap-4 flex-1">
          {showBackButton && onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          
          {title && <h1 className="text-xl">{title}</h1>}
          
          {showSearch && (
            <div className="relative flex-1 max-w-md ml-4">
              <Input
                placeholder="Search"
                className="pl-4 pr-10 bg-[#F5F5FA] border-0 rounded-lg h-10 text-sm shadow-[inset_-2px_-2px_4px_0px_rgba(255,255,255,0.5),inset_2px_2px_4px_0px_rgba(170,170,204,0.25)]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-[#7878AB]" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showCreateButton && (
            <Button 
              className="bg-[#8363F2] hover:bg-[#6B51D4] text-white px-4 py-2 h-10 rounded-lg"
              onClick={onCreateClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              {createButtonText}
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="relative w-10 h-10 hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-700" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-xs">
                {notifications}
              </Badge>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-gray-100">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Button>
          
          <Button variant="ghost" size="icon" className="w-10 h-10 hover:bg-gray-100">
            <UserIcon className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}