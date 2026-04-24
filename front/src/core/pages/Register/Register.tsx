import { z } from 'zod';

import styles from './Register.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../components/Logo/Logo';

const registerSchema = z.object({
    email: z.email("Email inválido!"),
    password: z.string().min(6, "Mínimo de 6 caracteres!"),
    confirmPassword: z.string(),
    userName: z.string().nonempty("Informe o nome do administrador!").transform(val => val.trim()),
    enterpriseName: z.string().nonempty("Informe o nome da empresa!").transform(val => val.trim())
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            message: "Senhas não conferem!",
            code: "custom"
        });
    }
});

type RegisterData = z.infer<typeof registerSchema>;

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    });

    const navigate = useNavigate();

    const onSubmit = (data: RegisterData) => {
        api.post("/enterprise", {
            enterpriseName: data.enterpriseName,
            userName: data.userName,
            email: data.email,
            password: data.password

        }).then(response => {
            toast.success('Registro criado!')
            navigate("/login");

        }).catch(error => {
            console.error(error);
            toast.error('Falha ao criar registro!')
        });
    }

    return (
        <section>
            <Logo/>

            <h1>Registre-se para conhecer a eficiência</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.register}>

                <div className={styles.field}>
                    <input {...register("enterpriseName")} placeholder="Nome empresa" />
                    {errors.enterpriseName && <span>{errors.enterpriseName.message}</span>}
                </div>

                <div className={styles.field}>
                    <input {...register("userName")} placeholder="Nome administrador" />
                    {errors.userName && <span>{errors.userName.message}</span>}
                </div>

                <div className={styles.field}>
                    <input {...register("email")} placeholder="Email" />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className={styles.field}>
                    <input {...register("password")} type='password' placeholder="Senha" />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <div className={styles.field}>
                    <input {...register("confirmPassword")} type='password' placeholder="Confirme a senha" />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>

                <button type='submit'>Registrar</button>
            </form>

        </section>
    );
}

export default Register;