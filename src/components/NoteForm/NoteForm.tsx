import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from "../../services/noteService";
import styles from './NoteForm.module.css';
import { useState } from 'react';

interface Props {
  onSuccess: () => void;
}

export default function NoteForm({ onSuccess }: Props) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Todo');

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
      setTitle('');
      setContent('');
      setTag('Todo');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    
    mutate({ 
      title: title.trim(), 
      content: content.trim() || undefined,
      tag 
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        minLength={3}
        maxLength={50}
      />
      
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
      />
      
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Add Note'}
      </button>
    </form>
  );
}