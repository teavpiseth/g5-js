import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import reactLogo from "./assets/react.svg";
import StateAsSnapshot from "./lesson/interactivity/StateAsSnapshot";

import { BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import QNA from "./components/QNA";
import TodoList from "./components/TodoList";
import TodoListApi from "./components/TodoListApi";

function App() {
  return (
    <>
      {/* // context */}
      <BrowserRouter>
        <img
          src={reactLogo}
          style={{ margin: "auto" }}
          className="logo react"
          alt="React logo"
        />

        <nav style={{ padding: "20px", textAlign: "center" }}>
          <Link to="/" style={{ margin: "0 10px" }}>
            Home
          </Link>
          <Link to="/qna" style={{ margin: "0 10px" }}>
            QNA
          </Link>
          <Link to="/accordion" style={{ margin: "0 10px" }}>
            Accordion
          </Link>
          <Link to="/todo" style={{ margin: "0 10px" }}>
            Todo List
          </Link>
          <Link to="/todo-api" style={{ margin: "0 10px" }}>
            Todo List API
          </Link>
          <Link to="/state-snapshot" style={{ margin: "0 10px" }}>
            State Snapshot
          </Link>
          <a href="/" style={{ margin: "0 10px" }}>
            Home
          </a>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/qna" element={<QNA />} />
          <Route path="/accordion" element={<div>Hello</div>} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo-api" element={<TodoListApi />} />
          <Route path="/state-snapshot" element={<StateAsSnapshot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
