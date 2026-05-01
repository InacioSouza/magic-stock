import styles from './ButtonEdit.module.css'; 

type ButtonEditProps = {
    content?: any;
    onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonEdit = ({content = "Editar", onClick, ...rest}: ButtonEditProps) => {
    return (
        <button 
            onClick={onClick}
            {...rest}
            className={styles.btnEdit}
        >
            {content}
        </button>
    );
}

export default ButtonEdit;