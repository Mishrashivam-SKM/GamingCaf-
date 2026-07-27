import React from 'react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stationId?: string;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ isOpen, onClose, stationId = "PC-04" }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay for Drawer */}
      <div 
        className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm z-[60] transition-opacity duration-300" 
        onClick={onClose}
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* CHECKOUT DRAWER (Off-canvas, emerging from right) */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-surface-container-lowest/70 backdrop-blur-2xl border-l border-primary/20 shadow-[-10px_0_40px_rgba(0,0,0,0.6),0_0_20px_rgba(77,142,255,0.05)] z-[70] flex flex-col transform transition-transform duration-500 ease-out">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-primary/20 bg-surface-container-lowest/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-full bg-surface-container/50 flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-bright transition-colors cursor-pointer" 
              onClick={onClose}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                Checkout 
                <span className="bg-primary/10 text-primary font-mono-data text-mono-data px-2 py-0.5 rounded-sm border border-primary/20">{stationId}</span>
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  Priya Das
                </p>
                <span className="font-mono-data text-[10px] text-primary/70 tracking-widest uppercase border border-primary/20 px-1.5 py-0.5 rounded bg-primary/5">
                  [BILL_CMD_04]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Line Items Section */}
          <div className="backdrop-blur-sm rounded-xl border border-primary/10 overflow-hidden shadow-inner bg-surface-container-low">
            <div className="px-5 py-4 border-b border-primary/10 bg-surface-container-low/30">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Order Details</h3>
            </div>
            <div className="p-2">
              <div className="flex justify-between items-center px-4 py-3 hover:bg-surface-container-high/50 rounded-lg transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container/50 flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>timer</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-on-surface font-medium">Session (2h 15m)</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Premium Rig</div>
                  </div>
                </div>
                <div className="font-mono-data text-mono-data text-on-surface">₹300</div>
              </div>

              <div className="flex justify-between items-center px-4 py-3 hover:bg-surface-container-high/50 rounded-lg transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container/50 flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>local_cafe</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-on-surface font-medium">Red Bull</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">F&amp;B</div>
                  </div>
                </div>
                <div className="font-mono-data text-mono-data text-on-surface">₹120</div>
              </div>

              <div className="flex justify-between items-center px-4 py-3 hover:bg-surface-container-high/50 rounded-lg transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container/50 flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>lunch_dining</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-on-surface font-medium">Chicken Burger</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">F&amp;B</div>
                  </div>
                </div>
                <div className="font-mono-data text-mono-data text-on-surface">₹180</div>
              </div>
            </div>
          </div>

          {/* Calculation Summary */}
          <div className="backdrop-blur-sm rounded-xl border border-primary/10 p-5 space-y-3 bg-surface-container-low">
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
              <span className="font-mono-data text-mono-data text-on-surface">₹600</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">Tax (18% GST)</span>
              <span className="font-mono-data text-mono-data text-on-surface">₹108</span>
            </div>
            <div className="h-[1px] w-full bg-primary/20 my-2"></div>
            <div className="flex justify-between items-end">
              <span className="font-headline-sm text-headline-sm text-on-surface">Total Due</span>
              <span className="font-display-lg text-display-lg text-primary tracking-tight font-mono-data drop-shadow-[0_0_10px_rgba(77,142,255,0.3)]">₹708</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer (Payment Actions) */}
        <div className="p-8 border-t border-primary/20 bg-surface-container-lowest/60 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Select Payment Method</h4>
            <span className="font-mono-data text-[10px] text-on-surface-variant/50">[AWAITING_INPUT]</span>
          </div>
          <div className="space-y-3">
            <button 
              className="w-full flex items-center justify-between p-4 bg-primary text-on-primary-container rounded-xl hover:bg-primary-container transition-all shadow-[0_0_20px_rgba(77,142,255,0.3)] border border-primary/50 group"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined group-hover:animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                <span className="font-headline-sm text-headline-sm font-semibold">Deposit Wallet</span>
              </div>
              <div className="text-right">
                <div className="font-body-sm text-body-sm opacity-80">Bal: ₹1,240</div>
              </div>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-3 border border-primary/20 rounded-xl hover:bg-surface-bright hover:border-primary/50 hover:shadow-[0_0_15px_rgba(77,142,255,0.15)] transition-all text-on-surface bg-surface-container-low">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>qr_code_scanner</span>
                <span className="font-body-md text-body-md font-medium">UPI/QR</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 border border-primary/20 rounded-xl hover:bg-surface-bright hover:border-primary/50 hover:shadow-[0_0_15px_rgba(77,142,255,0.15)] transition-all text-on-surface bg-surface-container-low">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>payments</span>
                <span className="font-body-md text-body-md font-medium">Cash</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
