import styles from './LoadingOverlay.module.css';

const LoadingOverlay = () => {
    return (
        <div className={styles.loading_overlay}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default LoadingOverlay;