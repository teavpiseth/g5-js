const express = require("express");
const router = express.Router();
const {
  validatePutTodo,
  validatePostTodo,
  validateIdParam,
} = require("./todoValidation");

let todos = [
  {
    id: 1,
    title: "Learn Express.js",
    description: "Build a REST API with Express",
    status: "in progress",
    priority: "H",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Create React app",
    description: "Build a frontend with React",
    status: "complete",
    priority: "M",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: 3,
    title: "Create todo app",
    description: "Build a frontend with React",
    status: "complete",
    priority: "L",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
];

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: todos,
    message: "Todos retrieved successfully",
  });
});

router.post("/", validatePostTodo, (req, res) => {
  const { title, description, status, priority } = req.validatedBody;

  const newTodo = {
    id: todos.length + 1,
    title: title,
    description: description || "Build a frontend with React",
    status: status,
    priority: priority,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todos.push(newTodo);

  res.json({
    success: true,
    data: todos,
    message: "Todo created successfully",
  });
});

const findTodoById = (id) => {
  return todos.find((todo) => todo.id === parseInt(id));
};

// PUT /todos/:id - Update a todo
router.put(
  "/:id",
  (req, res, next) => {
    console.log("Hello from middleware level 1");
    next();
  },
  validatePutTodo,
  (req, res) => {
    const todo = findTodoById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const { title, description, status, priority } = req.validatedBody;

    // Update fields if provided
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status !== undefined) todo.status = status;
    if (priority !== undefined) todo.priority = priority;
    todo.updatedAt = new Date();

    todos = todos.map((obj) => (obj.id === todo.id ? todo : obj));

    res.json({
      success: true,
      data: todo,
      message: "Todo updated successfully",
    });
  },
);

// DELETE /todos/:id - Delete a todo
router.delete("/:id", validateIdParam, (req, res) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.id === req.validatedParams.id,
  );

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  todos.splice(todoIndex, 1)[0];

  res.json({
    success: true,
    data: todos,
    message: "Todo deleted successfully",
  });
});

module.exports = router;
