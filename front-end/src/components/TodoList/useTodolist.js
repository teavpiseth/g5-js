import { useEffect, useState } from "react";

function useTodoList() {
  const initValue = [
    { id: 1, text: "Learn React", status: "pending" },
    { id: 2, text: "Build a todo app", status: "complete" },
    { id: 3, text: "Practice JavaScript", status: "progress" },
    { id: 4, text: "Read documentation", status: "complete" },
    { id: 5, text: "Write clean code", status: "pending" },
  ];
  const valueFromLocalStorage = localStorage.getItem("todo");
  // Sample todo data with state management
  const [todos, setTodos] = useState(
    valueFromLocalStorage ? JSON.parse(valueFromLocalStorage) : initValue,
  );

  // State for new todo input
  const [newTodoText, setNewTodoText] = useState("");

  // Function to handle creating new todo
  const handleCreateTodo = () => {
    if (newTodoText.trim() === "") return;

    const newTodo = {
      id: todos.length + 1,
      text: newTodoText.trim(),
      status: "pending",
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateTodo();
    }
  };

  // Helper function to get status display info
  const getStatusInfo = (status) => {
    switch (status) {
      case "complete":
        return {
          label: "✓ Complete",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          bgTrColor: "bg-green-50",
        };
      case "progress":
        return {
          label: "🔄 In Progress",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          bgTrColor: "bg-blue-50",
        };
      case "pending":
      default:
        return {
          label: "⏳ Pending",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          bgTrColor: "bg-yellow-50",
        };
    }
  };

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    setTodos((prev) => {
      return prev.map((obj) => {
        return obj.id === id ? { ...obj, status: newStatus } : obj;
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((obj) => obj.id != id));
  };

  const [editing, setEditing] = useState({
    id: null,
    text: null,
    newText: null,
  });

  const handleSave = () => {
    setTodos((prev) => {
      const newData = prev.map((todo) => {
        if (todo.id === editing.id) {
          return { ...todo, text: editing.newText };
        }
        return { ...todo };
      });
      return newData;
    });
    setEditing({
      text: null,
      id: null,
      newText: null,
    });
  };

  function cbFunction() {
    localStorage.setItem("todo", JSON.stringify(todos));
  }

  useEffect(cbFunction, [todos]);
  // didmount
  // didupdate

  return {
    handleStatusChange,
    handleSave,
    handleDelete,
    handleKeyPress,
    todos,
    setTodos,
    newTodoText,
    setNewTodoText,
    handleCreateTodo,
    editing,
    setEditing,
    getStatusInfo,
  };
}

export default useTodoList;
