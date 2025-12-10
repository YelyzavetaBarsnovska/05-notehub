import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesResponse {
  items: Note[];
  totalPages: number;
  currentPage: number;
  perPage: number;
  totalItems: number;
}

export interface CreateNoteInput {
  title: string;
  content?: string;
  tag: string;
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };
  
  if (search) {
    params.search = search;
  }
  
  const response = await axiosInstance.get('/notes', { params });
  return response.data;
};

export const createNote = async (payload: CreateNoteInput): Promise<Note> => {
  const response = await axiosInstance.post('/notes', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const response = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};