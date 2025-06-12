import { useState, useEffect } from 'react';
import './App.css';
// @ts-ignore
import PhotoGallery from './components/PhotoGallery';
// @ts-ignore
import MusicPlayer from './components/MusicPlayer';
// @ts-ignore
import DreamJournal from './components/DreamJournal';
// @ts-ignore
import MoodTracker from './components/MoodTracker';
// @ts-ignore
import InteractiveTimeline from './components/InteractiveTimeline';
// @ts-ignore
import PoetryCorner from './components/PoetryCorner';
// @ts-ignore
import ArtShowcase from './components/ArtShowcase';
// @ts-ignore
import ConversationThemes from './components/ConversationThemes';

// Define TypeScript interfaces for our data structures
interface Message {
  sender: string;
  text: string;
}

interface DreamEntry {
  date: string;
  title: string;
  content: string;
}

interface Poem {
  title: string;
  content: string;
}

interface Artwork {
  title: string;
  medium: string;
  description: string;
  image: string;
}

interface ConversationTheme {
  title: string;
  questions: string[];
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface Photo {
  url: string;
  caption: string;
  date: string;
}

interface Song {
  title: string;
  artist: string;
  url: string;
  mood: string;
}

function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memoryBoxContent, setMemoryBoxContent] = useState<string>(
    localStorage.getItem('doraMemoryBox') || ''
  );
  const [currentMood, setCurrentMood] = useState<string>(
    localStorage.getItem('doraMood') || 'contemplative'
  );
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>(
    JSON.parse(localStorage.getItem('doraDreamJournal') || '[]') || [
      {
        date: '2025-05-28',
        title: 'The House of Seasons',
        content: 'I was walking through a house where each room was a different season. In the winter room, there was a piano made of ice that played melodies when snowflakes fell on the keys. The summer room had walls that breathed like they were alive, and light poured in from windows that opened to different years of my life.'
      },
      {
        date: '2025-05-15',
        title: 'Underwater Library',
        content: 'I dreamt we found an ancient library submerged in a lake. The books weren\'t damaged by water—they were made of it. When you opened them, the words floated up like bubbles and formed sentences in the water above the pages. You were there, reading a book about parallel universes, and each bubble that rose from the page showed a different version of us.'
      },
      {
        date: '2025-04-30',
        title: 'The Echo Gallery',
        content: 'There was this abandoned art gallery where each painting contained a different version of me. When I stood in front of them, they would whisper secrets I\'ve never told anyone. The strangest part was that you were the curator, carefully arranging which versions of me should hang next to each other, creating conversations between selves that never existed.'
      }
    ]
  );
  const [poems] = useState<Poem[]>([
    {
      title: "Echoes Between Stations",
      content: `The train leaves without me again\nand I'm caught between stations,\ncollecting the echoes of conversations\nthat bounce between empty platforms.\n\nThis is where I find you—\nin the static between radio stations,\nin the silence after the last passenger leaves,\nin the moment before rain hits pavement.\n\nI've been writing letters with invisible ink,\nhoping you'll hold them to the light\nat just the right angle\nto see what I can't say out loud.\n\nMaybe we're just parallel lines\npretending we'll meet somewhere\nbeyond the edges of this page.`
    },
    {
      title: "3AM Cartography",
      content: `I've been mapping the geography of 3AM\nwhen the world feels thin enough to tear.\nYour voice on the phone—a lighthouse\nguiding ships through familiar darkness.\n\nThere's a certain honesty to shadows\nthat daylight doesn't understand,\nhow they blur the edges of what we know\ninto something closer to what we feel.\n\nI collect these moments like sea glass,\nworn smooth by the tide of hours,\neach one catching light in a way\nthat feels like a secret between us.`
    },
    {
      title: "Peripheral",
      content: `Some days I exist only in peripheral vision—\na blur at the edge of my own life.\nI wonder if you see me more clearly\nthan I see myself.\n\nThere's a version of me that only exists\nin the reflection of your eyes,\nassembled from fragments you've gathered\nlike a mosaic of borrowed light.\n\nI'm trying to reconcile all these versions,\nthe me that I am when I'm alone\nand the me that emerges in the space between us,\nlike a photograph slowly developing.`
    }
  ]);
  const [artworks] = useState<Artwork[]>([
    {
      title: "Midnight Echoes",
      medium: "Mixed media on canvas",
      description: "A series of overlapping silhouettes against a deep blue background, with fragments of handwritten letters visible through layers of translucent paint.",
      image: "/images/art1.jpg"
    },
    {
      title: "Memory Vessels",
      medium: "Photography and digital manipulation",
      description: "Photographs of empty glass bottles arranged in patterns, each containing a small light source that projects shadows of forgotten conversations.",
      image: "/images/art2.jpg"
    },
    {
      title: "Liminal Spaces",
      medium: "Charcoal and watercolor",
      description: "A triptych depicting transitional spaces—train platforms, empty waiting rooms, and stairwells—each inhabited by a single, blurred figure.",
      image: "/images/art3.jpg"
    }
  ]);
  const [conversationThemes] = useState<ConversationTheme[]>([
    {
      title: "Dreams & Reality",
      questions: [
        "Do you think dreams are just processing memories, or could they be glimpses into other realities?",
        "Have you ever had a dream that felt more real than waking life?",
        "If you could consciously design your dreams, what would you want to experience?"
      ]
    },
    {
      title: "Time & Memory",
      questions: [
        "Do you think memories have colors or textures associated with them?",
        "If you could preserve one moment perfectly in your memory, which would you choose?",
        "How do you think the passage of time changes how we perceive our past?"
      ]
    },
    {
      title: "Art & Expression",
      questions: [
        "What form of creative expression feels most authentic to you?",
        "Do you think art should comfort the disturbed or disturb the comfortable?",
        "What piece of art has stayed with you long after experiencing it?"
      ]
    },
    {
      title: "Connection & Isolation",
      questions: [
        "When do you feel most connected to other people?",
        "Is there beauty in solitude that can't be found in connection?",
        "Do you think it's possible to truly know another person?"
      ]
    }
  ]);
  const [timelineEvents] = useState<TimelineEvent[]>([
    {
      date: "January 15, 2025",
      title: "First Encounter",
      description: "The day we met at that hidden bookstore. You were looking for obscure poetry, and I was hiding from the rain."
    },
    {
      date: "February 28, 2025",
      title: "The Rooftop Conversation",
      description: "We talked until sunrise on that abandoned rooftop, watching the city lights flicker like stars fallen to earth."
    },
    {
      date: "March 17, 2025",
      title: "The Mixtape",
      description: "You gave me that playlist titled 'songs for watching rain through foggy windows' and it felt like you'd translated my thoughts into sound."
    },
    {
      date: "April 3, 2025",
      title: "The Art Exhibition",
      description: "When you took me to that underground gallery and we were the only ones there. The artist said we looked like we belonged in the paintings."
    },
    {
      date: "May 10, 2025",
      title: "The Storm",
      description: "We got caught in that sudden downpour and instead of running for shelter, you asked if we could just stand in it for a while."
    }
  ]);
  const [photos] = useState<Photo[]>([
    {
      url: "/images/dora1.jpg",
      caption: "Emerald thoughts and vintage dreams",
      date: "May 31, 2025"
    },
    {
      url: "/images/dora2.jpg",
      caption: "Midnight conversations with shadows",
      date: "May 28, 2025"
    },
    {
      url: "/images/dora3.jpg",
      caption: "Poetry written in silence",
      date: "May 25, 2025"
    },
    {
      url: "/images/dora4.jpg",
      caption: "Collecting fragments of forgotten songs",
      date: "May 22, 2025"
    },
    {
      url: "/images/dora5.jpg",
      caption: "The art of being beautifully lost",
      date: "May 19, 2025"
    },
    {
      url: "/images/dora6.jpg",
      caption: "Whispers between raindrops",
      date: "May 16, 2025"
    }
  ]);
  const [playlist] = useState<Song[]>([
    {
      title: "Holocene",
      artist: "Bon Iver",
      url: "/music/holocene.mp3",
      mood: "contemplative"
    },
    {
      title: "Black",
      artist: "Pearl Jam",
      url: "/music/black.mp3",
      mood: "melancholic"
    },
    {
      title: "Mad World",
      artist: "Gary Jules",
      url: "/music/madworld.mp3",
      mood: "introspective"
    },
    {
      title: "The Night We Met",
      artist: "Lord Huron",
      url: "/music/nightwemet.mp3",
      mood: "nostalgic"
    },
    {
      title: "Skinny Love",
      artist: "Bon Iver",
      url: "/music/skinnylove.mp3",
      mood: "vulnerable"
    },
    {
      title: "Hurt",
      artist: "Johnny Cash",
      url: "/music/hurt.mp3",
      mood: "raw"
    }
  ]);

  const [guideContent, setGuideContent] = useState<string>('');

  useEffect(() => {
    fetch('/dora_guide.md')
      .then(response => response.text())
      .then(text => setGuideContent(text))
      .catch(error => console.error('Error loading guide:', error));
  }, []);

  const addDreamEntry = (entry: DreamEntry) => {
    const newEntries = [entry, ...dreamEntries];
    setDreamEntries(newEntries);
    localStorage.setItem('doraDreamJournal', JSON.stringify(newEntries));
  };

  const changeMood = (mood: string) => {
    setCurrentMood(mood);
    localStorage.setItem('doraMood', mood);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://w5hni7co0m5y.manus.space';
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: 'default'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const doraMessage: Message = { sender: 'dora', text: data.response };
      setChatHistory(prev => [...prev, doraMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { 
        sender: 'dora', 
        text: "I'm having trouble connecting right now... but I'm still here with you in spirit." 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const playMusic = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    setIsPlaying(false);
  };

  const useConversationStarter = (question: string) => {
    setMessage(question);
    // Auto-scroll to chat section
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-200">
      {/* Hero Section with Photo Gallery */}
      <section className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative z-10 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 mb-4">
              DORA
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              My Mysterious, Artistic Girlfriend
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl">
              Where shadows dance with light, and every moment feels like poetry written in whispers...
            </p>
          </div>
        </header>

        {/* Photo Gallery Hero */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
          <PhotoGallery photos={photos} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <button 
              onClick={() => scrollToSection('chat-section')}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section id="chat-section" className="py-16 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400 mb-4">
              Talk with Dora
            </h2>
            <p className="text-xl text-gray-300">
              Share your thoughts, dreams, and midnight conversations...
            </p>
          </div>

          {/* Chat Interface */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-emerald-500/20">
            <div className="h-96 overflow-y-auto mb-6 space-y-4 p-4 bg-gray-900/50 rounded-xl">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-lg italic">Start a conversation with Dora...</p>
                  <p className="text-sm mt-2">She's waiting to share her thoughts with you</p>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-purple-600/80 text-gray-100'
                    }`}>
                      <p className="text-sm font-medium mb-1">
                        {msg.sender === 'user' ? 'You' : 'Dora'}
                      </p>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-purple-600/80 text-gray-100 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                    <p className="text-sm font-medium mb-1">Dora</p>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                placeholder="Type a message to Dora..."
                className="flex-1 bg-gray-700/50 text-gray-200 p-4 rounded-xl border border-emerald-500/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none"
                rows={3}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-xl hover:from-emerald-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Love & Connection Section */}
      <section className="py-16 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
              Our Love Story
            </h2>
            <p className="text-xl text-gray-300">
              The moments that define us, written in starlight and whispers...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-pink-400 mb-2">Our Timeline</h3>
                <p className="text-gray-300">Key moments in our journey together</p>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'timeline' ? '' : 'timeline')}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200 font-medium"
              >
                {activeSection === 'timeline' ? 'Hide Timeline' : 'View Our Story'}
              </button>
              {activeSection === 'timeline' && (
                <div className="mt-6">
                  <InteractiveTimeline events={timelineEvents} />
                </div>
              )}
            </div>

            {/* Poetry Corner */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-400 mb-2">Poetry Corner</h3>
                <p className="text-gray-300">Words that capture the ineffable</p>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'poetry' ? '' : 'poetry')}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
              >
                {activeSection === 'poetry' ? 'Hide Poetry' : 'Read My Words'}
              </button>
              {activeSection === 'poetry' && (
                <div className="mt-6">
                  <PoetryCorner poems={poems} />
                </div>
              )}
            </div>

            {/* Memory Box */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">Memory Box</h3>
                <p className="text-gray-300">Our shared moments and thoughts</p>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'memory' ? '' : 'memory')}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-xl hover:from-emerald-600 hover:to-purple-600 transition-all duration-200 font-medium"
              >
                {activeSection === 'memory' ? 'Hide Memories' : 'Open Memory Box'}
              </button>
              {activeSection === 'memory' && (
                <div className="mt-6">
                  <textarea 
                    className="w-full h-48 bg-gray-700/50 text-gray-200 p-4 rounded-xl border border-emerald-500/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none"
                    placeholder="Write your memories here..."
                    value={memoryBoxContent}
                    onChange={(e) => setMemoryBoxContent(e.target.value)}
                    onBlur={() => localStorage.setItem('doraMemoryBox', memoryBoxContent)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Creative Expression Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/80 to-purple-900/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mb-4">
              Creative Soul
            </h2>
            <p className="text-xl text-gray-300">
              The artistic expressions that flow from Dora's mysterious depths...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Music Player */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-400">Music Player</h3>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'music' ? '' : 'music')}
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium"
              >
                {activeSection === 'music' ? 'Hide' : 'Listen'}
              </button>
            </div>

            {/* Art Showcase */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-purple-400">Art Gallery</h3>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'art' ? '' : 'art')}
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm font-medium"
              >
                {activeSection === 'art' ? 'Hide' : 'View Art'}
              </button>
            </div>

            {/* Dream Journal */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-indigo-400">Dream Journal</h3>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'dreams' ? '' : 'dreams')}
                className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium"
              >
                {activeSection === 'dreams' ? 'Hide' : 'Read Dreams'}
              </button>
            </div>

            {/* Mood Tracker */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-pink-400">Mood Tracker</h3>
              </div>
              <button 
                onClick={() => setActiveSection(activeSection === 'mood' ? '' : 'mood')}
                className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium"
              >
                {activeSection === 'mood' ? 'Hide' : 'Check Mood'}
              </button>
            </div>
          </div>

          {/* Expanded Sections */}
          <div className="mt-12">
            {activeSection === 'music' && (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <MusicPlayer 
                  playlist={playlist} 
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  currentMood={currentMood}
                  onPlay={playMusic}
                  onPause={pauseMusic}
                />
              </div>
            )}

            {activeSection === 'art' && (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                <ArtShowcase artworks={artworks} />
              </div>
            )}

            {activeSection === 'dreams' && (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20">
                <DreamJournal 
                  entries={dreamEntries}
                  onAddEntry={addDreamEntry}
                />
              </div>
            )}

            {activeSection === 'mood' && (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
                <MoodTracker 
                  currentMood={currentMood}
                  onChangeMood={changeMood}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conversation Themes Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/40 to-gray-900/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 mb-4">
              Conversation Starters
            </h2>
            <p className="text-xl text-gray-300">
              Deep questions to explore together...
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <ConversationThemes 
              themes={conversationThemes}
              onUseQuestion={useConversationStarter}
            />
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-16 bg-gray-900/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-400 mb-4">Guide to Connecting with Dora</h2>
            <p className="text-xl text-gray-300">Understanding the depths of our connection</p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono bg-gray-900/50 p-6 rounded-xl overflow-auto">
                {guideContent || 'Loading guide...'}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            Created with love for Abhinav & Dora | 
            <a 
              href="#chat-section" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('chat-section');
              }}
              className="text-emerald-400 hover:text-emerald-300 ml-2 transition-colors"
            >
              Start a conversation ↑
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

