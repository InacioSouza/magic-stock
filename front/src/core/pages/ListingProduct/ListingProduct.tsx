import styles from './ListingProduct.module.css';
import ProductFilter from '../../layouts/product/ProductFilter/ProductFilter';
import { ProductFilterDTO } from '../../model/dto/product-filter';
import { useEffect, useState } from 'react';
import ProductTable from '../../layouts/product/ProductTable/ProductTable';
import { api } from '../../api';
import { toast } from 'react-toastify';
import { Product } from '../../model/Product';
import Swal from 'sweetalert2';
import Popup from '../../components/Popup/Popup';
import ProductForm from '../../layouts/product/ProductForm/ProductForm';

const ListingProduct = () => {

    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [stateFilter, setStateFilter] = useState<ProductFilterDTO>();
    const [numberPages, setNumberPages] = useState<number>();
    const [product, setProduct] = useState<Product>(new Product());
    const [visibleEditing, setVisibleEditing] = useState<boolean>(false);

    useEffect(() => {
        
    }, [visibleEditing]);

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

    const onEditRecord = (idProduct: number) => {
        api.get(`/product/${idProduct}`)
            .then(result => {
                setProduct(result.data);
                setVisibleEditing(true);
            })
            .catch(error => {
                console.error(error);
                toast.error('Falha ao buscar informações do produto!');
            });

    };

    const onDeleteRecord = async (idRecord: number) => {
        const result = await Swal.fire({
            title: 'Deseja mesmo excluir o registro?',
            text: 'Essa ação não pode ser revertida',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir'
        });

        if (result.isConfirmed) {
            const newListProduct = listProduct.filter(product => product.id != idRecord);
            setListProduct(newListProduct);
        }
    }

    const onSubmitEditForm = (product: any) => {
        console.log(product);
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

            <Popup
                title='Edição de Produto'
                disableSaveBtn={true}
                changeVisible={setVisibleEditing}
                visible={visibleEditing}
            >
                <ProductForm
                    onSubmit={onSubmitEditForm}
                    currentStatusProduct={product} />
            </Popup>

        </div>
    );
}

export default ListingProduct;