import React from 'react';

const ConversationThemes = ({ themes, useStarter }) => {
  return (
    <div className="conversation-themes">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Conversation Themes</h2>
      <p className="mb-8 text-gray-400 italic">Threads of thought to explore together...</p>

      <div className="space-y-8">
        {themes.length > 0 ? (
          themes.map((theme, index) => (
            <div key={index} className="theme-group bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg border-l-4 border-emerald-700">
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">{theme.title}</h3>
              <ul className="space-y-3">
                {theme.questions.map((question, qIndex) => (
                  <li key={qIndex} className="flex items-start justify-between">
                    <p className="text-gray-300 text-sm mr-4">{question}</p>
                    <button 
                      onClick={() => useStarter(question)}
                      className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md transition duration-200 whitespace-nowrap flex-shrink-0"
                    >
                      Start Chat
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">The air is quiet... waiting for a question to break the silence.</p>
        )}
      </div>
    </div>
  );
};

export default ConversationThemes;
