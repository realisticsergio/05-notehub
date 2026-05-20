import { useState } from 'react'
import { fetchNotes } from '../../services/noteService';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';


export default function App() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(0);
  }, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page + 1),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={(value) => debouncedSetSearch(value)} />
        
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(selectedPage: number) => setPage(selectedPage)}
          />
        )}
        
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Error loading notes!</p>}
        
        {data && <NoteList notes={data.notes} />}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
