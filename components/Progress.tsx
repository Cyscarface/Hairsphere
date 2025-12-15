import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const Progress: React.FC = () => {
  const lengthData = [
    { month: 'Jan', length: 12.0 },
    { month: 'Feb', length: 12.4 },
    { month: 'Mar', length: 12.9 },
    { month: 'Apr', length: 13.2 },
    { month: 'May', length: 13.8 },
    { month: 'Jun', length: 14.2 },
  ];

  const hydrationData = [
    { day: 'Mon', level: 6 },
    { day: 'Tue', level: 7 },
    { day: 'Wed', level: 5 },
    { day: 'Thu', level: 8 },
    { day: 'Fri', level: 9 },
    { day: 'Sat', level: 9 },
    { day: 'Sun', level: 8 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Your Journey</h1>
        <p className="text-gray-500">Track your growth and health metrics over time.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Length Chart */}
        <div className="bg-white p-6 rounded-3xl border border-peach-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex justify-between items-center">
            Hair Length Growth
            <span className="text-sm font-normal text-green-500 bg-green-50 px-2 py-1 rounded-lg">+2.2 inches</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lengthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="length" 
                  stroke="#fac8b4" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#ed4f1c', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hydration Chart */}
        <div className="bg-white p-6 rounded-3xl border border-peach-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Weekly Hydration Consistency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hydrationData}>
                <defs>
                  <linearGradient id="colorHydration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHydration)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gallery Placeholder */}
      <div className="bg-white p-6 rounded-3xl border border-peach-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Growth Journal</h3>
            <button className="text-peach-600 font-medium hover:text-peach-700 text-sm">View All Photos</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group cursor-pointer">
                    <img src={`https://picsum.photos/300/300?random=${i}`} alt="Progress" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                        Month {i}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
