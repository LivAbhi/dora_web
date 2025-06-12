import React from 'react';

const PoetryCorner = ({ poems }) => {
  return (
    <div className="poetry-corner">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Poetry Corner</h2>
      <p className="mb-8 text-gray-400 italic">Words woven from silence and shadow...</p>

      <div className="space-y-8">
        {poems.length > 0 ? (
          poems.map((poem, index) => (
            <div key={index} className="poem bg-gray-900 bg-opacity-60 p-6 rounded-lg shadow-lg border-l-4 border-emerald-700">
              <h3 className="text-xl font-semibold mb-3 text-emerald-300">{poem.title}</h3>
              <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed font-sans text-sm">
                {poem.content}
              </pre>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">The inkwell is dry... waiting for verses to form.</p>
        )}
      </div>
    </div>
  );
};

export default PoetryCorner;
