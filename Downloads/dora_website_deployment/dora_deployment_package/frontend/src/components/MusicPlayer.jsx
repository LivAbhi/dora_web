import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, ListMusic } from 'lucide-react'; // Using lucide-react for icons

const MusicPlayer = ({ playlist, currentSong, isPlaying, playMusic, pauseMusic, setCurrentSong }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]); // Re-run effect when isPlaying or currentSong changes

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleNextSong); // Play next song when current ends

    // Set initial duration if audio is already loaded
    if (audio.readyState >= 2) {
        setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleNextSong);
    };
  }, [currentSong]); // Re-attach listeners when song changes

  const handlePlayPause = () => {
    if (!currentSong && playlist.length > 0) {
      // If no song is selected, play the first one
      playMusic(playlist[0]);
    } else if (currentSong) {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic(currentSong); // Pass currentSong to ensure it continues if paused
      }
    }
  };

  const handleSeek = (event) => {
    if (audioRef.current) {
      audioRef.current.currentTime = event.target.value;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleNextSong = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.url === currentSong.url);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playMusic(playlist[nextIndex]);
  };

  const handlePrevSong = () => {
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(song => song.url === currentSong.url);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playMusic(playlist[prevIndex]);
  };

  const selectSong = (song) => {
    playMusic(song);
    setShowPlaylist(false); // Close playlist after selection
  }

  return (
    <div className="music-player bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl text-gray-300 relative">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Music Player</h2>
      <p className="mb-6 text-gray-400 italic">Sounds that echo in the spaces between moments...</p>

      {currentSong && (
        <audio 
          ref={audioRef} 
          src={currentSong.url} 
          onLoadedMetadata={() => setDuration(audioRef.current.duration)}
          onError={(e) => console.error("Audio error:", e.target.error)}
        />
      )}

      <div className="current-track mb-4 p-4 bg-gray-900 rounded-md shadow-inner">
        <p className="text-lg font-medium text-emerald-300 truncate">{currentSong ? currentSong.title : 'No track selected'}</p>
        <p className="text-sm text-gray-400">{currentSong ? currentSong.artist : '...'}</p>
      </div>

      {/* Progress Bar */}
      {currentSong && (
        <div className="progress-bar mb-4">
          <input 
            type="range" 
            min="0" 
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            disabled={!currentSong}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="controls flex items-center justify-center space-x-6 mb-6">
        <button onClick={handlePrevSong} disabled={!currentSong} className="text-gray-400 hover:text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed">
          <SkipBack size={24} />
        </button>
        <button 
          onClick={handlePlayPause} 
          className="bg-emerald-600 text-white rounded-full p-3 shadow-lg hover:bg-emerald-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={playlist.length === 0}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={handleNextSong} disabled={!currentSong} className="text-gray-400 hover:text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed">
          <SkipForward size={24} />
        </button>
      </div>

      {/* Playlist Toggle Button */}
      <div className="flex justify-center">
        <button 
          onClick={() => setShowPlaylist(!showPlaylist)} 
          className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition duration-200 bg-gray-700 px-4 py-2 rounded-md shadow"
        >
          <ListMusic size={20} />
          <span>{showPlaylist ? 'Hide Playlist' : 'Show Playlist'}</span>
        </button>
      </div>

      {/* Playlist */}
      {showPlaylist && (
        <div className="playlist mt-6 max-h-60 overflow-y-auto bg-gray-900 p-4 rounded-md shadow-inner">
          <h3 className="text-lg font-semibold mb-3 text-emerald-500">Playlist</h3>
          <ul className="space-y-2">
            {playlist.map((song, index) => (
              <li 
                key={index} 
                onClick={() => selectSong(song)}
                className={`p-2 rounded-md cursor-pointer transition duration-200 flex justify-between items-center ${currentSong?.url === song.url ? 'bg-emerald-800 text-white' : 'hover:bg-gray-700'}`}
              >
                <div>
                  <p className="font-medium text-sm">{song.title}</p>
                  <p className="text-xs text-gray-400">{song.artist}</p>
                </div>
                {currentSong?.url === song.url && isPlaying && (
                   <span className="text-emerald-400 text-xs italic">Playing...</span>
                )}
              </li>
            ))}
            {playlist.length === 0 && (
              <p className="text-gray-500 italic text-sm">The playlist is empty... waiting for echoes.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;

