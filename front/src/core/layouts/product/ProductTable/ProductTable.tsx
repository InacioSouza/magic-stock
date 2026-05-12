import ButtonDelete from '../../../components/ButtonDelete/ButtonDelete';
import ButtonEdit from '../../../components/ButtonEdit/ButtonEdit';
import { Pagination } from '../../../components/Pagination/Pagination';
import type { Product } from '../../../model/Product';
import styles from './ProductTable.module.css';

type ProductTableProps = {
    listRecords: Product[];
    numberPages?: number;
    onNewPage: (page: number) => void;
    onEdit: (idRecord: number) => void;
    onDelete: (idRecord: number) => void;
};

const ProductTable = ({
    listRecords,
    numberPages,
    onNewPage,
    onEdit,
    onDelete
}: ProductTableProps) => {

    return (
        <div className={styles.registerTable}>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço R$</th>
                        <th>Categoria</th>
                        <th>Quantidade</th>
                        <th>Ativo</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listRecords && listRecords.map(product =>
                            <tr key={product.id}>
                                <td title={product.name.length > 25 ? product.name : ''}>{product.name}</td>
                                <td
                                    title={product.description.length > 25 ? product.description : ''}
                                >
                                    {product.description}
                                </td>
                                <td style={{ textAlign: 'center' }}>{product.price.toLocaleString('pt-br')}</td>
                                <td>{product.category.name}</td>
                                <td style={{ textAlign: 'center' }}>{product.amount}</td>
                                <td style={{ textAlign: 'center' }}>{product.active ? "Sim" : "Não"}</td>

                                <td>
                                    <ButtonEdit
                                        onClick={() => onEdit(product.id)}>
                                    </ButtonEdit>
                                </td>

                                <td>
                                    <ButtonDelete
                                        onClick={() => onDelete(product.id)}>
                                    </ButtonDelete>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {
                (listRecords.length == 0) &&
                <span className={styles.noData}>Sem dados</span>
            }

            {
                (numberPages != undefined && numberPages !== 0) ?
                    <Pagination
                        totalPages={numberPages}
                        onPageChange={onNewPage}
                    />
                    :
                    ""
            }
        </div>
    );
}

export default ProductTable;