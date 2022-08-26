import { FiLock, FiMail, FiSave, FiUser } from "react-icons/fi";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.css";
import chatImg from "../../assets/chat-img1.svg";
import { CustomInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {
   name: string;
   email: string;
   password: string;
}

const schema = object({
   name: string().required("Nome obrigatório").min(2),
   email: string().required("E-mail obrigatório").email("E-mail inválido"),
   password: string()
      .required("Senha obrigatória")
      .min(6, "Informar pelo menos 6 caracteres"),
}).required();

export function Register() {
   const { createUser } = useAuth();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterProps>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (dataForm: RegisterProps) => {
      try {
         const { data, status } = await api.post("/users/register", dataForm);
         if (status === 201) {
            toast.success("Usuário criado com sucesso");

            const objUser = {
               id: data.user.id,
               name: data.user.name,
               token: data.token,
            };
            createUser(objUser);
         }
      } catch (error: any) {
         console.log(error);

         toast.warning(error.response.data.error);
      }
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
                  {...register("name")}
                  label="Nome"
                  Icon={FiUser}
                  error={errors.name}
               />

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
                  title="Cadastrar"
                  type="submit"
                  icon={<FiSave />}
               />

               <Link className="links" to="/">
                  voltar para tela de login
               </Link>
               <div className={styles.dialog}></div>
            </form>
         </div>
      </div>
   );
}
