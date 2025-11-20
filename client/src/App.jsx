import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import HomePage from "./pages/main/home-page";

const App = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
