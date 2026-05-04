import type { ReactNode } from 'react';
import styles from './Popup.module.css';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

type PopupProps = {
    title: string;
    children: ReactNode;
    idRecord?: number;
    disableSaveBtn: boolean;
    onStart?: (value: any) => void;
    onExit?: () => void;
    onSave?: () => boolean;
    visible: boolean;
    changeVisible: (visible: boolean) => void
}

const Popup = ({
    title,
    visible,
    disableSaveBtn,
    onExit,
    onSave,
    changeVisible,
    children
}: PopupProps) => {

    useLockBodyScroll(visible);

    const handleExit = async () => {

        const result = await Swal.fire({
            title: "Qualquer alteração será perdida",
            text: "Deseja mesmo sair?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sim, sair'
        });

        if (!result.isConfirmed) return;

        if(onExit != undefined) onExit();
        
        changeVisible(false);
    }

    const handleSave = async () => {
        
        let result: boolean | undefined = undefined;
        
        if (onSave != null) {
            result = await onSave();
        }

        if (!result) {
            toast.error("Falha ao salvar!")
            return;
        }
        changeVisible(false);
    }

    return (
        <>
            {
                visible &&
                <div className={styles.background}>
                    <div className={styles.popup}>
                        <h2>{title}</h2>

                        <button
                            className={styles.exit}
                            onClick={handleExit}
                        >
                            <FiX size={24}/> 
                        </button>

                        <div className={styles.content}>
                            {children}
                        </div>

                        <button style={ disableSaveBtn ? {display: 'none'} : {} }
                            className={styles.save}
                            onClick={handleSave}
                        >
                            Salvar
                        </button>

                    </div>
                </div>
            }
        </>
    );
}

export default Popup;