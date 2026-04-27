import styles from './Field.module.css';

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string,
    label?: string;
    onlyPositive?: boolean
};

const Field = ({
    id,
    label = 'Campo de entrada',
    placeholder = 'Informe o valor do campo',
    type = 'text',
    onlyPositive = true,
    ...rest
}: FieldProps) => {

    return (
        <div className={styles.field}>
            <label htmlFor={id}>
                {`${label}:`}
            </label>
            <input
                id={id}
                placeholder={placeholder}
                type={type}
                {...rest}
            />
        </div>
    );
}

export default Field;