import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarPlus, Save } from 'lucide-react';
import { useMutation } from '../../hooks/queries/useMutation';
import { useStations } from '../../hooks/queries/useStations';
import { db } from '../../services/db';
import { toast } from 'sonner';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingFormModal: React.FC<BookingFormModalProps> = ({ isOpen, onClose }) => {
  const { data: stations } = useStations();
  const [formData, setFormData] = useState({
    customerName: '',
    stationId: '',
    startTime: '', // H:mm format for simplicity
    endTime: '',
    source: 'IN_PERSON'
  });

  const { mutate: createBooking, isLoading: isCreating } = useMutation(
    (data: any) => db.create('bookings', data)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.stationId || !formData.startTime || !formData.endTime) {
      return toast.error('All fields are required');
    }

    try {
      // Mock converting simple time string to today's ISO
      const today = new Date();
      const [sh, sm] = formData.startTime.split(':');
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(sh), parseInt(sm)).toISOString();
      const [eh, em] = formData.endTime.split(':');
      const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(eh), parseInt(em)).toISOString();

      await createBooking({
        customerName: formData.customerName,
        customerId: 'cust-walkin',
        stationId: formData.stationId,
        startTime: start,
        endTime: end,
        source: formData.source,
        status: 'CONFIRMED'
      });
      toast.success('Booking created');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save booking');
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
                  <CalendarPlus className="w-5 h-5" />
                </div>
                <h2 className="font-headline-sm text-[18px] text-on-surface m-0">
                  New Booking
                </h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Player Name</label>
                <input
                  autoFocus
                  type="text"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="e.g. Aditi Rao"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Station</label>
                <select
                  value={formData.stationId}
                  onChange={e => setFormData({ ...formData, stationId: e.target.value })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select Station...</option>
                  {stations?.map(st => (
                    <option key={st.id} value={st.id}>{st.name} ({st.type})</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Start Time (HH:mm)</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">End Time (HH:mm)</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-1.5">Source</label>
                <select
                  value={formData.source}
                  onChange={e => setFormData({ ...formData, source: e.target.value as any })}
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                >
                  <option value="IN_PERSON">IN_PERSON</option>
                  <option value="WHATSAPP">WHATSAPP</option>
                  <option value="WEBSITE">WEBSITE</option>
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
                  disabled={isCreating}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md flex items-center gap-2"
                >
                  {isCreating ? (
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
