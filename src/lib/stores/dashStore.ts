import { create } from "zustand";
import agent from "./agent";

type dashState = {
  isDeletingTeahcer: boolean;
};

type dashAction = {
  deleteTeacher: (teacherId: string) => void;
};

const useDashStore = create<dashState & dashAction>((set, get) => ({
  isDeletingTeahcer: false,

  deleteTeacher: async (teacherId) => {
    set({ isDeletingTeahcer: true });
    try {
      await agent.dash.deleteTeacher(teacherId);
      set({ isDeletingTeahcer: false });
    } catch (error) {
      console.log(error);
      set({ isDeletingTeahcer: false });
    }
  },
}));

export default useDashStore;
