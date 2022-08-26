import {
   createContext,
   ReactNode,
   useContext,
   useEffect,
   useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface User {
   id: string;
   name: string;
   token: string;
}

interface SignInProps {
   email: string;
   password: string;
}

interface AuthContextData {
   user: User;
   signIn: (credential: SignInProps) => Promise<void>;
   signOut: () => void;
   createUser: (data: User) => void;
}

interface AuthProviderProps {
   children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
   const navigate = useNavigate();
   const [user, setUser] = useState({} as User);

   useEffect(() => {
      async function getData() {
         try {
            const id = localStorage.getItem("webchat@id") as string;
            const name = localStorage.getItem("webchat@name") as string;
            const token = localStorage.getItem("webchat@token") as string;

            if (!token) return signOut();

            api.defaults.headers.common["Authorization"] = `${token}`;
            setUser({ id, name, token });
            navigate("/home");
         } catch (error) {
            signOut();
            return;
         }
      }

      getData();
   }, []);

   function createUser({ id, name, token }: User) {
      setUser({ id, name, token });

      api.defaults.headers.common["Authorization"] = `${token}`;
      localStorage.setItem("webchat@id", id);
      localStorage.setItem("webchat@name", name);
      localStorage.setItem("webchat@token", token);
      navigate("/home");
   }

   async function signIn(dataForm: SignInProps) {
      try {
         const { data } = await api.post("/users", dataForm);

         if (data.error) {
            toast.warning(data.message);
            return;
         }

         if (!data.error) {
            const objUser = {
               id: data.user.id,
               name: data.user.name,
               token: data.token,
            };
            createUser(objUser);
         }
      } catch (error) {
         toast.warning("E-mail ou senha incorretos");
      }
   }

   function signOut() {
      localStorage.removeItem("webchat@name");
      localStorage.removeItem("webchat@token");
      localStorage.removeItem("webchat@id");

      setUser({} as User);
      navigate("/");
   }

   return (
      <AuthContext.Provider value={{ user, signIn, signOut, createUser }}>
         {children}
      </AuthContext.Provider>
   );
}

function useAuth(): AuthContextData {
   const context = useContext(AuthContext);

   return context;
}

export { AuthProvider, useAuth };
