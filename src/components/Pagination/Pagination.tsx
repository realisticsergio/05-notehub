import type { ComponentType } from 'react';
import ReactPaginateModule, { type ReactPaginateProps } from 'react-paginate';
import css from "./Pagination.module.css";

const ReactPaginate =
  ((ReactPaginateModule as unknown as { default?: ComponentType<ReactPaginateProps> }).default ??
    ReactPaginateModule) as ComponentType<ReactPaginateProps>;

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
