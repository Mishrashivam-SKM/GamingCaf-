import React from 'react';
import { MatteCard } from '../../components/common/MatteCard';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const revenueData = [
  { name: 'Mon', current: 4000, previous: 2400 },
  { name: 'Tue', current: 3000, previous: 1398 },
  { name: 'Wed', current: 2000, previous: 9800 },
  { name: 'Thu', current: 2780, previous: 3908 },
  { name: 'Fri', current: 1890, previous: 4800 },
  { name: 'Sat', current: 2390, previous: 3800 },
  { name: 'Sun', current: 3490, previous: 4300 },
];

const popularGamesData = [
  { name: 'Valorant', value: 400 },
  { name: 'CS2', value: 300 },
  { name: 'League of Legends', value: 300 },
  { name: 'Apex Legends', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-end mb-8 relative z-20 shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">Executive Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant m-0 mt-1">Revenue breakdowns, occupancy rates, and system performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-on-surface px-4 py-2 rounded-md font-label-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            EXPORT REPORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 z-20 relative">
        <MatteCard>
          <p className="font-mono-data text-primary mb-2 m-0">TODAY'S REVENUE</p>
          <h2 className="font-display-lg text-[40px] text-on-surface m-0">₹12,450</h2>
          <p className="text-green-500 font-label-md text-xs mt-2 m-0">+14% vs last week</p>
        </MatteCard>
        <MatteCard>
          <p className="font-mono-data text-primary mb-2 m-0">AVG OCCUPANCY</p>
          <h2 className="font-display-lg text-[40px] text-on-surface m-0">82%</h2>
          <p className="text-green-500 font-label-md text-xs mt-2 m-0">+5% vs last week</p>
        </MatteCard>
        <MatteCard>
          <p className="font-mono-data text-primary mb-2 m-0">NEW SIGNUPS</p>
          <h2 className="font-display-lg text-[40px] text-on-surface m-0">18</h2>
          <p className="text-on-surface-variant font-label-md text-xs mt-2 m-0">Steady</p>
        </MatteCard>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20 min-h-[400px]">
        <MatteCard className="flex flex-col">
          <h3 className="font-headline-sm text-on-surface mb-6 m-0">Revenue Trend (7 Days)</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="current" name="This Week" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="previous" name="Last Week" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MatteCard>
        <MatteCard className="flex flex-col">
          <h3 className="font-headline-sm text-on-surface mb-6 m-0">Popular Games</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={popularGamesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {popularGamesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </MatteCard>
      </div>
    </div>
  );
};
