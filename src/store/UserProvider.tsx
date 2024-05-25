"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import create from "zustand";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  passwordChangedAt: string;
  photo: string;
  image: string;
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
};


const createStore = (user: User) =>
  create<UserStore>((set) => ({
    user,
    setUser: (user) => set({ user }),
  }));

const UserContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  const [store] = useState(() => createStore(user));
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};

export default UserProvider;
