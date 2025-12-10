import styles from './Modal.module.css';


interface Props {
isOpen: boolean;
onClose: () => void;
children: React.ReactNode;
}


export default function Modal({ isOpen, onClose, children }: Props) {
if (!isOpen) return null;


return (
<div className={styles.overlay} onClick={onClose}>
<div className={styles.content} onClick={e => e.stopPropagation()}>
{children}
</div>
</div>
);
}