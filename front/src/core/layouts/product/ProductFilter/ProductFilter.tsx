import { useState } from 'react';
import Filter from '../../../components/Filter/Filter';
import styles from './ProductFilter.module.css'
import Field from '../../../components/Field/Field';
import { toast } from 'react-toastify';
import { api } from '../../../api';
import { ProductFilterDTO } from '../../../model/dto/product-filter';

type ProductFilterProps = {
    action: (response: any, stateFilter?: ProductFilterDTO) => void;
}

const ProductFilter = ({ action }: ProductFilterProps) => {

    const [filter, setFilter] = useState<ProductFilterDTO>({
        name: '',
        description: '',
        price: undefined,
        amount: undefined,
        active: true,
        category: undefined
    });

    const [disableBtnFilter, setDisableBtnFilter] = useState(false);

    const handleChangeFilter = (e: any) => {
        const { name, value } = e.target;

        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFilter = () => {

        setDisableBtnFilter(true);

        api.post('/product/by-properties', {
            ...filter
        }).then( response => {

            action(response, filter);
            setDisableBtnFilter(false);

        }).catch(error => {
            console.error(error);
            toast.error('Falha ao buscar produtos!');
            setDisableBtnFilter(false);

        });
    }

    return (
        <Filter
            model='Produtos'
            disableBtn={disableBtnFilter}
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

export default ProductFilter;