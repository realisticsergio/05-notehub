import type { ComponentType } from 'react';
import importReactPaginate from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  importReactPaginate as unknown as 
  ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

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
