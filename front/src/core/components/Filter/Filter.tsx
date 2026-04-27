import type React from 'react';
import styles from './Filter.module.css'

type FilterProps = {
    model: string,
    children: React.ReactNode,
    onClick: () => void
}

const Filter = ({model, children, onClick}: FilterProps) => {

    return (
        <div className={styles.filter}>
            <h3>Filtro de {model}</h3>

            {children}

            <button onClick={onClick}>Filtrar</button>

        </div>
    );
}

export default Filter;