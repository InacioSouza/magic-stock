import { useState } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MAX_VISIBLE = 5;

export const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(1);

  const end = Math.min(start + MAX_VISIBLE - 1, totalPages);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);

    // Move a janela se necessário
    if (page > end) {
      setStart(page - MAX_VISIBLE + 1);
    } else if (page < start) {
      setStart(page);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={prev} disabled={currentPage === 1}>
        ←
      </button>

      {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;

        return (
          <button
            key={page}
            className={`${styles.btn} ${styles.page} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button className={styles.btn} onClick={next} disabled={currentPage === totalPages}>
        →
      </button>
    </div>
  );
};