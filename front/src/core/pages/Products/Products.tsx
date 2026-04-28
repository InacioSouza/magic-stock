import styles from './Products.module.css';
import ProductFilter from '../../layouts/ProductFilter/ProductFilter';
import { ProductFilterDTO } from '../../model/dto/product-filter';

const Products = () => {

    const onFilter = (response: any, stateFilter?: ProductFilterDTO) => {
        console.log(response);
        console.log(stateFilter);
    }

    return (
        <div className={styles.products}>
            <ProductFilter action={onFilter} />
        </div>
    );
}

export default Products;