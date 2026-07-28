import React, { useState, useMemo } from 'react';
import { DataGrid, type Column } from '../../components/common/DataGrid';
import { KPIPill } from '../../components/common/KPIPill';
import { PremiumInput } from '../../components/common/PremiumInput';
import { useCustomers } from '../../hooks/queries/useCustomers';
import type { Customer } from '../../types/models';
import { CustomerFormModal } from '../../components/specific/CustomerFormModal';

export const Customers: React.FC = () => {
  const { data: customers, isLoading } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(undefined);

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    if (!searchQuery) return customers;
    
    const lowerQ = searchQuery.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(lowerQ) || 
      c.id.toLowerCase().includes(lowerQ) ||
      (c.phone && c.phone.includes(lowerQ))
    );
  }, [customers, searchQuery]);

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingCustomer(undefined);
    setIsModalOpen(true);
  };

  const columns: Column<Customer>[] = [
    { header: 'USER ID', accessor: 'id', className: 'font-mono-data text-primary' },
    { 
      header: 'PLAYER', 
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-xs">
            {row.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-headline-sm text-[16px] text-on-surface block">{row.name}</span>
            <span className="font-body-sm text-[12px] text-on-surface-variant block">{row.phone || row.email}</span>
          </div>
        </div>
      )
    },
    { 
      header: 'TIER', 
      accessor: (row) => (
        <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest ${
          row.membershipLevel === 'PLATINUM' ? 'bg-primary/20 text-primary border border-primary/30' :
          row.membershipLevel === 'GOLD' ? 'bg-tertiary/20 text-tertiary border border-tertiary/30' :
          row.membershipLevel === 'SILVER' ? 'bg-secondary/20 text-secondary border border-secondary/30' :
          'bg-surface-container-high text-on-surface-variant border border-outline-variant/30'
        }`}>
          {row.membershipLevel}
        </span>
      )
    },
    { 
      header: 'LAST SEEN', 
      accessor: (row) => {
        if (!row.lastVisit) return '-';
        const d = new Date(row.lastVisit);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      }
    },
    { 
      header: 'LIFETIME SPEND', 
      accessor: (row) => <span className="font-mono-data text-on-surface">${row.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2})}</span> 
    },
    {
      header: 'POINTS',
      accessor: (row) => <span className="font-mono-data text-tertiary">{row.loyaltyPoints}</span>
    },
    {
      header: 'ACTIONS',
      accessor: (row) => (
        <button 
          onClick={(e) => { e.stopPropagation(); handleEdit(row); }}
          className="p-2 hover:bg-surface-container-high rounded text-primary transition-colors flex items-center justify-center"
        >
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
          <KPIPill label="Total Users" value={customers?.length.toString() || "0"} valueColorClass="text-on-surface" />
          <button 
            onClick={handleNew}
            className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            NEW MEMBER
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6 shrink-0 relative z-20">
        <div className="flex-1 max-w-md">
           <PremiumInput 
            icon="search" 
            placeholder="Search by name, ID, or phone..." 
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-surface-container-high border border-outline-variant/20 hover:border-outline text-on-surface px-4 py-2 rounded-md flex items-center gap-2 transition-colors font-label-md">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          FILTER
        </button>
      </div>

      <div className="flex-1 relative z-20 overflow-hidden h-full pb-8">
        <DataGrid columns={columns} data={filteredCustomers} isLoading={isLoading} />
      </div>

      <CustomerFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        customer={editingCustomer} 
      />
    </div>
  );
};
