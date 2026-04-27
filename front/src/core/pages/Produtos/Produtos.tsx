import { useState } from 'react';
import ProdutoFilter from '../../layouts/ProdutoFilter/ProdutoFilter';
import styles from './Produtos.module.css'

const Produtos = () => {

    const [listProdutos, setListProdutos] = useState([]);

    const onFilter = (produtos: any) => {
        setListProdutos(produtos);
    }

    return (
        <div className={styles.produtos}>
            <ProdutoFilter action={onFilter} />

            {listProdutos}
        </div>
    );
}

export default Produtos;