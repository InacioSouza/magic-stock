import { z } from 'zod';
import styles from './Login.module.css';
import Logo from '../../components/Logo/Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../api';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.email("Email inválido!"),
    password: z.string().nonempty("Informe a senha!"),
});

type LoginData = z.infer<typeof loginSchema>;

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const onSubmit = (data: LoginData) => {
        api.post("/auth/login", {
            email: data.email,
            password: data.password
        }).then(response => {
           
            toast.success("Login realizado!");
            login(response.data.access_token);
            navigate("/dashboard");

        }).catch(error => {
            console.error(error);
            toast.error("Falha ao realizar login!")
        })
    }

    return (
        <section>
            <Logo />

            <h1>Só mais um passo para a magia</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.login}>

                <div className={styles.field}>
                    <input {...register('email')} type="email" placeholder='Email' />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className={styles.field}>
                    <input {...register('password')} type="password" placeholder='Senha' />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button type='submit'>Entrar</button>
            </form>
        </section>
    );
}

export default Login;