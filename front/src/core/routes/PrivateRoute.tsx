
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

import styles from './PrivateRoute.module.css';
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo";
import SimpleLink from "../components/Link/Link";
import type { PayloadToken } from "../model/dto/payload-token";

type PrivateRouteProps = {
    children: React.ReactNode,
    routeAdmin?: boolean
}

const PrivateRoute = ({ children, routeAdmin }: PrivateRouteProps) => {

    let isAdmin = false;

    try {
        const token = useAuthStore((state) => state.access_token);
        if (!token) {
            return <Navigate to="/login" />
        }
        const payload: PayloadToken = useAuthStore().getPayload();
        isAdmin = payload?.userRole === 'ADMIN';

        if (routeAdmin && !isAdmin) {
            return <Navigate to="/login" />
        }

    } catch (error) {
        console.error("Token inválido ou expirado", error);
        return <Navigate to="/login" />
    }

    const [open, setOpen] = useState(false);

    return (
        <>

            <Header>
                <div className={styles.cabecalho}>
                    <Logo small={true} />
                </div>
            </Header>

            <button
                className={styles.menuButton}
                onClick={() => setOpen(!open)}
            >
                {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
                <nav>
                    <section>
                        <h2>Produtos</h2>
                        <SimpleLink href='/produtos'>Listagem</SimpleLink>
                        {isAdmin ? <SimpleLink href='/cadastro-produtos'>Cadastro</SimpleLink> : ""}
                    </section>

                    <section>
                        <h2>Categorias</h2>
                        <SimpleLink href='/categorias'>Listagem</SimpleLink>
                        {isAdmin ? <SimpleLink href='/cadastro-categorias'>Cadastro</SimpleLink> : ""}
                    </section>

                    <section>
                        <h2>Movimentações</h2>
                        <SimpleLink href='/movimentacoes'>Listagem</SimpleLink>
                        {isAdmin ? <SimpleLink href='/cadastro-movimentacoes'>Cadastro</SimpleLink> : ""}
                    </section>

                    {
                        isAdmin ? 
                        <section>
                            <h2>Usuários</h2>
                            <SimpleLink href='/usuarios'>Listagem</SimpleLink>
                            <SimpleLink href='/cadastro-usuarios'>Cadastro</SimpleLink>
                        </section>
                        : ""
                    }

                    <section>
                        <h2>Perfil</h2>
                        <SimpleLink href='/config-perfil'>Configurações</SimpleLink>
                    </section>
                </nav>
            </aside>

            {children}
        </>
    );
}

export default PrivateRoute;