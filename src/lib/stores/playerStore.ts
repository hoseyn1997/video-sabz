import { create } from 'zustand';

type skeepVideo = {
  text: string;
  visible: boolean;
  position: "left" | "right";
}

type VideoState = {
  isPlaying: boolean;
  playbackSpeed: number;
  currentTime: number;
  duration: number | null;
  isFullscreen: boolean;
  isMuted: boolean; skipFeedback: skeepVideo;
  videoElementRef: React.RefObject<HTMLVideoElement | null> | null;
  loading: boolean;
};

type VideoActions = {
  setIsPlaying: (isPlaying: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsFullscreen: (isFull: boolean) => void;
  setIsMuted: (isMute: boolean) => void;
  setSkipFeedback: (skeep: skeepVideo) => void;
  setVideoElement: (refElement: React.RefObject<HTMLVideoElement | null> | null) => void;
  setLoading: (loadingState: boolean) => void;
  toggleVolume: () => void;
  togglePlayPause: () => void;
  changePlaybackSpeed: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const usePlayerStore = create<VideoState & VideoActions>((set, get) => ({
  isPlaying: false,
  playbackSpeed: 1,
  currentTime: 0,
  duration: null,
  isFullscreen: false,
  isMuted: false,
  skipFeedback: {
    text: "",
    visible: false,
    position: "left",
  },
  videoElementRef: null,
  loading: false,

  setIsPlaying: (isPlayingState) => set({ isPlaying: isPlayingState }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setIsFullscreen: (isFull) => set({ isFullscreen: isFull }),
  setIsMuted: (isMute) => set({ isMuted: isMute }),
  setSkipFeedback: (skeep) => set({ skipFeedback: skeep }),
  setLoading: (loadingState) => set({ loading: loadingState }),

  setVideoElement: async (element) => set({ videoElementRef: element }),

  // handle controlls:
  toggleVolume: () => {
    const currentState = get();
    if (currentState.videoElementRef?.current) {
      currentState.videoElementRef.current.muted = !currentState.videoElementRef.current.muted;
      currentState.setIsMuted(currentState.videoElementRef.current.muted);
    }
  },
  togglePlayPause: () => {
    const currentState = get();
    if (currentState.videoElementRef?.current) {
      if (currentState.videoElementRef.current.paused) {
        currentState.videoElementRef.current.play();
        currentState.setIsPlaying(true);
      } else {
        currentState.videoElementRef.current.pause();
        currentState.setIsPlaying(false);
      }
    }
  },
  changePlaybackSpeed: () => {
    const currentState = get();
    if (currentState.videoElementRef?.current) {
      const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
      const newSpeed =
        speeds[(speeds.indexOf(currentState.playbackSpeed) + 1) % speeds.length];
      currentState.videoElementRef.current.playbackRate = newSpeed;
      currentState.setPlaybackSpeed(newSpeed);
    }
  },
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentState = get();
    if (currentState.videoElementRef?.current && currentState.duration) {
      const seekTime = (parseFloat(e.target.value) / 100) * currentState.duration; // Calculate seek time
      currentState.videoElementRef.current.currentTime = seekTime;
      currentState.setCurrentTime(seekTime); // Update current time state
      currentState.loading = true;
    }
  },
  handleDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => {
    const currentState = get();
    if (currentState.videoElementRef?.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      if (clickX > width / 2) {
        // Double-click on the right side: skip forward 10 seconds
        currentState.videoElementRef.current.currentTime += 10;
        currentState.setSkipFeedback({ text: "+10s", visible: true, position: "right" });
      } else {
        // Double-click on the left side: skip backward 10 seconds
        currentState.videoElementRef.current.currentTime -= 10;
        currentState.setSkipFeedback({ text: "-10s", visible: true, position: "left" });
      }

      // Hide the feedback after 1 second
      setTimeout(() => {
        currentState.setSkipFeedback({ text: "", visible: false, position: "left" });
      }, 1000);
    }
  },
}));

export default usePlayerStore;