import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";
import EmptyState from "../../shared/EmptyState";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  if (!notes || notes.length === 0) {
    return <EmptyState message="Нотаток немає" />;
  }

  return (
    <ul className={styles.list}>
      {notes.map((n) => (
        <li key={n.id} className={styles.item}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          {n.tag && <span className={styles.tag}>{n.tag}</span>}
        </li>
      ))}
    </ul>
  );
}