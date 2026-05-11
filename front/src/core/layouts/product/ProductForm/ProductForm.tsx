import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../../model/Product";
import z from 'zod';
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import styles from './ProductForm.module.css';
import SelectEntity from "../../../components/SelectEntity/SelectEntity";
import type { Category } from "../../../model/Category";
import { api } from "../../../api";
import { toast } from "react-toastify";

type ProductFormProps = {
    currentStatusProduct?: Product;
    onSubmit: (product: any) => void
}

type productFormDataInput = z.input<typeof productSchemaZod>

export const productSchemaZod = z.object({
    name: z.string().nonempty("Insira um nome para o produto!"),
    description: z.string(),
    price: z.coerce.number().min(0.01, "O preço mínimo é de R$0,01!"),
    amount: z.coerce.number().min(1, "A quantidade mínima é de 1 item!"),
    active: z.boolean().nonoptional("Deve ser informado se o produto está ativo!"),
    categoryID: z.number().nonoptional("A categoria deve ser informada!") 
});

const ProductForm = ({
    currentStatusProduct,
    onSubmit
}: ProductFormProps) => {

    const [listCategory, setListCategory] = useState<Category[]>([]);

    useEffect(() => {
        api.get("/category/registers/all")
            .then(result => {
                setListCategory(result.data.data);
            }).catch(error => {
                console.error(error);
                toast.error("Falha ao buscar categorias!")
            })
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<productFormDataInput>({
        resolver: zodResolver(productSchemaZod),
    });

    useEffect(() => {
        reset({
            name: currentStatusProduct?.name,
            description: currentStatusProduct?.description,
            price: currentStatusProduct?.price,
            amount: currentStatusProduct?.amount,
            active: currentStatusProduct?.active,
            categoryID: currentStatusProduct?.categoryID
        });
    }, [reset, currentStatusProduct]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.productForm}>

            <div className={styles.field}>
                <label htmlFor="idNameFormProduct">Nome:</label>
                <input
                    id="idNameFormProduct"
                    {...register('name')}
                    type="text"
                    placeholder='Informe o nome' />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className={styles.fieldDescription}>
                <label htmlFor="idDescriptionFormProduct">Descrição:</label>
                <textarea
                    id="idDescriptionFormProduct"
                    {...register('description')}
                    placeholder='Texto descritivo do produto' />
                {errors.description && <span>{errors.description.message}</span>}
            </div>

            <Controller
                control={control}
                name="categoryID"
                render={({ field: { onChange, } }) => (
                    <SelectEntity
                        label="Categoria"
                        startEntityID={currentStatusProduct?.categoryID}
                        displayField='name'
                        listEntity={listCategory}
                        onChange={(id) => onChange(Number(id))}
                    />)}
            />

            <div className={styles.field}>
                <label htmlFor="idPriceFormProduct">Preço R$:</label>
                <input
                    style={{ width: '100px' }}
                    id="idPriceFormProduct"
                    {...register('price')}
                    type="number"
                    step="0.01"
                    placeholder='Informe o preço' />
                {errors.price && <span>{errors.price.message}</span>}
            </div>

            <div className={styles.field}>
                <label htmlFor="idAmountFormProduct">Quantidade:</label>
                <input style={{ width: '100px' }}
                    id="idAmountFormProduct"
                    {...register('amount')}
                    type="number"
                    placeholder='Quantidade' />
                {errors.amount && <span>{errors.amount.message}</span>}
            </div>

            <div className={styles.fieldActive}>
                <div>
                    <label htmlFor="idActiveFormProduct">Ativo:</label>
                    <input
                        id="idActiveFormProduct"
                        {...register('active')}
                        type="checkbox"
                        placeholder='Ativo' />
                </div>
            </div>

            <button type='submit'>Salvar</button>
        </form>
    );
}

export default ProductForm;