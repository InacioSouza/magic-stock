import styles from './Footer.module.css';

const Footer = ({children}: any) => {

    let content = (
        <div className={styles.content}>
            <span>Developed by: Inácio Souza Rocha</span>
        </div>
    );
    
    if (children) content = children;

    return (
        <footer className={styles.footer}>
            {content}
        </footer>
    );
}

export default Footer;