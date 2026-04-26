
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

import styles from './PrivateRoute.module.css';
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo";
import SimpleLink from "../components/Link/Link";

const PrivateRoute = ({ children }: any) => {
    const token = useAuthStore((state) => state.access_token);

    if (!token) return <Navigate to="/login" />

    const [open, setOpen] = useState(false);

    return (
        <>

        <Header> 
            <div className={styles.cabecalho}>
                <Logo small={true}/>
            </div>
        </Header>

            <button
                className={styles.menuButton}
                onClick={() => setOpen(!open)}
            >
                { open ? <FiX size={24}/> : <FiMenu size={24}/> }
            </button>

            <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
                <nav>
                    <SimpleLink href='/categorias'>Categorias</SimpleLink>
                    <SimpleLink href='/produtos'>Produtos</SimpleLink>
                    <SimpleLink href='/movimentacoes'>Movimentações</SimpleLink>
                </nav>
            </aside>

            {children}
        </>
    );
}

export default PrivateRoute;