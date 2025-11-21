import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import HomePage from "./pages/main/home-page";
import { Toaster } from "sonner";
import RequireAuth from "./components/protectedRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="auth">
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>

        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>

      <Toaster
        position="bottom-center"
        richColors
        closeButton={true}
        toastOptions={{
          style: {
            fontSize: "0.8rem",
            padding: "0.5rem 1rem",
            minWidth: "200px",
          },
        }}
      />
    </>
  );
};

export default App;
