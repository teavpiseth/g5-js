import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import StateAsSnapshot from "./lesson/interactivity/StateAsSnapshot";

import { BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import QNA from "./components/QNA";
import TodoList from "./components/TodoList";
import TodoListApi from "./components/TodoListApi";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <>
      {/* // context */}
      <BrowserRouter>
        <nav style={{ padding: "20px", textAlign: "center" }}>
          <Link to="/" style={{ margin: "0 10px" }}>
            Home
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/qna" element={<QNA />} />
          <Route path="/accordion" element={<div>Hello</div>} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo-api" element={<TodoListApi />} />
          <Route path="/state-snapshot" element={<StateAsSnapshot />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
