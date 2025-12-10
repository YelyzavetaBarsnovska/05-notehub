import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from "../../services/noteService";
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Максимум 50 символів')
    .required('Обовʼязкове поле'),
  content: Yup.string().max(500, 'Максимум 500 символів'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Невірний тег')
    .required('Обовʼязкове поле'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' as const }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values);
        resetForm();
      }}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Field 
            id="title" 
            name="title" 
            type="text" 
            className={styles.input} 
          />
          <ErrorMessage name="title" component="span" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={styles.textarea}
          />
          <ErrorMessage name="content" component="span" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={styles.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}