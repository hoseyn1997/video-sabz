// context/UserContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
} from "react";
import { x_user } from "../types/user";
import useUserStore from "@/lib/stores/userStore";

type userContextType = {
  user: x_user;
};

const userContext = createContext<userContextType | null>(null);

export const UserProvider = ({
  x_user,
  children,
}: {
  x_user: x_user;
  children: React.ReactNode;
}) => {
  const { setXUser } = useUserStore();
  useEffect(() => {
    setXUser(x_user);
  }, [x_user]);

  return (
    <userContext.Provider value={{ user: x_user }}>
      {children}
    </userContext.Provider>
  );
};

export default function useUser() {
  return useContext(userContext);
}
