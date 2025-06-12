import React from 'react';

const InteractiveTimeline = ({ events }) => {
  return (
    <div className="interactive-timeline">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Timeline of Moments</h2>
      <p className="mb-8 text-gray-400 italic">Tracing the constellations of shared memories...</p>

      <div className="relative border-l-2 border-emerald-700 border-opacity-50 ml-6 pr-6">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="mb-10 ml-8 relative group">
              {/* Dot on the timeline */}
              <div className="absolute -left-[38px] top-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-800 group-hover:bg-emerald-300 transition duration-300"></div>
              
              {/* Content Box */}
              <div className="p-4 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg transition duration-300 group-hover:shadow-emerald-900/50 group-hover:scale-[1.02]">
                <time className="block mb-1 text-sm font-normal leading-none text-gray-500">{event.date}</time>
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">{event.title}</h3>
                <p className="text-base font-normal text-gray-300 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic ml-8">The timeline is waiting for moments to be written...</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveTimeline;
