import { Pagination } from '../../components/Pagination/Pagination';
import type { Product } from '../../model/Product';
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
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Quantidade</th>
                        <th>Ativo</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listRecords && listRecords.map(product => 
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.amount}</td>
                                <td>{product.active ? "Sim" : "Não"}</td>
                                <td><button onClick={() => onEdit(product.id)}>Editar</button></td>
                                <td><button onClick={() => onDelete(product.id)}>Deletar</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {
                numberPages &&
                <Pagination
                totalPages={numberPages}
                onPageChange={onNewPage}
            />
            }
        </div>
    );
}

export default ProductTable;