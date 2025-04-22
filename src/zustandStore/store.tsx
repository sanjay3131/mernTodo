import { fetchTodos } from "@/utls/apiFunction";
import { create } from "zustand";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}
interface User {
  email: string;
  username: string;
  profilePic?: string;
  todos?: { _id: string; title: string }[];
}

interface TodoState {
  todos: Todo[];
  user: User | null; // User state (nullable)
  setTodos: (todos: Todo[]) => void;
  setUser: (user: User) => void; // Function to set user
}

// Zustand store
export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  user: null, // Initial state is null
  setTodos: (todos) => set({ todos }),
  setUser: (user) => set({ user }),
}));

// Fetch and update the todos initially
export const initializeTodos = async () => {
  const todos = await fetchTodos();
  useTodoStore.getState().setTodos(todos);
};
