import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from "../../services/noteService";
import Loading from "../../shared/Loading";
import ErrorMessage from "../../shared/ErrorMessage";
import styles from './App.module.css';

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch)
  });

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        )}
        
        <button 
          className={styles.button} 
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      
      {isLoading && <Loading />}
      {error && <ErrorMessage message="Ошибка загрузки" />}
      
      {data && <NoteList notes={data.notes} />}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}