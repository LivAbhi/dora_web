import React from 'react';
import { Sun, Cloud, CloudRain, Moon, Zap, HelpCircle } from 'lucide-react'; // Icons for moods

const MoodTracker = ({ currentMood, changeMood }) => {
  const moods = [
    { name: 'contemplative', icon: Moon, color: 'text-indigo-400', description: 'Lost in thought, watching shadows dance...' },
    { name: 'inspired', icon: Zap, color: 'text-yellow-400', description: 'Electricity in the air, ideas sparking like fireflies.' },
    { name: 'melancholic', icon: CloudRain, color: 'text-blue-400', description: 'A gentle sadness, like the scent of rain on dry earth.' },
    { name: 'serene', icon: Sun, color: 'text-orange-400', description: 'A quiet calm, like the moment just after sunset.' },
    { name: 'mysterious', icon: Cloud, color: 'text-gray-400', description: 'Veiled in mist, thoughts drifting like fog.' },
    { name: 'unknown', icon: HelpCircle, color: 'text-purple-400', description: 'An undefined feeling, waiting to take shape.' },
  ];

  const selectedMood = moods.find(mood => mood.name === currentMood) || moods.find(mood => mood.name === 'unknown');

  return (
    <div className="mood-tracker">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Dora's Current Mood</h2>
      
      <div className="current-mood-display flex items-center space-x-4 mb-6 p-4 bg-gray-900 rounded-lg shadow-inner">
        <selectedMood.icon size={40} className={`${selectedMood.color}`} />
        <div>
          <p className={`text-xl font-medium ${selectedMood.color}`}>{selectedMood.name.charAt(0).toUpperCase() + selectedMood.name.slice(1)}</p>
          <p className="text-sm text-gray-400 italic">{selectedMood.description}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3 text-emerald-500">Set Mood</h3>
      <div className="mood-selection grid grid-cols-2 sm:grid-cols-3 gap-4">
        {moods.map(mood => (
          <button 
            key={mood.name}
            onClick={() => changeMood(mood.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow transition duration-200 border-2 ${currentMood === mood.name ? 'border-emerald-500 bg-emerald-900 bg-opacity-50' : 'border-gray-700 bg-gray-800 hover:border-emerald-600 hover:bg-gray-700'}`}
          >
            <mood.icon size={28} className={`${mood.color} mb-2`} />
            <span className={`text-sm font-medium ${currentMood === mood.name ? 'text-emerald-300' : 'text-gray-300'}`}>
              {mood.name.charAt(0).toUpperCase() + mood.name.slice(1)}
            </span>
          </button>
        ))}
      </div>
      
      {/* Placeholder for future mood history/visualization */}
      {/* <div className="mood-history mt-8">
        <h3 className="text-lg font-semibold mb-3 text-emerald-500">Mood History (Coming Soon)</h3>
        <p className="text-gray-500 italic">A visual timeline of emotional landscapes...</p>
      </div> */}
    </div>
  );
};

export default MoodTracker;
