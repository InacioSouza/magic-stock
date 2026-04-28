import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {

    const navigate = useNavigate();

    return (

        <div className={styles.dashboard}>
            <h2>Bem vindo de volta!</h2>
            <p>Para onde vamos agora?</p>
            <nav>
                <button onClick={ () => navigate('/categorias') }>Categorias</button>
                <button onClick={ () => navigate('/produtos') }>Produtos</button>
                <button onClick={ () => navigate('/movimentacoes') }>Movimentações</button>
            </nav>
        </div>

    );
}

export default Dashboard;