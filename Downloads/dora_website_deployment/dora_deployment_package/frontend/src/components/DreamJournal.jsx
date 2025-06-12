import React, { useState } from 'react';

const DreamJournal = ({ entries, addEntry }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryDate, setNewEntryDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      alert('Please provide both a title and content for the dream entry.');
      return;
    }
    const newEntry = {
      date: newEntryDate,
      title: newEntryTitle,
      content: newEntryContent,
    };
    addEntry(newEntry);
    // Reset form and hide it
    setNewEntryTitle('');
    setNewEntryContent('');
    setNewEntryDate(new Date().toISOString().split('T')[0]);
    setShowAddForm(false);
  };

  return (
    <div className="dream-journal">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Dream Journal</h2>
      <p className="mb-6 text-gray-400 italic">Fragments of subconscious landscapes, mapped in ink...</p>

      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-6 bg-emerald-700 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-800 transition duration-200"
      >
        {showAddForm ? 'Cancel Entry' : 'Add New Dream Entry'}
      </button>

      {/* Add New Entry Form */}
      {showAddForm && (
        <form onSubmit={handleAddEntry} className="mb-8 p-6 bg-gray-900 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-emerald-500">New Dream Entry</h3>
          <div className="mb-4">
            <label htmlFor="dreamDate" className="block text-sm font-medium text-gray-400 mb-1">Date:</label>
            <input 
              type="date" 
              id="dreamDate"
              value={newEntryDate}
              onChange={(e) => setNewEntryDate(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dreamTitle" className="block text-sm font-medium text-gray-400 mb-1">Title:</label>
            <input 
              type="text" 
              id="dreamTitle"
              value={newEntryTitle}
              onChange={(e) => setNewEntryTitle(e.target.value)}
              placeholder="e.g., The House of Seasons"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dreamContent" className="block text-sm font-medium text-gray-400 mb-1">Content:</label>
            <textarea 
              id="dreamContent"
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              placeholder="Describe the dream... its textures, colors, feelings..."
              rows={5}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
              required
            />
          </div>
          <button 
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-700 transition duration-200"
          >
            Save Dream
          </button>
        </form>
      )}

      {/* Display Existing Entries */}
      <div className="space-y-6">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div key={index} className="dream-entry bg-gray-900 bg-opacity-60 p-5 rounded-lg shadow-lg border-l-4 border-emerald-700">
              <h3 className="text-xl font-semibold mb-2 text-emerald-300">{entry.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">The pages are blank... waiting for dreams to surface.</p>
        )}
      </div>
    </div>
  );
};

export default DreamJournal;
