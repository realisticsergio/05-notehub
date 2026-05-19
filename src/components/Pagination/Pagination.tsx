import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css";

interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedPage: number) => void;
    forcePage: number;
}

export default function Pagination({ pageCount,  onPageChange, forcePage }: PaginationProps) {
    return (
        <ReactPaginate
  pageCount={pageCount}
  onPageChange={(e) => onPageChange(e.selected + 1)}
  forcePage={forcePage - 1}
  containerClassName={css.pagination}
  activeClassName={css.active}
  previousLabel="<"
  nextLabel=">"
/>
    )
}