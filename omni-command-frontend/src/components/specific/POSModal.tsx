import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ShoppingCart, X, Search, Plus, Minus, Trash2, Zap, CheckCircle2, CreditCard, Tag, Coffee, Pizza, Package } from 'lucide-react';
import { useProducts } from '../../hooks/queries/useProducts';
import type { Product, ProductCategory } from '../../types/models';
import { db } from '../../services/db';

interface POSModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId?: string;
}

interface CartItem extends Product {
  cartQuantity: number;
}

export const POSModal: React.FC<POSModalProps> = ({ isOpen, onClose, stationId = "GLOBAL" }) => {
  const { data: products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const categories: { id: ProductCategory | 'ALL', label: string, icon: any }[] = [
    { id: 'ALL', label: 'All Items', icon: Package },
    { id: 'BEVERAGES', label: 'Beverages', icon: Coffee },
    { id: 'SNACKS', label: 'Snacks', icon: Pizza },
    { id: 'PASSES', label: 'Passes', icon: Tag },
    { id: 'MERCHANDISE', label: 'Merchandise', icon: ShoppingCart },
  ];

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => {
      const matchCat = activeCategory === 'ALL' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.cartQuantity >= product.stockCount) {
          toast.error('Not enough stock!');
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item);
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQ = item.cartQuantity + delta;
        if (newQ > item.stockCount) {
          toast.error('Not enough stock!');
          return item;
        }
        return { ...item, cartQuantity: Math.max(1, newQ) };
      }
      return item;
    }));
  };

  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
    const taxAmt = sub * 0.08; // 8% mock tax
    return { subtotal: sub, tax: taxAmt, total: sub + taxAmt };
  }, [cart]);

  const handleCheckout = async (method: 'CASH' | 'CARD' | 'APPEND') => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    
    try {
      const order = {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.cartQuantity,
          unitPrice: item.price,
          totalPrice: item.price * item.cartQuantity
        })),
        subtotal,
        tax,
        discount: 0,
        total,
        paymentMethod: method === 'APPEND' ? undefined : method,
        status: method === 'APPEND' ? 'PENDING' : 'COMPLETED',
        createdAt: new Date().toISOString()
      };
      
      await db.create('orders', order);
      
      toast.success(method === 'APPEND' ? `Appended to ${stationId}` : `Payment successful via ${method}`);
      setCart([]);
      onClose();
    } catch (e) {
      console.error(e);
      toast.error('Failed to process transaction');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#05070a]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-8" 
            onClick={onClose}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-container w-full max-w-6xl h-[80vh] rounded-3xl border border-white/10 shadow-premium-soft flex flex-col overflow-hidden relative z-[70]"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="h-[72px] shrink-0 border-b border-white/5 flex items-center justify-between px-6 bg-surface-container-low/50 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-glow-primary">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-[20px] font-bold text-on-surface m-0 leading-tight">Point of Sale</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider m-0">Target</span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono-data bg-primary/20 text-primary border border-primary/30 shadow-glow-primary/20">{stationId}</span>
                    </div>
                  </div>
                </div>
                <button 
                  aria-label="Close Modal" 
                  className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-on-surface-variant transition-colors" 
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col border-r border-white/5">
                  <div className="h-20 shrink-0 border-b border-white/5 px-6 flex items-center gap-3 overflow-x-auto scrollbar-hide bg-surface-container-low/30">
                    {categories.map(cat => {
                      const Icon = cat.icon;
                      const isActive = activeCategory === cat.id;
                      return (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`relative px-4 py-2.5 rounded-xl font-label-md text-[13px] uppercase tracking-wider transition-all flex items-center gap-2 border overflow-hidden ${
                            isActive 
                              ? 'text-primary border-primary/30 shadow-glow-primary/20' 
                              : 'text-on-surface-variant hover:text-on-surface border-transparent hover:bg-white/5'
                          }`}
                        >
                          {isActive && (
                            <motion.div 
                              layoutId="activeCategoryPOS"
                              className="absolute inset-0 bg-primary/10"
                            />
                          )}
                          <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                          <span className="relative z-10">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 bg-background/50">
                    <div className="mb-6 flex gap-4">
                      <div className="relative flex-1 group">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                        <input 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-surface-container-low border border-white/5 text-on-surface font-body-md rounded-xl pl-12 pr-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-on-surface-variant/50 shadow-inner" 
                          placeholder="Search products..." 
                          type="text"
                        />
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="flex items-center justify-center h-40">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredProducts.map(product => {
                          const cartItem = cart.find(item => item.id === product.id);
                          const isOutOfStock = product.stockCount === 0;

                          return (
                            <motion.div 
                              key={product.id}
                              whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
                              className={`rounded-2xl border p-4 flex flex-col justify-between transition-colors relative overflow-hidden ${
                                cartItem ? 'bg-primary/5 border-primary/30 shadow-glow-primary/20' : 
                                isOutOfStock ? 'bg-surface-container-low border-white/5 opacity-50 grayscale' :
                                'bg-surface-container-high border-white/5 hover:bg-surface-bright'
                              }`}
                            >
                              {cartItem && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}
                              
                              <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-headline-sm text-[18px] text-on-surface m-0">{product.name}</h3>
                                    {isOutOfStock && (
                                      <span className="px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px] font-label-md bg-error/10 text-error border border-error/20 uppercase tracking-widest leading-none">
                                        Empty
                                      </span>
                                    )}
                                  </div>
                                  <p className="font-body-sm text-[13px] text-on-surface-variant m-0">{product.category}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden ${cartItem ? 'bg-primary/10 border-primary/20' : 'bg-surface-container border-white/5'}`}>
                                  {product.category === 'BEVERAGES' ? <Coffee className={`w-6 h-6 ${cartItem ? 'text-primary' : 'text-on-surface-variant'}`} /> : 
                                   product.category === 'SNACKS' ? <Pizza className={`w-6 h-6 ${cartItem ? 'text-primary' : 'text-on-surface-variant'}`} /> :
                                   product.category === 'PASSES' ? <Tag className={`w-6 h-6 ${cartItem ? 'text-primary' : 'text-on-surface-variant'}`} /> :
                                   <Zap className={`w-6 h-6 ${cartItem ? 'text-primary' : 'text-on-surface-variant'}`} />}
                                </div>
                              </div>
                              <div className="flex items-center justify-between relative z-10">
                                <span className="font-mono-data text-[18px] font-bold text-on-surface m-0">${product.price.toFixed(2)}</span>
                                {cartItem ? (
                                  <div className="flex items-center gap-1 bg-surface-container rounded-full border border-primary/20 p-1">
                                    <button 
                                      onClick={() => cartItem.cartQuantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
                                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-mono-data text-body-md w-6 text-center font-bold">{cartItem.cartQuantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(product.id, 1)}
                                      className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:text-primary-container hover:bg-primary/20 transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => addToCart(product)}
                                    disabled={isOutOfStock}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOutOfStock ? 'bg-surface-container text-outline border border-white/5 cursor-not-allowed' : 'bg-surface-container hover:bg-primary hover:text-on-primary-container text-on-surface border border-white/5 hover:shadow-glow-primary'}`}
                                  >
                                    <Plus className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-[360px] shrink-0 bg-surface-container-low/50 backdrop-blur-xl flex flex-col">
                  <div className="h-[72px] shrink-0 border-b border-white/5 px-6 flex items-center justify-between bg-surface-container/50">
                    <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider m-0 flex items-center gap-2">
                      Current Order
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-mono-data text-xs font-bold">
                      {cart.reduce((a, b) => a + b.cartQuantity, 0)} Items
                    </span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant opacity-50">
                        <ShoppingCart className="w-12 h-12 mb-4" />
                        <p>Cart is empty</p>
                      </div>
                    ) : (
                      cart.map(item => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={item.id} 
                          className="bg-surface-container rounded-xl p-3 border border-white/5 group hover:border-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-body-md text-[15px] text-on-surface font-medium">{item.name}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-on-surface-variant/50 hover:text-error transition-colors p-1 rounded-md hover:bg-error/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-body-sm text-[13px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                {item.cartQuantity} × ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <span className="font-mono-data text-[16px] text-on-surface font-bold">
                              ${(item.cartQuantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  <div className="p-6 bg-surface-container border-t border-white/5 mt-auto rounded-tl-3xl shadow-[-10px_-10px_30px_rgba(0,0,0,0.2)]">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-body-md text-on-surface-variant">Subtotal</span>
                      <span className="font-mono-data text-on-surface font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-body-md text-on-surface-variant">Tax (8%)</span>
                      <span className="font-mono-data text-on-surface font-bold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end mb-6 pt-4 border-t border-white/5">
                      <span className="font-headline-sm text-[20px] text-on-surface m-0">Total</span>
                      <span className="font-mono-data text-[32px] leading-none text-primary font-black drop-shadow-[0_0_8px_rgba(77,142,255,0.4)]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {stationId !== "GLOBAL" && (
                        <button 
                          disabled={cart.length === 0 || isProcessing}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-label-md text-[14px] uppercase tracking-wider hover:opacity-90 transition-all shadow-glow-primary flex justify-center items-center gap-2 border border-primary/50 group disabled:opacity-50 disabled:grayscale" 
                          onClick={() => handleCheckout('APPEND')}
                        >
                          {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                          Append to Session
                        </button>
                      )}
                      <button 
                        disabled={cart.length === 0 || isProcessing}
                        className="w-full py-3 rounded-xl bg-surface-container-high border border-white/10 text-on-surface font-label-md text-[13px] uppercase tracking-wider hover:bg-surface-bright hover:border-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50" 
                        onClick={() => handleCheckout('CARD')}
                      >
                        {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <CreditCard className="w-4 h-4 text-on-surface-variant" />}
                        Pay Now (Cash/Card)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
