import React, { useState } from 'react';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="photo-gallery">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-400">Photo Gallery</h2>
      <p className="mb-6 text-gray-300 italic">Fragments of moments, captured in the spaces between thoughts.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="photo-item relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-emerald-900/50 hover:scale-[1.02] cursor-pointer"
            onClick={() => openModal(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 transform translate-y-full transition-transform duration-300 hover:translate-y-0">
              <p className="text-white text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged photo view */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
              onClick={closeModal}
            >
              ×
            </button>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption} 
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="bg-black bg-opacity-70 p-4 mt-2 rounded-lg">
              <p className="text-white text-center">{selectedPhoto.caption}</p>
              {selectedPhoto.date && (
                <p className="text-gray-400 text-sm text-center mt-1">{selectedPhoto.date}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
