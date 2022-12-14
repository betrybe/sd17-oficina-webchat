import { FiLock, FiMail, FiSend } from "react-icons/fi";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.css";
import chatImg from "../../assets/chat-img1.svg";
import { CustomInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";

interface SignInProps {
   email: string;
   password: string;
}

const schema = object({
   email: string().required("Email obrigatório").email("E-mail inválido"),
   password: string()
      .required("Senha obrigatória")
      .min(6, "Informar pelo menos 6 caracteres"),
}).required();

export function Login() {
   const { signIn } = useAuth();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignInProps>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (dataForm: SignInProps) => {
      signIn(dataForm);
   };

   return (
      <div className="container">
         <img className={styles.img} src={chatImg} alt="Imagem de chat" />
         <div>
            <form
               autoComplete="off"
               className="content"
               onSubmit={handleSubmit(onSubmit)}
            >
               <h1 data-text="chat with us" className={styles.title}>
                  chat with us
               </h1>
               <CustomInput
                  {...register("email")}
                  label="E-mail"
                  Icon={FiMail}
                  error={errors.email}
               />

               <CustomInput
                  type="password"
                  {...register("password")}
                  label="Senha"
                  Icon={FiLock}
                  error={errors.password}
               />

               <Button
                  style={{ width: "100%", marginBottom: 20 }}
                  title="Entrar"
                  type="submit"
                  icon={<FiSend />}
               />

               <Link className="links" to="/register">
                  criar uma conta
               </Link>
               <div className={styles.dialog}></div>
            </form>
         </div>
      </div>
   );
}
