import styles from './Header.module.css';

const Header = ({children}: any) => {

    return (
        <header className={styles.header}>
            {children}
        </header>
    );
}

export default Header;