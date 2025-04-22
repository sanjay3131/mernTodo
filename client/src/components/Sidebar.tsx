import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";

import noAvathar from "../assets/noAvather.webp";
import axiosInstance from "@/axiosInstance/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "@/zustandStore/store";

interface User {
  email: string;
  username: string;
  profilePic?: string;
  todos?: { _id: string; title: string }[];
}

const Sidebar = ({
  userData,
  open,
  setOpen,
}: {
  userData: User;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [activeTodo, setActiveTodo] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, setUser } = useTodoStore();

  // Prevent infinite re-renders
  useEffect(() => {
    setUser(userData);
  }, [userData, setUser]);

  // Logout function with error handling
  const logoutUser = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Sidebar */}
      {user && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-purple-800 text-white p-5 transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-[70%]"
          }`}
        >
          {/* Profile pic and close btn */}
          <div className="flex justify-between items-center">
            <img
              src={user.profilePic || noAvathar}
              alt="user profile pic"
              className="size-16 rounded-full"
            />

            {/* Sidebar Toggle Button */}
            <button
              className="text-4xl font-bold z-50 text-white bg-black/50 p-2 rounded-md"
              onClick={() => setOpen(!open)}
            >
              {open ? <IoCloseSharp /> : <GiHamburgerMenu />}
            </button>
          </div>

          {/* User name */}
          {open ? (
            <h1 className="mt-5 text-2xl uppercase">{user.username}</h1>
          ) : (
            ""
          )}

          {/* Todos */}
          <div
            className={`flex flex-col gap-3 mt-5  max-h-[68%]    overflow-y-hidden ${
              open ? "block" : "hidden"
            }`}
          >
            {user.todos?.length ? (
              user.todos.map((todo) => (
                <div
                  onClick={() => setActiveTodo(todo._id)}
                  className={`text-white font-bold w-full py-2 px-3 bg-green-500/25 hover:bg-green-500/50 cursor-pointer rounded-lg ${
                    activeTodo === todo._id ? "bg-green-500/50" : ""
                  }`}
                >
                  {todo.title}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No todos available</p>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={logoutUser}
            className="absolute bottom-0 mb-5 text-xl flex items-center gap-5 p-4 rounded-2xl bg-red-400/50 hover:bg-red-500 font-bold"
          >
            Logout <MdOutlineLogout />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
