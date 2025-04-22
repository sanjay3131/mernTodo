import axiosInstance from "@/axiosInstance/AxiosInstance";

// Fetch todos
export const fetchTodos = async () => {
  const response = await axiosInstance.get("/todo/todos");
  return response.data.todos;
};

// Add a new todo
export const addTodo = async (todo: { title: string; description: string }) => {
  const response = await axiosInstance.post("/todo/todo", todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (id: string, updatedTodo: any) => {
  const response = await axiosInstance.put(`/todo/todo/${id}`, updatedTodo);
  return response.data.todo;
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const response = await axiosInstance.delete(`/todo/todo/${id}`);
  return response.data;
};
// fetch users
export const fetchUser = async () => {
  const response = await axiosInstance.get("/auth/checkauth");
  return response.data;
};
