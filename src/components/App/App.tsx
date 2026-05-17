import { useState } from 'react'
import { fetchNotes } from '../../services/noteService';
import { useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';

function App() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', search, page],
  queryFn: () => fetchNotes(search, page),
});

  return (
     <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && <NoteList posts={data.notes} onEdit={() => {}} />}
</div>
  )
}

export default App;