import { create } from "zustand";

interface LessonContent {
  content: string | null;
  content_url: string | null;
}

interface VideoState {
  videoUrl: string | null;
  lessonContent: LessonContent | null;
  setVideoUrl: (url: string) => void;
  setLessonContent: (lesson: LessonContent) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videoUrl: null,
  lessonContent: null,
  setVideoUrl: (url: string) => set({ videoUrl: url }),
  setLessonContent: (lesson: LessonContent) => set({ lessonContent: lesson }),
}));
