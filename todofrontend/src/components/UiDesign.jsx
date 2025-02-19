import React, { useState } from "react";

export const UiDesign = ({ addTodo, searchTodos, filterByDueDate, totalreset }) => {
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className="bg-[#758AA2] p-5 flex flex-col gap-3 rounded-t-xl">
      {/* Add Task Input */}
      <div className="flex gap-3">
        <input
          className="p-2 rounded-md w-full outline-none px-5 text-black"
          placeholder="Add New Task"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><span>Due Date:</span>
        <input
          className="p-2 rounded-md outline-none px-5 text-black"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          onClick={() => {
            if (title.trim()) { // Check both title and due date
              addTodo(title, dueDate); // Pass both title and due date to addTodo
              setTitle("");
              setDueDate(""); // Clear due date input
            }
          }}
          className="py-2 px-5 rounded-md bg-[#2B2B52] text-white"
        >
          Add
        </button>
      </div>

      {/* Search and Date Filter */}
      <div className="flex gap-3">
        <input
          className="p-2 rounded-md w-full outline-none px-5 text-black"
          placeholder="Search by title"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchTodos(e.target.value);
          }}
        /><span>Filter By Due Date</span>
        <input
          className="p-2 rounded-md outline-none px-5 text-black"
          type="date"
          onChange={(e) => {
            if(e.target.value){
              filterByDueDate(e.target.value);
            }else{
              totalreset();
            }
            
          }}
        />
      </div>
    </div>
  );
};
