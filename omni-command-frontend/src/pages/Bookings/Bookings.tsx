import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBookings } from '../../hooks/queries/useBookings';

import { BookingFormModal } from '../../components/specific/BookingFormModal';

export const Bookings: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { data: bookings, isLoading } = useBookings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCheckout = (id: string) => {
    setSearchParams({ checkout: id });
  };

  const openPOS = (id: string) => {
    setSearchParams({ pos: id });
  };

  const upcomingBookings = bookings?.filter(b => b.status !== 'CANCELLED') || [];

  return (
    <div className="flex flex-col gap-8 relative z-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface shadow-sm m-0">Reservations Board</h1>
          <p className="font-body-md text-on-surface-variant m-0 mt-1">Live station allocation and upcoming session management for Zone Alpha.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high/80 backdrop-blur-md border border-outline-variant/30 rounded-lg font-label-md text-on-surface hover:bg-surface-bright transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-primary/90 text-on-primary font-label-md rounded-lg hover:opacity-100 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.4)]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Booking
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timeline Board (Large Column) */}
        <div className="col-span-1 lg:col-span-8 bg-surface-container-low/80 backdrop-blur-md border border-outline-variant/20 rounded-xl overflow-hidden flex flex-col shadow-lg">
          <div className="p-4 bg-surface-container-high/50 border-b border-outline-variant/20 flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm m-0">Occupancy Timeline</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span className="font-label-md text-on-surface-variant text-[10px]">WHATSAPP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                <span className="font-label-md text-on-surface-variant text-[10px]">WEBSITE</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="min-w-full relative grid" style={{ gridTemplateColumns: '100px repeat(4, minmax(180px, 1fr))' }}>
              
              {/* Time Headers */}
              <div className="h-10 border-b border-outline-variant/20 bg-surface-container-low/90 backdrop-blur-md flex items-center justify-center font-mono-data text-[10px] text-on-surface-variant sticky left-0 z-20">STATION</div>
              <div className="h-10 border-b border-l border-outline-variant/20 bg-surface-container-low/50 flex items-center px-2 font-mono-data text-[10px] text-on-surface-variant">14:00</div>
              <div className="h-10 border-b border-l border-outline-variant/20 bg-surface-container-low/50 flex items-center px-2 font-mono-data text-[10px] text-on-surface-variant">15:00</div>
              <div className="h-10 border-b border-l border-outline-variant/20 bg-surface-container-low/50 flex items-center px-2 font-mono-data text-[10px] text-on-surface-variant">16:00</div>
              <div className="h-10 border-b border-l border-outline-variant/20 bg-surface-container-low/50 flex items-center px-2 font-mono-data text-[10px] text-on-surface-variant">17:00</div>
              
              {/* PC-01 */}
              <div className="h-16 border-b border-outline-variant/20 bg-surface-container-low/90 backdrop-blur-md flex items-center justify-center font-mono-data text-body-sm text-on-surface sticky left-0 z-10 border-r">PC-01</div>
              <div 
                className="h-16 border-b border-outline-variant/20 relative col-span-4" 
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
                  backgroundSize: '25% 100%'
                }}
              >
                <div 
                  className="absolute top-2 left-[25%] w-[50%] h-12 rounded-r-lg p-2 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors border-l-4 border-[#3b82f6] shadow-[-2px_0_10px_rgba(59,130,246,0.5)] bg-white/5 backdrop-blur-md"
                  onClick={() => openCheckout('PC-01')}
                >
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>
                    <p className="font-label-md text-on-surface truncate m-0">Alex Mercer</p>
                  </div>
                  <p className="font-mono-data text-[10px] text-on-surface-variant m-0 mt-0.5">15:00 - 17:00 • CONFIRMED</p>
                </div>
              </div>

              {/* PS5-01 (st-05) */}
              <div className="h-16 border-b border-outline-variant/20 bg-surface-container-low/90 backdrop-blur-md flex items-center justify-center font-mono-data text-body-sm text-on-surface sticky left-0 z-10 border-r">PS5-01</div>
              <div 
                className="h-16 border-b border-outline-variant/20 relative col-span-4" 
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
                  backgroundSize: '25% 100%'
                }}
              >
                <div 
                  className="absolute top-2 left-0 w-[50%] h-12 rounded-r-lg p-2 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors border-l-4 border-[#10b981] shadow-[-2px_0_10px_rgba(16,185,129,0.5)] bg-white/5 backdrop-blur-md"
                  onClick={() => openPOS('PS5-01')}
                >
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    <p className="font-label-md text-on-surface truncate m-0">Sarah Connor</p>
                  </div>
                  <p className="font-mono-data text-[10px] text-on-surface-variant m-0 mt-0.5">14:00 - 16:00 • PENDING</p>
                </div>
              </div>

              {/* PC-03 */}
              <div className="h-16 border-b border-outline-variant/20 bg-surface-container-low/90 backdrop-blur-md flex items-center justify-center font-mono-data text-body-sm text-on-surface sticky left-0 z-10 border-r">PC-03</div>
              <div className="h-16 border-b border-outline-variant/20 relative col-span-4" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '25% 100%' }}></div>

            </div>
          </div>
        </div>

        {/* Upcoming List (Side Column) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/20 shadow-md">
              <p className="font-label-md text-on-surface-variant uppercase m-0">Total Bookings</p>
              <h4 className="font-display-lg text-headline-lg mt-1 text-primary m-0">{upcomingBookings.length}</h4>
              <div className="mt-2 flex items-center gap-1 text-[#10b981]">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span className="font-label-md text-[10px]">+12% vs last week</span>
              </div>
            </div>
            
            <div className="bg-surface-container/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/20 shadow-md">
              <p className="font-label-md text-on-surface-variant uppercase m-0">Projected Rev</p>
              <h4 className="font-display-lg text-headline-lg mt-1 text-primary m-0">$45.00</h4>
              <div className="mt-2 flex items-center gap-1 text-[#10b981]">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span className="font-label-md text-[10px]">Goal on track</span>
              </div>
            </div>
          </div>

          {/* Recent Reservations Card */}
          <div className="bg-surface-container-low/80 backdrop-blur-md border border-outline-variant/20 rounded-xl overflow-hidden flex flex-col shadow-lg">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/30">
              <h3 className="font-label-md text-on-surface font-bold uppercase tracking-widest m-0">Upcoming Today</h3>
              <button className="text-primary font-label-md hover:underline">View All</button>
            </div>
            <div className="p-2 flex flex-col gap-1">
              
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : upcomingBookings.map(booking => {
                const isWhatsapp = booking.source === 'WHATSAPP';
                const sourceColor = isWhatsapp ? '#10b981' : '#3b82f6';
                
                const start = new Date(booking.startTime);
                const end = new Date(booking.endTime);
                
                return (
                  <div key={booking.id} className="p-3 bg-surface-container-highest/50 rounded-lg flex items-center gap-4 group cursor-pointer hover:bg-surface-bright/80 transition-all border border-transparent hover:border-outline-variant/30">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface flex items-center justify-center font-bold text-on-surface border border-outline-variant/20">
                      {booking.customerName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-body-md text-on-surface truncate m-0">{booking.customerName}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border`} style={{ color: sourceColor, backgroundColor: `${sourceColor}20`, borderColor: `${sourceColor}40` }}>
                          {booking.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono-data text-[12px] text-on-surface-variant">
                          {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span className="font-mono-data text-[12px] text-primary">{booking.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>

      <BookingFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
