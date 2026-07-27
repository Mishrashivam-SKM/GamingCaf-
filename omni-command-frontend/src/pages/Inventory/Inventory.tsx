import React from 'react';
import { DataGrid, type Column } from '../../components/common/DataGrid';
import { KPIPill } from '../../components/common/KPIPill';
import { PremiumInput } from '../../components/common/PremiumInput';

interface InventoryItem {
  id: string;
  name: string;
  category: 'Food' | 'Beverage' | 'Hardware' | 'Merch';
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price: number;
}

const mockInventory: InventoryItem[] = [
  { id: 'INV-001', name: 'Red Bull Energy Drink', category: 'Beverage', stock: 142, status: 'In Stock', price: 150 },
  { id: 'INV-002', name: 'Razer DeathAdder V3', category: 'Hardware', stock: 5, status: 'Low Stock', price: 4500 },
  { id: 'INV-003', name: 'Doritos Nacho Cheese', category: 'Food', stock: 0, status: 'Out of Stock', price: 50 },
  { id: 'INV-004', name: 'Monster Energy Ultra', category: 'Beverage', stock: 85, status: 'In Stock', price: 160 },
  { id: 'INV-005', name: 'Logitech G Pro X Superlight', category: 'Hardware', stock: 12, status: 'In Stock', price: 12500 },
];

export const Inventory: React.FC = () => {
  const columns: Column<InventoryItem>[] = [
    { header: 'ITEM ID', accessor: 'id', className: 'font-mono-data text-primary' },
    { 
      header: 'ITEM NAME', 
      accessor: (row) => (
        <span className="font-headline-sm text-[16px] text-on-surface">{row.name}</span>
      )
    },
    { 
      header: 'CATEGORY', 
      accessor: (row) => (
        <span className="px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
          {row.category}
        </span>
      )
    },
    { 
      header: 'STOCK', 
      accessor: (row) => (
        <span className="font-mono-data text-on-surface">{row.stock}</span>
      )
    },
    {
      header: 'STATUS',
      accessor: (row) => {
        let colorClass = 'bg-green-500';
        if (row.status === 'Low Stock') colorClass = 'bg-orange-500';
        if (row.status === 'Out of Stock') colorClass = 'bg-red-500';
        
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${colorClass} ${row.status !== 'Out of Stock' ? 'animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}`}></div>
            <span className="text-xs text-on-surface-variant">{row.status}</span>
          </div>
        );
      }
    },
    { 
      header: 'PRICE', 
      accessor: (row) => <span className="font-mono-data text-on-surface">₹{row.price}</span> 
    },
    {
      header: 'ACTIONS',
      accessor: () => (
        <button className="p-2 hover:bg-surface-container-high rounded text-primary transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      )
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)]">
      <div className="flex justify-between items-end mb-8 relative z-20 shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">Inventory Control</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Manage cafe stock, hardware replacements, and pricing.</p>
        </div>
        <div className="flex gap-4">
          <KPIPill label="Total Items" value="48" valueColorClass="text-on-surface" />
          <KPIPill label="Low Stock" value="5" valueColorClass="text-orange-500" />
          <button className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            ADD ITEM
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6 shrink-0 relative z-20">
        <div className="flex-1 max-w-md">
           <PremiumInput icon="search" placeholder="Search inventory..." />
        </div>
        <button className="bg-surface-container-high border border-outline-variant/20 hover:border-outline text-on-surface px-4 py-2 rounded-md flex items-center gap-2 transition-colors font-label-md">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          FILTER
        </button>
      </div>

      <div className="flex-1 relative z-20 overflow-hidden h-full pb-8">
        <DataGrid columns={columns} data={mockInventory} />
      </div>
    </div>
  );
};
