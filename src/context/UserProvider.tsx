import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/interfaces";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext<{ User: IUser | null } | undefined>(
  undefined
);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response;
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ User: userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }

  const { User } = context;
  return User;
};
