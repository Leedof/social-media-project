import React from "react";
import styles from "./Paginator.module.scss";
import { ReactComponent as ArrowIcon } from "../../../../assets/Icons/arrowRight.svg";
import cn from "classnames";

const Paginator = ({ totalCount, pageSize, currentPage, onPageChanged }) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const startPages = [1, "..."];
  const endPages = ["...", pagesCount];
  let pages = [];

  // helper that fills pages array
  const createPaginator = () => {
    //If pagesCount less then 10, simple display whole figures
    if (pagesCount <= 10) {
      for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i);
      }
      // Otherwise dispay paginator that depends on current page like "1 ... 5(pages) ... end"
    } else {
      // 1 2 3 4 5 6 7 ... end
      if (currentPage <= 5) {
        for (let i = 1; i <= 7; i += 1) {
          pages.push(i);
        }
        pages = pages.concat(endPages);
        // 1 .. 4 5 6 7 8 ... end
      } else if (currentPage > 5 && currentPage < pagesCount - 4) {
        for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
          pages.push(i);
        }
        pages = startPages.concat(pages, endPages);
      } else {
        // 1 .. edn-6 end-5 end-4 end-3 end-2 end-1 end
        for (let i = pagesCount - 6; i <= pagesCount; i += 1) {
          pages.push(i);
        }
        pages = startPages.concat(pages);
      }
    }
  };
  createPaginator();

  //callbacks for buttons
  const onPrevPage = () => {
    if (currentPage === 1) return;
    onPageChanged(currentPage - 1);
  };
  const onNextPage = () => {
    if (currentPage === pagesCount) return;
    onPageChanged(currentPage + 1);
  };

  return (
    <div className={styles.paginator}>
      <button
        className={cn(styles.btn, { [styles.hidden]: currentPage === 1 })}
        onClick={onPrevPage}
      >
        <ArrowIcon className={cn(styles.arrow, styles.left)} /> Prev
      </button>
      <div className={styles.pages}>
        {pages.map((page, index) => {
          return (
            <span
              key={page + index}
              className={cn({
                [styles.page]: page !== "...",
                [styles.pageDots]: page === "...",
                [styles.pageActive]: page === currentPage,
              })}
              onClick={
                page !== "..."
                  ? () => {
                      onPageChanged(page);
                    }
                  : undefined
              }
            >
              {page + " "}
            </span>
          );
        })}
      </div>
      <button
        className={cn(styles.btn, {
          [styles.hidden]: currentPage === pagesCount,
        })}
        onClick={onNextPage}
      >
        Next <ArrowIcon className={cn(styles.arrow)} />
      </button>
    </div>
  );
};

export default Paginator;
