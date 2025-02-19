import React, { useState } from "react";

export const TodoItem = ({ todo, index, deleteTodo, editTodo, toggleCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);
  const [newChecked, setNewChecked] = useState(todo.checked);

  return (
    <div className="bg-[#99AAAB] p-2 rounded-md flex items-center justify-between transition-transform transform hover:scale-105 w-[95%] mx-auto">
      <input
        type="checkbox"
        checked={newChecked}
        onChange={() => {
          const updatedChecked = !newChecked;
          setNewChecked(updatedChecked);
          toggleCompletion(todo.id);
        }}
        className="mr-2"
      />

      {isEditing ? (
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-1 rounded-md border border-gray-500 bg-white text-black flex-grow"
            autoFocus
          /><span> Due date</span>
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="p-1 rounded-md border border-gray-500 bg-white text-black"
          />
        </div>
      ) : (
        <p className={`text-gray-900 text-sm ${todo.completed ? "line-through" : ""}`}>
          <span className="font-bold text-lg">
            {index + 1}. {todo.title}
          </span>
          - <span>Due By </span>
          <span className="text-xs text-gray-600">
            {new Date(todo.dueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
      )}

      <div className="flex gap-3"> {/* Increased the gap to 3 */}
        {isEditing ? (
          <button
            onClick={() => {
              if (newTitle.trim()) {
                editTodo(todo.id, newTitle, newDueDate, newChecked);
                setIsEditing(false);
              }
            }}
            className="text-green-600 hover:text-green-800 transition duration-200 transform hover:scale-150" // Added transition for smooth hover effect
          >
            ✔
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 transition duration-200 transform hover:scale-150">
            ✎
          </button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="text-red-600 hover:text-red-800 transition duration-200 transform hover:scale-150">
          🗑
        </button>
      </div>

    </div>
  );
};
