import { userVideoInteraction, videoWithCollection } from "@/lib/types/video";
import agent from "@/lib/stores/agent";
import { create } from "zustand";
import { Comment } from "@prisma/client";

type VideoState = {
  isLoading: boolean;
  isLiking: boolean;
  isSaving: boolean;
  gettingVideoInfo: boolean;
  isfollowing: boolean;
  isDeleting: boolean;
  isSavingCollection: boolean;
  videos: videoWithCollection[];
  pagination_page: number;
  total_pages_count: number;
  ITEMS_PER_PAGE: number;
  currentVideoInfo: userVideoInteraction | null;
  comments: Comment[];
};

type VideoActions = {
  getVideos: (currentPage: number) => void;
  setVideos: (videos: videoWithCollection[]) => void;
  setPaginationPage: (page: number) => void;
  setTotalPages: (totalPagesCount: number) => void;
  setItemsPPage: (items: number) => void;
  likeVideo: (videoId: string) => void;
  saveVideo: (videoId: string) => void;
  setCurrentVideoInfo: (info: userVideoInteraction) => void;
  getCurrentVideoInfo: (videoId: string) => void;
  followTeacher: (teacherId: string) => void;
  getComments: (videoid: string) => void;
  sendComment: (videoId: string, commentBody: string) => void;
  deleteVideo: (videoId: string) => Promise<void>;
  saveCollection: (collectionId: string) => Promise<void>;
};

const useVideoStore = create<VideoState & VideoActions>((set, get) => ({
  isLoading: false,
  isLiking: false,
  isSaving: false,
  gettingVideoInfo: false,
  isfollowing: false,
  isDeleting: false,
  isSavingCollection: false,
  videos: [],
  pagination_page: 1,
  total_pages_count: 1,
  ITEMS_PER_PAGE: 2,
  currentVideoInfo: null,
  comments: [],

  setPaginationPage: (page) => set({ pagination_page: page }),
  setTotalPages: (pagesCount) => set({ total_pages_count: pagesCount }),
  setItemsPPage: (items) => set({ ITEMS_PER_PAGE: items }),

  getVideos: async (currentPage) => {
    const currentState = get();
    set({ isLoading: true });
    try {
      const response = await agent.videos.list(
        currentPage,
        currentState.ITEMS_PER_PAGE,
      );
      response.forEach((video) => {
        currentState.videos.push(video);
      });

      set({
        videos: currentState.videos,
        pagination_page: currentState.pagination_page + 1,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
  setVideos: (videos) => set({ videos: videos }),
  likeVideo: async (videoId) => {
    const currentState = get();
    set({ isLiking: true });
    try {
      const liking_result = await agent.videos.like(videoId);

      set({
        isLiking: false,
        currentVideoInfo: {
          ...currentState.currentVideoInfo!,
          isLiked: !liking_result.disliked,
        },
      });
    } catch (error) {
      console.log(error);
      set({ isLiking: false });
    }
  },
  saveVideo: async (videoId) => {
    const currentState = get();
    set({ isSaving: true });
    try {
      const saving_result = await agent.videos.save(videoId);
      set({
        isSaving: false,
        currentVideoInfo: {
          ...currentState.currentVideoInfo!,
          isSaved: saving_result.isSaved,
        },
      });
    } catch (error) {
      console.log(error);
      set({ isSaving: false });
    }
  },
  setCurrentVideoInfo: (info) => set({ currentVideoInfo: info }),
  getCurrentVideoInfo: async (videoId) => {
    set({ gettingVideoInfo: true });
    try {
      const result = await agent.videos.info(videoId);
      set({ currentVideoInfo: result, gettingVideoInfo: false });
    } catch (error) {
      set({ gettingVideoInfo: false });
    }
  },
  followTeacher: async (teacherId) => {
    const currentState = get();
    set({ isfollowing: true });
    try {
      const result = await agent.videos.followTeacher(teacherId);
      set({
        isfollowing: false,
        currentVideoInfo: {
          ...currentState.currentVideoInfo!,
          isTeacherFollowed: result.isFollowed,
        },
      });
    } catch (error) {
      set({ isfollowing: false });
    }
  },
  getComments: async (videoid: string) => {
    try {
      const result = await agent.videos.comments(videoid);
      console.log(result);
      set({ comments: result.comments });
    } catch (error) {
      console.log(error);
    }
  },
  sendComment: async (videoId, commentBody) => {
    const currentState = get();
    try {
      const result = await agent.videos.comment(videoId, commentBody);
      currentState.comments.push(result);
      set({ comments: currentState.comments });
    } catch (error) {}
  },
  deleteVideo: async (videoId: string) => {
    set({ isDeleting: true });
    try {
      await agent.videos.delete(videoId);
      set({ isDeleting: false });
    } catch (error) {
      console.log(error);
      set({ isDeleting: false });
    }
  },
  saveCollection: async (collectionId) => {
    set({ isSavingCollection: true });
    try {
      await agent.collections.save(collectionId);
      set({ isSavingCollection: false });
    } catch (error) {
      console.log(error);
      set({ isSavingCollection: false });
    }
  },
}));

export default useVideoStore;
