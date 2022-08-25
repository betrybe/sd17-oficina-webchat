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
            const name = localStorage.getItem("webchat@name") as string;
            const token = localStorage.getItem("webchat@token") as string;

            if (!token) return signOut();

            setUser({ name, token });
            navigate("/home");
         } catch (error) {
            signOut();
            return;
         }
      }

      getData();
   }, []);

   function createUser({name, token}: User) {
      setUser({ name, token });

      api.defaults.headers.common['Authorization'] = `${token}`;
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
            createUser(data);
         }
      } catch (error) {
         toast.warning('E-mail ou senha incorretos');
      }
   }

   function signOut() {
      localStorage.removeItem("webchat@name");
      localStorage.removeItem("webchat@token");

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
