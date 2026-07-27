import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PremiumInput } from '../../components/common/PremiumInput';

export const Authentication: React.FC = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'admin' | 'staff'>('admin');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20 data-stream" />
      <div className="absolute inset-0 z-0 grid-bg opacity-40" />
      <div className="scanlines z-50 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1200px] h-[700px] flex rounded-2xl overflow-hidden glass-panel border border-outline-variant/30">
        
        {/* Left Side - Brand & Info */}
        <div className="w-1/2 p-12 flex flex-col justify-between relative overflow-hidden bg-surface-container-low/40">
          <div className="absolute -left-1/4 -top-1/4 w-full h-full bg-primary/10 rounded-full blur-[120px]" />
          
          <div className="relative z-10">
            <h1 className="font-display-lg text-[64px] font-black leading-none mb-4">
              OMNI<br/><span className="text-primary">COMMAND</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Enterprise-grade operations and terminal management for premium gaming facilities.
            </p>
          </div>

          <div className="relative z-10 flex gap-8 border-t border-outline-variant/20 pt-8 mt-12">
            <div>
              <p className="font-mono-data text-mono-data text-primary mb-1">SYSTEM STATUS</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-label-md text-label-md">OPTIMAL</span>
              </div>
            </div>
            <div>
              <p className="font-mono-data text-mono-data text-primary mb-1">NETWORK</p>
              <p className="font-label-md text-label-md text-on-surface">SECURED TLS 1.3</p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-1/2 bg-surface-container/90 backdrop-blur-2xl p-12 flex flex-col justify-center relative border-l border-outline-variant/20">
          
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-scan pointer-events-none" />
                <span className="material-symbols-outlined text-primary text-3xl">fingerprint</span>
              </div>
              <h2 className="font-headline-md text-headline-md font-bold mb-2">System Authorization</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Enter your operator credentials to access the command center.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="flex bg-surface-container-highest rounded-lg p-1 border border-outline-variant/20 relative">
                <button
                  type="button"
                  onClick={() => setAuthMode('admin')}
                  className={`flex-1 py-2 font-label-md text-label-md rounded-md transition-all ${authMode === 'admin' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  ADMINISTRATOR
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('staff')}
                  className={`flex-1 py-2 font-label-md text-label-md rounded-md transition-all ${authMode === 'staff' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  STAFF OPERATOR
                </button>
              </div>

              <div className="space-y-5">
                <PremiumInput
                  label="OPERATOR ID"
                  icon="badge"
                  placeholder="Enter your ID"
                  required
                />
                <PremiumInput
                  label="SECURITY CLEARANCE KEY"
                  icon="lock"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3.5 rounded-md transition-all flex justify-center items-center gap-2 mt-4"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    INITIALIZE SESSION
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <a href="#" className="font-label-md text-[11px] text-primary hover:text-primary-container uppercase tracking-widest transition-colors">
                Request Clearance Reset
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
