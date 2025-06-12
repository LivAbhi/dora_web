import React from 'react';

const ArtShowcase = ({ artworks }) => {
  return (
    <div className="art-showcase">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Art Showcase</h2>
      <p className="mb-8 text-gray-400 italic">Canvases holding echoes of thought and feeling...</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.length > 0 ? (
          artworks.map((artwork, index) => (
            <div key={index} className="artwork-item bg-gray-900 bg-opacity-70 rounded-lg shadow-xl overflow-hidden transition duration-300 hover:shadow-emerald-900/60">
              <img 
                src={artwork.image} 
                alt={artwork.title} 
                className="w-full h-48 object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src='/images/placeholder_art.jpg'; }} // Basic placeholder fallback
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-emerald-300 mb-2">{artwork.title}</h3>
                <p className="text-sm text-gray-500 mb-3 italic">{artwork.medium}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{artwork.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full text-center">The studio is quiet... waiting for inspiration to strike.</p>
        )}
      </div>
    </div>
  );
};

export default ArtShowcase;
