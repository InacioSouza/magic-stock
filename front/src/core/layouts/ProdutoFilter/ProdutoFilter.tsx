import { useState } from 'react';
import Filter from '../../components/Filter/Filter';
import styles from './ProdutoFilter.module.css'
import Field from '../../components/Field/Field';

type ProdutoFilterProps = {
    action: (variable: any) => void;
}

const ProdutoFilter = ({ action }: ProdutoFilterProps) => {

    const [filter, setFilter] = useState({
        name: '',
        description: '',
        price: '',
        amount: '',
        active: '',
        category: ''
    });

    const handleChangeFilter = (e: any) => {
        const { name, value } = e.target;

        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFilter = () => {

        filter;

        // Aqui vai a lista de objetos
        action([]);
    }

    return (
        <Filter
            model='Produtos'
            onClick={onFilter}
        >
            <div className={styles.filter}>

                <Field
                    id='name'
                    name='name'
                    value={filter.name}
                    label='Nome'
                    onChange={handleChangeFilter}
                    placeholder='Informe o nome'
                />

                <Field
                    id='description'
                    name='description'
                    value={filter.description}
                    label='Descrição'
                    onChange={handleChangeFilter}
                    placeholder='Informe a descrição'
                />

                <Field
                    id='price'
                    name='price'
                    value={filter.price}
                    label='Preço R$'
                    onChange={handleChangeFilter}
                    placeholder='Informe o preço'
                    type='number'
                    min={1}
                >
                </Field>

                <Field
                    id='amount'
                    name='amount'
                    value={filter.amount}
                    label='Quantidade'
                    onChange={handleChangeFilter}
                    placeholder='Informe a quantidade'
                    type='number'
                    min={0}
                >
                </Field>
            </div>
        </Filter>
    );
}

export default ProdutoFilter;