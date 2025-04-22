import axiosInstance from "@/axiosInstance/AxiosInstance";
import { useTodoStore } from "@/zustandStore/store";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Todos = ({ userTodo }: { userTodo: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(userTodo || []);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useTodoStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    setTodos(userTodo || []);
  }, [userTodo]);

  useEffect(() => {
    if (user) {
      // Fetch todos for the current user
      const fetchTodos = async () => {
        try {
          const response = await axiosInstance.get(`/todo/todos`);
          setTodos(response.data.todos);
        } catch (error) {
          console.error("Error fetching todos:", error);
          setError("Failed to fetch todos.");
        }
      };

      fetchTodos();
    } else {
      // Clear todos when user logs out
      setTodos([]);
    }
  }, [user]);

  const deleteTodo = async (id: string) => {
    try {
      await axiosInstance.delete(`/todo/todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo.");
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo({ ...todo });
  };

  const submitEdit = async () => {
    if (!editTodo) return;

    try {
      const response = await axiosInstance.put(
        `/todo/todo/${editTodo._id}`,
        editTodo
      );
      const updatedTodo = response.data.todo;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? { ...todo, ...updatedTodo } : todo
        )
      );
      queryClient.invalidateQueries({ queryKey: ["user"] });

      setEditTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update todo.");
    }
  };

  const handleAddTodo = () => {
    setNewTodo({ _id: "", title: "", description: "", completed: false });
  };

  const submitNewTodo = async () => {
    if (!newTodo) return;

    try {
      const response = await axiosInstance.post("/todo/post", newTodo);
      const createdTodo = response.data.todo;

      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setUser({
        ...user!,
        todos: [...(user?.todos || []), createdTodo],
      });

      queryClient.invalidateQueries({ queryKey: ["user"] });

      setNewTodo(null);
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo.");
    }
  };

  return (
    todos && (
      <div className="h-full p-5 transition-all duration-300">
        <div className="flex flex-col gap-3 relative">
          <section>
            <button
              className="p-3 bg-green-700 rounded-2xl hover:bg-green-600 transition-all duration-200 text-xl font-semibold text-amber-50"
              onClick={handleAddTodo}
              aria-label="Add Todo"
            >
              Add Todo
            </button>
          </section>

          {/* Error Message */}
          {error && <div className="text-red-500">{error}</div>}

          {/* Edit Todo Modal */}
          {editTodo && (
            <section className="bg-green-800/15 backdrop-blur-[0.2rem] w-full h-screen absolute flex justify-center items-center">
              <div className="w-1/2 h-[70%] bg-purple-600/25 rounded-4xl flex flex-col justify-center items-center gap-4 p-5">
                <h1>Edit Todo</h1>
                <textarea
                  value={editTodo.title}
                  onChange={(e) =>
                    setEditTodo((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  placeholder="Todo Title"
                  className="bg-purple-400/50 text-amber-50 font-bold
                outline-0  w-[80%] h-fit rounded-xl px-5 py-1 resize-none"
                />
                <textarea
                  value={editTodo.description}
                  onChange={(e) =>
                    setEditTodo((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Description"
                  className="bg-purple-400/50 text-amber-50 font-bold
                outline-0  w-[80%] h-full rounded-xl px-5 py-1 resize-none"
                />
                <section className="flex justify-around gap-5 w-full">
                  <button
                    className="bg-emerald-400 px-4 py-2 rounded-2xl"
                    onClick={() =>
                      setEditTodo((prev) =>
                        prev ? { ...prev, completed: !prev.completed } : null
                      )
                    }
                    aria-label={
                      editTodo.completed ? "Mark Incomplete" : "Mark Completed"
                    }
                  >
                    {editTodo.completed ? "Mark Incomplete" : "Mark Completed"}
                  </button>
                  <button
                    className="bg-emerald-400 px-4 py-2 rounded-2xl"
                    onClick={submitEdit}
                    aria-label="Submit Edit"
                  >
                    Submit
                  </button>
                </section>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-2xl"
                  onClick={() => setEditTodo(null)}
                  aria-label="Close Edit Modal"
                >
                  Close
                </button>
              </div>
            </section>
          )}

          {/* Add Todo Modal */}
          {newTodo && (
            <section className="bg-green-800/15 rounded-2xl backdrop-blur-[0.2rem] w-full h-screen absolute flex justify-center items-center">
              <div className="w-1/2 h-[70%] bg-purple-600/25 backdrop-blur-sm  rounded-4xl flex flex-col justify-center items-center gap-4 p-5">
                <h1>Add Todo</h1>
                <textarea
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  placeholder="Todo Title"
                  className="bg-purple-400/50 text-amber-50 font-bold
                outline-0 w-[80%] h-fit rounded-xl px-5 py-1 resize-none"
                />
                <textarea
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Description"
                  className="bg-purple-400/50 text-amber-50 outline-0 font-bold w-[80%] h-full rounded-xl px-5 py-1 resize-none"
                />
                <section className="flex justify-around gap-5 w-full">
                  <button
                    className="bg-emerald-400 px-4 py-2 rounded-2xl"
                    onClick={submitNewTodo}
                    aria-label="Submit New Todo"
                  >
                    Submit
                  </button>
                </section>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-2xl"
                  onClick={() => setNewTodo(null)}
                  aria-label="Close Add Todo Modal"
                >
                  Close
                </button>
              </div>
            </section>
          )}

          {/* Display Todos */}
          <section className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {Array.isArray(todos) &&
              todos.map((todo) => (
                <div
                  className="bg-emerald-600 p-4 rounded-xl h-full"
                  key={todo._id}
                >
                  <h1 className="text-2xl font-bold uppercase">{todo.title}</h1>
                  <p className="font-semibold line-clamp-3">
                    {todo.description}
                  </p>

                  <section className="flex gap-8 mt-7">
                    <button
                      onClick={() => handleEditTodo(todo)}
                      className="bg-green-950 px-4 py-1 text-amber-50 uppercase font-semibold rounded-xl hover:bg-opacity-80 transition-all"
                      aria-label="Edit Todo"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="bg-red-800 px-4 py-1 text-amber-50 uppercase font-semibold rounded-xl hover:bg-opacity-80 transition-all"
                      aria-label="Delete Todo"
                    >
                      Delete
                    </button>
                  </section>
                </div>
              ))}
          </section>
        </div>
      </div>
    )
  );
};

export default Todos;
