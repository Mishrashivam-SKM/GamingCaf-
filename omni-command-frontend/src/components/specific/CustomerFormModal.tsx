import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Save } from 'lucide-react';
import type { Customer } from '../../types/models';
import { useMutation } from '../../hooks/queries/useMutation';
import { db } from '../../services/db';
import { toast } from 'sonner';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer; // If provided, it's an edit, otherwise create
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ isOpen, onClose, customer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipLevel: 'BRONZE'
  });

  const { mutate: createCustomer, isLoading: isCreating } = useMutation(
    (data: any) => db.create('customers', { ...data, loyaltyPoints: 0, totalSpent: 0, joinedAt: new Date().toISOString() })
  );

  const { mutate: updateCustomer, isLoading: isUpdating } = useMutation(
    (data: any) => db.update('customers', customer!.id, data)
  );

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email || '',
        phone: customer.phone || '',
        membershipLevel: customer.membershipLevel
      });
    } else {
      setFormData({ name: '', email: '', phone: '', membershipLevel: 'BRONZE' });
    }
  }, [customer, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return toast.error('Name is required');

    try {
      if (customer) {
        await updateCustomer(formData);
        toast.success('Customer updated');
      } else {
        await createCustomer(formData);
        toast.success('Customer created');
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save customer');
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
                  <User className="w-5 h-5" />
                </div>
                <h2 className="font-headline-sm text-[18px] text-on-surface m-0">
                  {customer ? 'Edit Customer' : 'New Customer'}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  autoFocus
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. +1 555 0199"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Tier</label>
                <select
                  value={formData.membershipLevel}
                  onChange={e => setFormData({ ...formData, membershipLevel: e.target.value as any })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="BRONZE">BRONZE</option>
                  <option value="SILVER">SILVER</option>
                  <option value="GOLD">GOLD</option>
                  <option value="PLATINUM">PLATINUM</option>
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
