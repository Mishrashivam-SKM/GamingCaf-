import React from 'react';
import { DataGrid, type Column } from '../../components/common/DataGrid';
import { KPIPill } from '../../components/common/KPIPill';
import { PremiumInput } from '../../components/common/PremiumInput';

interface Customer {
  id: string;
  name: string;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Standard';
  lastSeen: string;
  totalSpent: number;
  status: 'Active' | 'Offline';
}

const mockCustomers: Customer[] = [
  { id: 'USR-001', name: 'Arjun Sharma', tier: 'Diamond', lastSeen: 'Active Now', totalSpent: 45000, status: 'Active' },
  { id: 'USR-002', name: 'Priya Das', tier: 'Platinum', lastSeen: '2 hours ago', totalSpent: 28500, status: 'Offline' },
  { id: 'USR-003', name: 'Rohan Verma', tier: 'Gold', lastSeen: 'Yesterday', totalSpent: 15200, status: 'Offline' },
  { id: 'USR-004', name: 'Kabir Malhotra', tier: 'Standard', lastSeen: 'Active Now', totalSpent: 4100, status: 'Active' },
  { id: 'USR-005', name: 'Ishita Kaur', tier: 'Diamond', lastSeen: '3 days ago', totalSpent: 52000, status: 'Offline' },
  { id: 'USR-006', name: 'Vikram Singh', tier: 'Gold', lastSeen: '1 hour ago', totalSpent: 18400, status: 'Offline' },
  { id: 'USR-007', name: 'Ananya Reddy', tier: 'Platinum', lastSeen: 'Active Now', totalSpent: 31000, status: 'Active' },
];

export const Customers: React.FC = () => {
  const columns: Column<Customer>[] = [
    { header: 'USER ID', accessor: 'id', className: 'font-mono-data text-primary' },
    { 
      header: 'PLAYER', 
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-xs">
            {row.name.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-headline-sm text-[16px] text-on-surface">{row.name}</span>
        </div>
      )
    },
    { 
      header: 'TIER', 
      accessor: (row) => (
        <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest ${
          row.tier === 'Diamond' ? 'bg-primary/20 text-primary border border-primary/30' :
          row.tier === 'Platinum' ? 'bg-secondary/20 text-secondary border border-secondary/30' :
          row.tier === 'Gold' ? 'bg-tertiary/20 text-tertiary border border-tertiary/30' :
          'bg-surface-container-high text-on-surface-variant border border-outline-variant/30'
        }`}>
          {row.tier}
        </span>
      )
    },
    { header: 'LAST SEEN', accessor: 'lastSeen' },
    { 
      header: 'LIFETIME SPEND', 
      accessor: (row) => <span className="font-mono-data text-on-surface">₹{row.totalSpent.toLocaleString()}</span> 
    },
    {
      header: 'STATUS',
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${row.status === 'Active' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-outline-variant'}`}></div>
          <span className="text-xs text-on-surface-variant">{row.status}</span>
        </div>
      )
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
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">Customers Directory</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Manage user profiles, gaming tiers, and billing history.</p>
        </div>
        <div className="flex gap-4">
          <KPIPill label="Total Users" value="1,248" valueColorClass="text-on-surface" />
          <KPIPill label="Active Now" value="34" valueColorClass="text-green-500" />
          <button className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            NEW MEMBER
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6 shrink-0 relative z-20">
        <div className="flex-1 max-w-md">
           <PremiumInput icon="search" placeholder="Search by name, ID, or phone..." />
        </div>
        <button className="bg-surface-container-high border border-outline-variant/20 hover:border-outline text-on-surface px-4 py-2 rounded-md flex items-center gap-2 transition-colors font-label-md">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          FILTER
        </button>
      </div>

      <div className="flex-1 relative z-20 overflow-hidden h-full pb-8">
        <DataGrid columns={columns} data={mockCustomers} />
      </div>
    </div>
  );
};
