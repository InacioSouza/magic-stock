import styles from './Dashboard.module.css';

const Dashboard = () => {

    return (

        <div className={styles.dashboard}>
            <h2>Bem vindo de volta!</h2>
            <p>Para onde vamos agora?</p>
            <nav>
                <button>Categorias</button>
                <button>Produtos</button>
                <button>Movimentações</button>
            </nav>
        </div>

    );
}

export default Dashboard;