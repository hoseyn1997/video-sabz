import { create } from "zustand";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { x_user } from "@/lib/types/user";
import agent from "@/lib/stores/agent";
import { response } from "@/lib/types/apiResponse";

type userStates = {
  x_user: x_user | null;
  loggingIn: boolean;
  phoneNumber: string | null;
};

type userActions = {
  setUser: (x_user: x_user) => void;
  logOut: () => Promise<string | null>;
  login: (info: {
    username: string;
    password: string;
  }) => Promise<response<x_user> | AxiosError>;
  setXUser: (x_user: x_user) => void;
  setPhoneNumber: (phoneNumber: string | null) => void;
};

const useUserStore = create<userStates & userActions>((set, get) => ({
  x_user: null,
  phoneNumber: null,
  loggingIn: false,

  setUser: (input_x_user) => set({ x_user: input_x_user }),

  login: async (info) => {
    const currentState = get();
    set({ loggingIn: true });
    try {
      const response = await agent.users.login(info);
      set({ loggingIn: false, x_user: response.data });

      return response;
    } catch (error: any) {
      set({ loggingIn: false });
      throw error;
    }
  },

  logOut: async () => {
    try {
      const response = await agent.users.logOut();
      toast.success(response.message);
      set({
        x_user: {
          userId: "",
          username: "",
          loggedIn: false,
        },
      });

      return response.message as string;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setXUser: (x_user) => set({ x_user: x_user }),

  setPhoneNumber: (phoneNumber) => set({ phoneNumber: phoneNumber }),
}));

export default useUserStore;
