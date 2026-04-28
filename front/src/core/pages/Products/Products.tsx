import styles from './Products.module.css';
import ProductFilter from '../../layouts/ProductFilter/ProductFilter';
import { ProductFilterDTO } from '../../model/dto/product-filter';
import { useState } from 'react';
import ProductTable from '../../layouts/ProductTable/ProductTable';
import { api } from '../../api';
import { toast } from 'react-toastify';
import type { Product } from '../../model/Product';
import Swal from 'sweetalert2';

const Products = () => {

    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [stateFilter, setStateFilter] = useState<ProductFilterDTO>();
    const [numberPages, setNumberPages] = useState<number>();

    const onFilter = (response: any, stateFilter?: ProductFilterDTO) => {
        setListProduct(response.data.data);
        setStateFilter(stateFilter);
        setNumberPages(response.data.meta.lastPage);
    }

    const onNewRecordsByPagination = (page: number) => {

        api.post(`/product/by-properties?page=${page}`, {
            ...stateFilter
        }).then(response => {

            setListProduct(response.data.data);
            setNumberPages(response.data.meta.lastPage);

        }).catch(error => {
            console.error(error);
            toast.error('Falha ao buscar produtos!');
        });
    }

    const onEditRecord = (idRecord: number) => {
        console.log('Edit: ' + idRecord)
    };

    const onDeleteRecord = async (idRecord:number) => {
        const result = await Swal.fire({
            title: 'Deseja mesmo excluir o registro?',
            text: 'Essa ação não pode ser revertida',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir'
        });

        if (result.isConfirmed) {
            console.log('deletado!');
            const newListProduct = listProduct.filter(product => product.id != idRecord);
        setListProduct(newListProduct);
        }
    }

    return (
        <div className={styles.products}>
            <ProductFilter action={onFilter} />
            <ProductTable
                listRecords={listProduct}
                numberPages={numberPages}
                onNewPage={onNewRecordsByPagination}
                onEdit={onEditRecord}
                onDelete={onDeleteRecord}
            />
        </div>
    );
}

export default Products;