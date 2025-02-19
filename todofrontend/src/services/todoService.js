import axios from "axios";

const API_URL = "http://localhost:8080/api/todos";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  maxRedirects: 5,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateTodo = async (id, updates) => {
  try {
    console.log(updates);
    const response = await axiosInstance.put(`/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const getTodos = async () => {
  try {
    const response = await axiosInstance.get("/items");
    return response.data;
  } catch (error) {
    handleError("fetching todos", error);
    return [];
  }
};

export const addTodo = async (title, dueDate) => {
  try {
    const response = await axiosInstance.post("", { title, dueDate });
    return response.data;
  } catch (error) {
    handleError("creating todo", error);
  }
};

export const removeTodo = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error) {
    handleError("deleting todo", error);
  }
};

// New API Call: Search Todos by Title
export const searchTodos = async (title) => {
  try {
    const response = await axiosInstance.get(`/search?title=${title}`);
    return response.data;
  } catch (error) {
    handleError("searching todos", error);
    return [];
  }
};

// New API Call: Get Todos by Due Date
export const getTodosByDueDate = async (dueDate) => {
  try {
    const response = await axiosInstance.get(`/due/${dueDate}`);
    return response.data;
  } catch (error) {
    handleError("fetching todos by due date", error);
    return [];
  }
};

const handleError = (action, error) => {
  if (error.response) {
    console.error(`Error ${action}:`, error.response.data);
    if (error.response.status === 401) {
      console.error("Unauthorized - Please check authentication.");
    } else if (error.response.status === 403) {
      console.error("Forbidden - You don’t have permission.");
    } else if (error.response.status === 302) {
      console.error("Redirection issue - Check backend API configuration.");
    }
  } else if (error.request) {
    console.error(`No response received while ${action}.`);
  } else {
    console.error(`Error ${action}:`, error.message);
  }
};
