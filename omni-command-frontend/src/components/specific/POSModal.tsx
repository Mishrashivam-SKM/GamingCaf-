import React, { useState } from 'react';

interface POSModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId?: string;
}

export const POSModal: React.FC<POSModalProps> = ({ isOpen, onClose, stationId = "PC-07" }) => {
  const [activeCategory, setActiveCategory] = useState('Energy Drinks');

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-[#0B0D10]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
        
        {/* POS Modal Container */}
        <div 
          className="bg-[#1B1F26] w-full max-w-6xl h-[80vh] rounded-xl border border-white/5 shadow-2xl flex flex-col overflow-hidden relative z-[70]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <header className="h-[72px] shrink-0 border-b border-white/5 flex items-center justify-between px-6 bg-surface-container-low">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface m-0 leading-tight">Add Snacks &amp; Drinks</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Station</span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono-data bg-primary/20 text-primary border border-primary/30">{stationId}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant ml-2">Current Session: 02:14:30 remaining</span>
                </div>
              </div>
            </div>
            <button 
              aria-label="Close Modal" 
              className="w-10 h-10 rounded hover:bg-white/5 flex items-center justify-center text-on-surface-variant transition-colors" 
              onClick={onClose}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          {/* Modal Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content Area (Categories & Items) */}
            <div className="flex-1 flex flex-col border-r border-white/5">
              
              {/* Categories Tabs */}
              <div className="h-16 shrink-0 border-b border-white/5 px-6 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {[
                  { name: 'Chinese Cuisine', icon: 'restaurant' },
                  { name: 'Pizzas', icon: 'local_pizza' },
                  { name: 'Burgers', icon: 'lunch_dining' },
                  { name: 'Energy Drinks', icon: 'bolt', active: true },
                  { name: 'Hot Beverages', icon: 'local_cafe' }
                ].map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-4 py-2 rounded-lg font-body-sm text-body-sm transition-colors flex items-center gap-2 border ${
                      activeCategory === cat.name 
                        ? 'text-primary bg-primary/10 border-primary/20' 
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeCategory === cat.name ? "'FILL' 1" : "'FILL' 0" }}>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="flex-1 overflow-y-auto p-6 bg-background">
                {/* Search/Filter Bar */}
                <div className="mb-6 flex gap-4">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                    <input 
                      className="w-full bg-[#1B1F26] border border-white/5 text-on-surface font-body-sm rounded-lg pl-10 pr-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50" 
                      placeholder={`Search ${activeCategory}...`} 
                      type="text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Item Card: Red Bull */}
                  <div className="bg-[#15181D] rounded-lg border border-white/5 p-4 flex flex-col justify-between hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface m-0 mb-1">Red Bull</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant m-0">250ml Can</p>
                      </div>
                      <div className="w-12 h-12 bg-surface-container-low rounded border border-white/5 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-outline-variant">bolt</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-body-lg text-on-surface m-0">₹120</span>
                      <button className="w-8 h-8 rounded bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface border border-white/5 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Item Card: Sting (Selected) */}
                  <div className="bg-primary/5 rounded-lg border border-primary/30 p-4 flex flex-col justify-between hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface m-0 mb-1">Sting</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant m-0">250ml PET</p>
                      </div>
                      <div className="w-12 h-12 bg-surface-container-low rounded border border-white/5 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-outline-variant text-primary/70">bolt</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-body-lg text-on-surface m-0">₹50</span>
                      <div className="flex items-center gap-2 bg-surface-container-low rounded border border-white/5">
                        <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="font-mono-data text-body-sm w-4 text-center">2</span>
                        <button className="w-8 h-8 flex items-center justify-center text-primary hover:text-primary-container transition-colors">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Card: Gatorade (Out of stock) */}
                  <div className="bg-[#15181D] rounded-lg border border-white/5 p-4 flex flex-col justify-between opacity-50 pointer-events-none">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface m-0">Gatorade</h3>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-label-md bg-error/10 text-error border border-error/20 uppercase tracking-widest leading-none">Out of Stock</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant m-0">500ml Blue Bolt</p>
                      </div>
                      <div className="w-12 h-12 bg-surface-container-low rounded border border-white/5 flex items-center justify-center overflow-hidden grayscale">
                        <span className="material-symbols-outlined text-outline">water_drop</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-data text-body-lg text-on-surface-variant m-0">₹80</span>
                      <button className="w-8 h-8 rounded bg-surface-container-low text-outline border border-white/5 flex items-center justify-center cursor-not-allowed">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Quick Add Bill */}
            <div className="w-[320px] shrink-0 bg-surface-container-low flex flex-col">
              <div className="h-[72px] shrink-0 border-b border-white/5 px-6 flex items-center justify-between bg-[#1B1F26]">
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider m-0">Current Order</h3>
                <span className="px-2 py-1 rounded bg-surface border border-white/5 font-mono-data text-xs text-on-surface-variant">2 Items</span>
              </div>
              
              {/* Bill Items */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {/* Bill Item 1 */}
                <div className="bg-[#15181D] rounded p-3 border border-white/5 group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Sting (250ml)</span>
                    <button className="text-outline-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">2 × ₹50</span>
                    </div>
                    <span className="font-mono-data text-body-sm text-on-surface font-medium">₹100</span>
                  </div>
                </div>
              </div>

              {/* Bill Summary & Actions */}
              <div className="p-6 bg-[#1B1F26] border-t border-white/5 mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Subtotal</span>
                  <span className="font-mono-data text-body-sm text-on-surface">₹100</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Tax (5%)</span>
                  <span className="font-mono-data text-body-sm text-on-surface">₹5</span>
                </div>
                <div className="flex justify-between items-end mb-6 pt-4 border-t border-white/5">
                  <span className="font-headline-sm text-headline-sm text-on-surface">Total</span>
                  <span className="font-mono-data text-headline-md text-primary font-bold">₹105</span>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    className="w-full py-3 rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors flex justify-center items-center gap-2" 
                    onClick={onClose}
                  >
                    <span className="material-symbols-outlined text-[18px]">add_task</span>
                    Append to Session
                  </button>
                  <button 
                    className="w-full py-2.5 rounded bg-transparent border border-white/5 text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-bright transition-colors" 
                    onClick={onClose}
                  >
                    Pay Now (Cash/Card)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
