import styles from './Logo.module.css';

type LogoType = {
    small?: boolean
}

const Logo = ({ small = false }: LogoType) => {
    return (
        <div className={`${styles.logo} ${small ? styles.logo_small : ""}`}>
            <span className={`${styles.magic} ${small ? styles.magic_min : styles.magic_large}`} >Magic ...</span>
            <span className={`${styles.stock} ${small ? styles.stock_min : styles.stock_large}`}>... Stock</span>
        </div>
    );
}

export default Logo;