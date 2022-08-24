import { FiSend, FiUser } from "react-icons/fi";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.css";
import chatImg from "../../assets/chat-img1.svg";
import { CustomInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";

interface SignInProps {
   name: string;
}

const schema = object({
   name: string().required("Nome obrigatório").min(2),
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
      console.log(dataForm);
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
               <Button
                  style={{ width: "100%" }}
                  title="Entrar"
                  type="submit"
                  icon={<FiSend />}
               />
               <div className={styles.dialog}></div>
            </form>
         </div>
      </div>
   );
}
