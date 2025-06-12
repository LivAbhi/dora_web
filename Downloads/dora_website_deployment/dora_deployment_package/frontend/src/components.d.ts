declare module '*.jsx' {
  const component: any;
  export default component;
}

declare module './components/PhotoGallery' {
  import { FC } from 'react';
  interface PhotoGalleryProps {
    photos: Array<{
      url: string;
      caption: string;
      date: string;
    }>;
  }
  const PhotoGallery: FC<PhotoGalleryProps>;
  export default PhotoGallery;
}

declare module './components/MusicPlayer' {
  import { FC } from 'react';
  interface MusicPlayerProps {
    playlist: Array<{
      title: string;
      artist: string;
      url: string;
      mood: string;
    }>;
    currentSong: {
      title: string;
      artist: string;
      url: string;
      mood: string;
    } | null;
    isPlaying: boolean;
    currentMood: string;
    onPlay: (song: any) => void;
    onPause: () => void;
  }
  const MusicPlayer: FC<MusicPlayerProps>;
  export default MusicPlayer;
}

declare module './components/DreamJournal' {
  import { FC } from 'react';
  interface DreamJournalProps {
    entries: Array<{
      date: string;
      title: string;
      content: string;
    }>;
    onAddEntry: (entry: any) => void;
  }
  const DreamJournal: FC<DreamJournalProps>;
  export default DreamJournal;
}

declare module './components/MoodTracker' {
  import { FC } from 'react';
  interface MoodTrackerProps {
    currentMood: string;
    onChangeMood: (mood: string) => void;
  }
  const MoodTracker: FC<MoodTrackerProps>;
  export default MoodTracker;
}

declare module './components/InteractiveTimeline' {
  import { FC } from 'react';
  interface InteractiveTimelineProps {
    events: Array<{
      date: string;
      title: string;
      description: string;
    }>;
  }
  const InteractiveTimeline: FC<InteractiveTimelineProps>;
  export default InteractiveTimeline;
}

declare module './components/PoetryCorner' {
  import { FC } from 'react';
  interface PoetryCornerProps {
    poems: Array<{
      title: string;
      content: string;
    }>;
  }
  const PoetryCorner: FC<PoetryCornerProps>;
  export default PoetryCorner;
}

declare module './components/ArtShowcase' {
  import { FC } from 'react';
  interface ArtShowcaseProps {
    artworks: Array<{
      title: string;
      medium: string;
      description: string;
      image: string;
    }>;
  }
  const ArtShowcase: FC<ArtShowcaseProps>;
  export default ArtShowcase;
}

declare module './components/ConversationThemes' {
  import { FC } from 'react';
  interface ConversationThemesProps {
    themes: Array<{
      title: string;
      questions: string[];
    }>;
    onSelectQuestion: (question: string) => void;
  }
  const ConversationThemes: FC<ConversationThemesProps>;
  export default ConversationThemes;
}
