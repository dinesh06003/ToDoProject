import React, { useEffect, useState } from "react";
import { UiDesign } from "../components/UiDesign";
import { TodoItem } from "../components/TodoItem";
import { getTodos, addTodo, removeTodo, updateTodo, searchTodos, getTodosByDueDate } from "../services/todoService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WelcomeMessage } from "../components/WelcomeMessage";


export const Home = () => {
  const [isFading, setIsFading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async (title, dueDate) => {
    const newTodo = await addTodo(title, dueDate);
    setTodos([...todos, newTodo]);
    toast.success("New Task added successfully!");
  };

  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) return;
  
    // Set the fading state for the todo to true
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isFading: true } : todo
    );
    setTodos(updatedTodos);
  
    // Wait for a moment to allow the fade-out animation to play
    setTimeout(async () => {
      await removeTodo(id);
      setTodos(updatedTodos.filter((todo) => todo.id !== id));
      toast.error(`Todo "${todoToDelete.title}" deleted!`);
    }, 300); // Adjust this timeout duration to match your CSS transition duration
  };
  

  const handleEditTodo = async (id, newTitle, newDueDate, newChecked) => {
    const updatedTodo = await updateTodo(id, { title: newTitle, dueDate: newDueDate, completed: newChecked });
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    toast.info(`${updatedTodo.title} updated!`);
  };

  const handleToggleCompletion = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = await updateTodo(id, { ...todoToUpdate, completed: !todoToUpdate.completed });
    
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));

    const message = updatedTodo.completed 
      ? `Congratulations! "${updatedTodo.title}" marked as completed!`
      : `"${updatedTodo.title}" marked as incomplete!`;

    toast.success(message); 
  };

  const handleSearchTodos = async (title) => {
    const results = await searchTodos(title);
    setTodos(results);
  };

  const handleFilterByDueDate = async (date) => {
    const results = await getTodosByDueDate(date);
    setTodos(results);
  };

  return (
<div className="w-[50vw] h-[80vh] bg-white rounded-xl flex flex-col shadow-[0px_30px_160px_rgba(0,0,0,1)]">
    <WelcomeMessage />
    <UiDesign addTodo={handleAddTodo} searchTodos={handleSearchTodos} filterByDueDate={handleFilterByDueDate} totalreset={fetchTodos} />
    <div className="space-y-2 mt-3 h-full overflow-y-auto">
        {Array.isArray(todos) && todos.map((todo, index) => (
            <TodoItem key={todo.id} index={index} todo={todo} deleteTodo={handleDeleteTodo} editTodo={handleEditTodo} toggleCompletion={handleToggleCompletion} />
        ))}
    </div>
    <ToastContainer />
</div>

  );
};
