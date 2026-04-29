import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import StateAsSnapshot from "./lesson/interactivity/StateAsSnapshot";

import { BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import QNA from "./components/QNA";
import TodoList from "./components/TodoList";
import TodoListApi from "./components/TodoListApi";
import DashboardLayout from "./layout/DashboardLayout";
import Category from "./modules/dashboard/Category";
import Customer from "./modules/dashboard/Customer";
import DashboardLogin from "./modules/dashboard/Login";
import Product from "./modules/dashboard/Product";
import ProductVariant from "./modules/dashboard/Product/ProductVariant";
import User from "./modules/dashboard/User";
import { isDashboardAuthenticated } from "./modules/dashboard/auth";
import "./service/AxiosInterceptor";

function App() {
  return (
    <>
      {/* // context */}
      <BrowserRouter>
        {/* <nav style={{ padding: "20px", textAlign: "center" }}>
          <Link to="/" style={{ margin: "0 10px" }}>
            Home
          </Link>
        </nav> */}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/qna" element={<QNA />} />
          <Route path="/accordion" element={<div>Hello</div>} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo-api" element={<TodoListApi />} />
          <Route path="/state-snapshot" element={<StateAsSnapshot />} />
          <Route
            path="/dashboard/login"
            element={
              isDashboardAuthenticated() ? (
                <Navigate to="/dashboard/category" replace />
              ) : (
                <DashboardLogin />
              )
            }
          />
          {/* dashboard/purchase */}
          <Route
            path="/dashboard"
            element={
              isDashboardAuthenticated() ? (
                <DashboardLayout />
              ) : (
                <Navigate to="/dashboard/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="category" replace />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="product/variants/:id" element={<ProductVariant />} />
            <Route path="user" element={<User />} />
            <Route path="customer" element={<Customer />} />
          </Route>
          <Route path="/:categoryId" element={<div>Category ID:</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
