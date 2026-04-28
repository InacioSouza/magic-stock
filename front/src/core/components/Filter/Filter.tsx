import type React from 'react';
import styles from './Filter.module.css'

type FilterProps = {
    disableBtn: boolean,
    model: string,
    children: React.ReactNode,
    onClick: () => void
}

const Filter = ({
    disableBtn,
    model,
    children,
    onClick
}: FilterProps) => {

    return (
        <div className={styles.filter}>
            <h3>Filtro de {model}</h3>

            {children}

            <button
                onClick={onClick}
                disabled={disableBtn}
                className={`${styles.btn} ${ disableBtn ? styles.disable : ''} `}    
            >
                Filtrar
            </button>

        </div>
    );
}

export default Filter;