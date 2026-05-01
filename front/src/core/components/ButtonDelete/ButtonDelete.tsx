import styles from './ButtonDelete.module.css';

type ButtonDeleteProps = {
    content?: any;
    onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonDelete = ({content = "Deletar", onClick, ...rest}: ButtonDeleteProps) => {

    return (
        <button 
            onClick={onClick}
            {...rest}
            className={styles.btnDelete}
        >
            {content}
        </button>
    );
}

export default ButtonDelete;