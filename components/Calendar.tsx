import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarPlanner: React.FC = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [22, 23, 24, 25, 26, 27, 28];
  
  const schedule = [
    { day: 0, title: 'Deep Condition', type: 'wash' },
    { day: 1, title: 'Moisturize', type: 'moisturize' },
    { day: 2, title: 'Scalp Massage', type: 'treatment' },
    { day: 3, title: 'Moisturize', type: 'moisturize' },
    { day: 4, title: 'Protein Treatment', type: 'wash' },
    { day: 5, title: 'Protective Style', type: 'protect' },
    { day: 6, title: 'Oil Sealing', type: 'style' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wash': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'moisturize': return 'bg-green-100 text-green-700 border-green-200';
      case 'protect': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'treatment': return 'bg-peach-200 text-peach-800 border-peach-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Routine Planner</h1>
          <p className="text-gray-500">Plan your hair success week by week.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-white border border-transparent hover:border-gray-200 text-gray-600 transition-all">
            <ChevronLeft />
          </button>
          <span className="flex items-center font-medium text-gray-800 px-2">October 2023</span>
          <button className="p-2 rounded-full hover:bg-white border border-transparent hover:border-gray-200 text-gray-600 transition-all">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-peach-200 shadow-sm overflow-hidden flex flex-col">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {weekDays.map((day, idx) => (
            <div key={day} className={`p-4 text-center ${idx === 3 ? 'bg-peach-50' : ''}`}>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">{day}</span>
              <span className={`
                inline-flex w-8 h-8 items-center justify-center rounded-full font-bold text-lg
                ${idx === 3 ? 'bg-peach-500 text-white shadow-md' : 'text-gray-700'}
              `}>
                {dates[idx]}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 divide-x divide-gray-100">
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            const daysEvents = schedule.filter(e => e.day === dayIndex);
            const isToday = dayIndex === 3;

            return (
              <div key={dayIndex} className={`relative p-2 ${isToday ? 'bg-peach-50/30' : ''}`}>
                <div className="space-y-2">
                  {daysEvents.map((event, idx) => (
                    <div 
                      key={idx}
                      className={`
                        p-3 rounded-xl border text-sm font-medium shadow-sm cursor-pointer hover:shadow-md transition-all
                        ${getTypeColor(event.type)}
                      `}
                    >
                      {event.title}
                    </div>
                  ))}
                  <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-peach-300 hover:text-peach-500 hover:bg-peach-50 transition-all flex justify-center items-center">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPlanner;
