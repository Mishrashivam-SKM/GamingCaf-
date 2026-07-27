import React, { useState, useMemo } from 'react';
import { DataGrid, type Column } from '../../components/common/DataGrid';
import { KPIPill } from '../../components/common/KPIPill';
import { PremiumInput } from '../../components/common/PremiumInput';
import { useProducts } from '../../hooks/queries/useProducts';
import type { Product } from '../../types/models';
import { ProductFormModal } from '../../components/specific/ProductFormModal';

export const Inventory: React.FC = () => {
  const { data: products, isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery) return products;
    const lower = searchQuery.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lower) || p.id.toLowerCase().includes(lower));
  }, [products, searchQuery]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const columns: Column<Product>[] = [
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
        <span className="font-mono-data text-on-surface">{row.stockCount}</span>
      )
    },
    {
      header: 'STATUS',
      accessor: (row) => {
        let status = 'In Stock';
        let colorClass = 'bg-green-500';
        
        if (row.stockCount === 0) {
          status = 'Out of Stock';
          colorClass = 'bg-red-500';
        } else if (row.stockCount < 10) {
          status = 'Low Stock';
          colorClass = 'bg-orange-500';
        }
        
        return (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${colorClass} ${status !== 'Out of Stock' ? 'animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}`}></div>
            <span className="text-xs text-on-surface-variant">{status}</span>
          </div>
        );
      }
    },
    { 
      header: 'PRICE', 
      accessor: (row) => <span className="font-mono-data text-on-surface">${row.price.toFixed(2)}</span> 
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

  const { totalItems, lowStock } = useMemo(() => {
    if (!products) return { totalItems: 0, lowStock: 0 };
    return {
      totalItems: products.length,
      lowStock: products.filter(p => p.stockCount > 0 && p.stockCount < 10).length
    };
  }, [products]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)]">
      <div className="flex justify-between items-end mb-8 relative z-20 shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">Inventory Control</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Manage cafe stock, hardware replacements, and pricing.</p>
        </div>
        <div className="flex gap-4">
          <KPIPill label="Total Items" value={totalItems.toString()} valueColorClass="text-on-surface" />
          <KPIPill label="Low Stock" value={lowStock.toString()} valueColorClass="text-orange-500" />
          <button 
            onClick={handleNew}
            className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            ADD ITEM
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6 shrink-0 relative z-20">
        <div className="flex-1 max-w-md">
           <PremiumInput 
            icon="search" 
            placeholder="Search inventory..." 
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
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <DataGrid columns={columns} data={filteredProducts} />
        )}
      </div>

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct} 
      />
    </div>
  );
};
