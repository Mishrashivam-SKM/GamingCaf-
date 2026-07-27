import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Zap, Users, ShoppingCart, UserPlus, CreditCard, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const DashboardWidgets: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col gap-6 w-full xl:w-[340px] shrink-0 relative z-20">
      
      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-surface-container-low rounded-2xl border border-white/5 p-5 shadow-premium-soft"
      >
        <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider m-0 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setSearchParams(prev => { prev.set('pos', 'GLOBAL'); return prev; })}
            className="flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-primary/10 border border-white/5 hover:border-primary/30 p-4 rounded-xl transition-all text-on-surface hover:text-primary group shadow-sm"
          >
            <ShoppingCart className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="font-label-md text-[13px]">POS</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-primary/10 border border-white/5 hover:border-primary/30 p-4 rounded-xl transition-all text-on-surface hover:text-primary group shadow-sm">
            <UserPlus className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="font-label-md text-[13px]">New Member</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-primary/10 border border-white/5 hover:border-primary/30 p-4 rounded-xl transition-all text-on-surface hover:text-primary group shadow-sm">
            <Clock className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="font-label-md text-[13px]">Add Time</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 bg-surface-container hover:bg-primary/10 border border-white/5 hover:border-primary/30 p-4 rounded-xl transition-all text-on-surface hover:text-primary group shadow-sm">
            <CreditCard className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
            <span className="font-label-md text-[13px]">Recharge</span>
          </button>
        </div>
      </motion.div>

      {/* Live Occupancy */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-2xl border border-white/10 p-6 shadow-premium-soft relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>
        <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider m-0 mb-6 flex items-center gap-2 relative z-10">
          <Users className="w-4 h-4" /> Live Occupancy
        </h3>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="font-display-md text-[48px] leading-none text-on-surface font-bold tracking-tight">
              72<span className="text-[24px] text-on-surface-variant">%</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-1 m-0">Peak Hours Approaching</p>
          </div>
          
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-surface-container-highest fill-none" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="40" 
                className="stroke-primary fill-none drop-shadow-[0_0_8px_rgba(77,142,255,0.5)]" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * 0.72)} 
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-container-low rounded-2xl border border-white/5 p-5 shadow-premium-soft flex-1"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider m-0 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-tertiary" /> Top Gamers
          </h3>
          <button className="text-[12px] font-label-sm text-primary hover:text-primary-container flex items-center">
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { name: 'AlexTheGreat', score: '24 hrs', rank: 1 },
            { name: 'ShadowNinja', score: '18 hrs', rank: 2 },
            { name: 'CyberPunk99', score: '15 hrs', rank: 3 },
            { name: 'ProGamer_X', score: '12 hrs', rank: 4 },
          ].map((user) => (
            <div key={user.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-data text-[14px] font-bold ${
                  user.rank === 1 ? 'bg-tertiary/20 text-tertiary border border-tertiary/30 shadow-glow-orange' : 
                  user.rank === 2 ? 'bg-surface-container-highest text-on-surface-variant' : 
                  user.rank === 3 ? 'bg-orange-900/40 text-orange-400' : 'bg-surface text-on-surface-variant'
                }`}>
                  #{user.rank}
                </div>
                <span className="font-body-md text-[14px] font-medium text-on-surface">{user.name}</span>
              </div>
              <span className="font-mono-data text-[13px] text-primary/80">{user.score}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};
