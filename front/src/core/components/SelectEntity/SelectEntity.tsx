
import { useState } from 'react';
import styles from './SelectEntity.module.css';

type SelectEntityProps = {
    label?: string,
    startEntityID?: number;
    listEntity: any[];
    displayField: string;
    onChange: (entity: any) => void
}

const SelectEntity = ({
    label,
    startEntityID,
    displayField,
    listEntity,
    onChange
}: SelectEntityProps) => {

    const [value, setValue] = useState(startEntityID);

    return (
        <div className={styles.selectEntity}>
            {
                label ?
                    <label htmlFor='selectEntityID'>{`${label}: `}</label>
                    : ''
            }
            <select
                id='selectEntityID'
                value={value}
                onChange={(event) => {
                    setValue(Number(event.target.value))
                    onChange(Number(event.target.value));
                }}
            >
                {listEntity && listEntity.map(entity => {
                    return <option
                        value={entity.id}
                        key={entity.id}
                    >
                        {entity[displayField]}
                    </option>
                })}
            </select>
        </div>
    );
}

export default SelectEntity;