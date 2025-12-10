import { useState } from 'react';
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteList from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from "../../services/noteService";
import Loading from "../../shared/Loading";
import ErrorMessage from "../../shared/ErrorMessage";
import styles from './App.module.css';

interface NotesResponse {
  items: any[];
  totalPages: number;
}

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, 12, search)
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
      
      {data && <NoteList notes={data.items} />}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}