import { useQuery } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import Todos from "./Todos";
import { useState } from "react";
import { fetchTodos } from "@/utls/apiFunction";

interface Todo {
  _id: string;
  title: string;
  description: string;
}

interface User {
  email: string;
  username: string;
  profilePic?: string;
  todos?: Todo[];
}

const Dashboard = ({ userData }: { userData: User }) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching todos</div>;

  return (
    <div className="w-full h-full min-h-screen bg-green-950 flex overflow-x-hidden">
      {/* Sidebar */}
      <section
        className={`${
          open ? "w-64" : "w-20"
        } h-full transition-all duration-300`}
      >
        <Sidebar userData={{ ...userData }} open={open} setOpen={setOpen} />
      </section>

      {/* Todos Section */}
      <section
        className={`${
          open ? "w-[calc(100%-16rem)]" : "w-[calc(100%-5rem)]"
        } transition-all duration-300 h-full`}
      >
        <Todos userTodo={todos || []} />
      </section>
    </div>
  );
};

export default Dashboard;
