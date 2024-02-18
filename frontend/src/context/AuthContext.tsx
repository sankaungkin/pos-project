// AuthContext.tsx

import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (payload: LoginType) => Promise<void>;
  logout: () => void;
  reg: (payload: RegisterType) => Promise<void>;
}

type UserType = {
  id: number;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};
interface Props {
  children: React.ReactNode;
}
type LoginType = {
  email: string;
  password: string;
};
type RegisterType = {
  username: string;
  email: string;
  password: string;
};
export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async (payload: LoginType) => {
    console.log(payload);
  },
  logout: () => {},
  reg: async (payload: RegisterType) => {
    console.log("register: ", payload);
  },
});

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (payload: LoginType) => {
    try {
      const result = await axios.post(
        "http://localhost:5555/auth/signin",
        payload,
        {
          withCredentials: true,
        }
      );

      const apiResponse = await axios.get(
        "http://localhost:5555/auth/profile/",
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
      setUser(apiResponse.data);
      navigate("/");

      // console.log(response.data);
      // Simulate a login request (replace with your API call)
      // Here, we'll assume a successful login if the username and password match "demo"
      if (result.status === 201) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.get("http://localhost:5555/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("userProfile");
      navigate("/login");
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  const reg = async (payload: RegisterType) => {
    try {
      const result = await axios.post(
        "http://localhost:5555/auth/signup",
        payload,
        {
          withCredentials: true,
        }
      );

      // console.log(response.data);
      // Simulate a login request (replace with your API call)
      // Here, we'll assume a successful login if the username and password match "demo"
      if (result.status === 201) {
        alert("Register successfully...");
        navigate("/login");
      } else {
        throw new Error("Invalid information");
      }
    } catch (error) {
      throw new Error("Register error");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, reg }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
