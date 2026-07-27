import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Save } from 'lucide-react';
import type { Product } from '../../types/models';
import { useMutation } from '../../hooks/queries/useMutation';
import { db } from '../../services/db';
import { toast } from 'sonner';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stockCount: 0,
    category: 'SNACKS'
  });

  const { mutate: createProduct, isLoading: isCreating } = useMutation(
    (data: any) => db.create('products', data)
  );

  const { mutate: updateProduct, isLoading: isUpdating } = useMutation(
    (data: any) => db.update('products', product!.id, data)
  );

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stockCount: product.stockCount,
        category: product.category
      });
    } else {
      setFormData({ name: '', price: 0, stockCount: 0, category: 'SNACKS' });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return toast.error('Name is required');

    try {
      if (product) {
        await updateProduct(formData);
        toast.success('Item updated');
      } else {
        await createProduct(formData);
        toast.success('Item added');
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save item');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#05070a]/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-container w-full max-w-md rounded-2xl border border-white/10 shadow-premium-soft overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container-low/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="font-headline-sm text-[18px] text-on-surface m-0">
                  {product ? 'Edit Item' : 'New Item'}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Item Name</label>
                <input
                  autoFocus
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. Red Bull"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Stock</label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={e => setFormData({ ...formData, stockCount: parseInt(e.target.value) })}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="SNACKS">SNACKS</option>
                  <option value="BEVERAGES">BEVERAGES</option>
                  <option value="PASSES">PASSES</option>
                  <option value="MERCHANDISE">MERCHANDISE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition-colors font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md flex items-center gap-2"
                >
                  {(isCreating || isUpdating) ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
