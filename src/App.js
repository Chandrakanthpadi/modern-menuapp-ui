import logo from "./logo.svg";
import "./App.css";

import InitialPage from "./pages/InitialPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Menu from "./pages/Menu";
import AdminMenu from "./pages/AdminMenu";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InitialPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/restaurant/:restaurantId" element={<Menu />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/add" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default App;
