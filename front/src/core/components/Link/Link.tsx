
import styles from './Link.module.css';

type LinkType = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const SimpleLink = ({children, ...rest}: LinkType) => {
    return (
        <a {...rest} className={styles.link}>
            {children}
        </a>
    );
} 

export default SimpleLink;