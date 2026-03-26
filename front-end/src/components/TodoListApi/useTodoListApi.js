import { useEffect, useState } from "react";

function useTodoListApi() {
  const initValue = [
    { id: 1, text: "Learn React", status: "pending" },
    { id: 2, text: "Build a todo app", status: "complete" },
    { id: 3, text: "Practice JavaScript", status: "progress" },
    { id: 4, text: "Read documentation", status: "complete" },
    { id: 5, text: "Write clean code", status: "pending" },
  ];

  // Sample todo data with state management
  const [todos, setTodos] = useState(initValue);

  // State for new todo input
  const [newTodoText, setNewTodoText] = useState("");

  // Function to handle creating new todo
  const handleCreateTodo = () => {
    if (newTodoText.trim() === "") return;

    const newTodo = {
      title: newTodoText.trim(),
    };

    fetch("http://localhost:3033/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Inform the server about the content type
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const dataList = res.data.map((item) => ({
          ...item,
          text: item.title,
        }));
        setTodos(dataList);
      })
      .catch((err) => console.error(err));

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
    fetch(`http://localhost:3033/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Inform the server about the content type
      },
      body: JSON.stringify({
        title: todos.find((obj) => obj.id === id)?.text || "",
        description: "",
        status: newStatus,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const dataList = res.data.map((item) => ({
          ...item,
          text: item.title,
        }));
        setTodos(dataList);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3033/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const dataList = res.data.map((item) => ({
          ...item,
          text: item.title,
        }));
        setTodos(dataList);
      })
      .catch((err) => console.error(err));
  };

  const [editing, setEditing] = useState({
    id: null,
    text: null,
    newText: null,
  });

  const handleSave = () => {
    fetch(`http://localhost:3033/todos/${editing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Inform the server about the content type
      },
      body: JSON.stringify({
        title: editing.newText,
        description: "",
        status: "pending",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const dataList = res.data.map((item) => ({
          ...item,
          text: item.title,
        }));
        setTodos(dataList);
      })
      .catch((err) => console.error(err));

    setEditing({
      text: null,
      id: null,
      newText: null,
    });
  };

  function fetchTodo() {
    fetch("http://localhost:3033/todos")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const dataList = res.data.map((item) => ({
          ...item,
          text: item.title,
        }));
        setTodos(dataList);
      })
      .catch((err) => console.error(err));
  }

  function handlePriorityChange({ id, priority, title, status }) {
    // Implement priority change logic here
    fetch(`http://localhost:3033/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Inform the server about the content type
      },
      body: JSON.stringify({
        title: title,
        description: "",
        status: status,
        priority: priority,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const dataList = res.data.map((item) => ({
          ...item,
          text: item.title,
        }));
        setTodos(dataList);
      })
      .catch((err) => console.error(err));
  }

  useEffect(fetchTodo, []);
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
    handlePriorityChange,
  };
}

export default useTodoListApi;
