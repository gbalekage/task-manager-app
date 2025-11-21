import { createContext, useState, useEffect } from "react";
import api from "@/lib/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("userId");
      console.log("Id", id);
      if (!id) return;
      try {
        const res = await api.get(`/auth/user/${id}`);
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
