import { useState } from 'react'
import { fetchNotes } from '../../services/noteService';
import { useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';

function App() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSetSearch = useDebouncedCallback((value: string) => {
  setSearch(value);
  setPage(1);
}, 500);

  const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', search, page],
  queryFn: () => fetchNotes(search, page),
});

  return (
     <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onChange={debouncedSetSearch} value={search} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            forcePage={page}
            onPageChange={(selectedPage: number) => setPage(selectedPage)}
          />
        )}
		{/* Кнопка створення нотатки */}
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && <NoteList posts={data.notes} onEdit={() => {}} />}
</div>
  )
}

export default App;