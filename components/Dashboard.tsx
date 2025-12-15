import React, { useState } from 'react';
import { Task, HairStats } from '../types';
import { CheckCircle2, Circle, Droplets, Calendar, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning Scalp Massage', completed: true, category: 'treatment' },
    { id: '2', title: 'Apply Leave-in Conditioner', completed: false, category: 'moisturize' },
    { id: '3', title: 'Drink 2L Water', completed: false, category: 'treatment' },
    { id: '4', title: 'Nightly Protective Style (Bonnet)', completed: false, category: 'protect' },
  ]);

  const stats: HairStats = {
    hairType: '4C',
    porosity: 'High',
    density: 'High',
    lastWashDay: '2023-10-24',
    streak: 12
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">{getGreeting()}, Jane.</h1>
          <p className="text-gray-600">Let's keep your curls flourishing today.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-peach-200 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-peach-500" />
          <span className="font-medium text-gray-700">Current Streak: <span className="text-peach-600 font-bold">{stats.streak} Days</span></span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Hair Type', value: stats.hairType, icon: '🌀' },
          { label: 'Porosity', value: stats.porosity, icon: '💧' },
          { label: 'Density', value: stats.density, icon: '🌳' },
          { label: 'Next Wash', value: 'In 2 Days', icon: '🚿' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-peach-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</p>
            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Today's Routine */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-serif text-gray-800">Today's Ritual</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-peach-200 overflow-hidden">
            <div className="p-6 space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`
                    group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer
                    ${task.completed 
                      ? 'bg-peach-50 border-peach-200' 
                      : 'bg-white border-gray-100 hover:border-peach-300'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center transition-colors
                      ${task.completed ? 'text-peach-500' : 'text-gray-300 group-hover:text-peach-400'}
                    `}>
                      {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </div>
                    <div>
                      <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {task.title}
                      </h3>
                      <span className="text-xs text-gray-400 capitalize bg-gray-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                        {task.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {tasks.every(t => t.completed) && (
              <div className="bg-peach-100 p-4 text-center text-peach-800 font-medium">
                ✨ All tasks completed! Your hair thanks you.
              </div>
            )}
          </div>
        </div>

        {/* Side Panel: Tips & Reminders */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-gray-800">Daily Wisdom</h2>
          
          {/* Updated Gradient: Soft Pink (200) to Primary Mauve (500) */}
          <div className="bg-gradient-to-br from-peach-200 to-peach-500 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>
            <h3 className="font-bold text-lg mb-2 relative z-10 text-gray-900 mix-blend-multiply">Tip of the Day</h3>
            <p className="text-white relative z-10 leading-relaxed drop-shadow-sm font-medium">
              "Moisturizing is key for high porosity hair. Try the LOC method: Liquid, Oil, then Cream to seal in that hydration!"
            </p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-white/30 px-2 py-1 rounded-md text-white font-semibold">Hydration</span>
              <span className="text-xs bg-white/30 px-2 py-1 rounded-md text-white font-semibold">Technique</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-peach-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-400" /> Hydration Tracker
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Target: 2500ml</span>
              <span className="text-sm font-bold text-blue-500">1250ml</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full w-1/2 transition-all duration-500"></div>
            </div>
            <button className="mt-4 w-full py-2 rounded-xl border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
              + Add Water
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;