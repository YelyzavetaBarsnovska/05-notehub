import type { ChangeEvent } from "react";
import styles from './SearchBox.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <input
      className={styles.input}
      placeholder="Search notes..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}