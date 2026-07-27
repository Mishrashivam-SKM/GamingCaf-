import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { X, User, Timer, Coffee, Utensils, Wallet, QrCode, Banknote } from 'lucide-react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stationId?: string;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ isOpen, onClose, stationId = "PC-04" }) => {
  const handlePayment = (method: string) => {
    toast.success(`Payment successful via ${method}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay for Drawer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm z-[60]" 
            onClick={onClose}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* CHECKOUT DRAWER (Off-canvas, emerging from right) */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-surface-container-lowest/70 backdrop-blur-2xl border-l border-primary/20 shadow-[-10px_0_40px_rgba(0,0,0,0.6),0_0_20px_rgba(77,142,255,0.05)] z-[70] flex flex-col"
          >
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-primary/20 bg-surface-container-lowest/40 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <button 
                  className="w-10 h-10 rounded-full bg-surface-container/50 flex items-center justify-center border border-outline-variant/30 text-on-surface-variant hover:bg-surface-bright hover:text-on-surface transition-colors cursor-pointer" 
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2 m-0">
                    Checkout 
                    <span className="bg-primary/10 text-primary font-mono-data text-mono-data px-2 py-0.5 rounded-sm border border-primary/20 shadow-glow-primary/20">{stationId}</span>
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 m-0">
                      <User className="w-4 h-4 text-primary" />
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
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-hide">
              {/* Line Items Section */}
              <div className="backdrop-blur-sm rounded-2xl border border-primary/10 overflow-hidden shadow-inner bg-surface-container-low">
                <div className="px-5 py-4 border-b border-primary/10 bg-surface-container-low/30">
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider m-0">Order Details</h3>
                </div>
                <div className="p-2">
                  <div className="flex justify-between items-center px-4 py-3 hover:bg-surface-container-high/50 rounded-xl transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:shadow-glow-primary transition-all">
                        <Timer className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-body-md text-body-md text-on-surface font-medium">Session (2h 15m)</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Premium Rig</div>
                      </div>
                    </div>
                    <div className="font-mono-data text-mono-data text-on-surface">₹300</div>
                  </div>

                  <div className="flex justify-between items-center px-4 py-3 hover:bg-surface-container-high/50 rounded-xl transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-tertiary group-hover:bg-tertiary/10 group-hover:shadow-glow-orange transition-all">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-body-md text-body-md text-on-surface font-medium">Red Bull</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">F&amp;B</div>
                      </div>
                    </div>
                    <div className="font-mono-data text-mono-data text-on-surface">₹120</div>
                  </div>

                  <div className="flex justify-between items-center px-4 py-3 hover:bg-surface-container-high/50 rounded-xl transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container/50 flex items-center justify-center text-tertiary group-hover:bg-tertiary/10 group-hover:shadow-glow-orange transition-all">
                        <Utensils className="w-5 h-5" />
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
              <div className="backdrop-blur-sm rounded-2xl border border-primary/10 p-5 space-y-3 bg-surface-container-low">
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
                  <span className="font-mono-data text-mono-data text-on-surface">₹600</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">Tax (18% GST)</span>
                  <span className="font-mono-data text-mono-data text-on-surface">₹108</span>
                </div>
                <div className="h-[1px] w-full bg-primary/20 my-3"></div>
                <div className="flex justify-between items-end">
                  <span className="font-headline-sm text-[20px] text-on-surface m-0">Total Due</span>
                  <span className="font-display-lg text-[40px] text-primary tracking-tight font-mono-data drop-shadow-[0_0_10px_rgba(77,142,255,0.3)] m-0 leading-none">₹708</span>
                </div>
              </div>
            </div>

            {/* Drawer Footer (Payment Actions) */}
            <div className="p-8 border-t border-primary/20 bg-surface-container-lowest/60 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider m-0">Select Payment Method</h4>
                <span className="font-mono-data text-[10px] text-on-surface-variant/50 animate-pulse-slow">[AWAITING_INPUT]</span>
              </div>
              <div className="space-y-3">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container rounded-2xl hover:opacity-90 transition-all shadow-glow-primary border border-primary/50 group"
                  onClick={() => handlePayment('Wallet')}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-on-primary-container group-hover:scale-110 transition-transform" />
                    <span className="font-headline-sm text-headline-sm font-semibold m-0">Deposit Wallet</span>
                  </div>
                  <div className="text-right">
                    <div className="font-body-sm text-body-sm font-medium opacity-90 m-0">Bal: ₹1,240</div>
                  </div>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handlePayment('UPI')}
                    className="flex items-center justify-center gap-2 p-3 border border-primary/20 rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:shadow-glow-primary transition-all text-on-surface bg-surface-container-low group"
                  >
                    <QrCode className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                    <span className="font-body-md text-body-md font-medium">UPI/QR</span>
                  </button>
                  <button 
                    onClick={() => handlePayment('Cash')}
                    className="flex items-center justify-center gap-2 p-3 border border-primary/20 rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:shadow-glow-primary transition-all text-on-surface bg-surface-container-low group"
                  >
                    <Banknote className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                    <span className="font-body-md text-body-md font-medium">Cash</span>
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
