import { Route, Routes } from "react-router-dom";
import { Login } from "../screens/Login";

export function AuthRoutes() {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
      </Routes>
   );
}
