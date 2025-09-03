import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types/note';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

type NotesContextType = {
  notes: Note[];
  filteredNotes: Note[];
  query: string;
  setQuery: (q: string) => void;
  createNote: (data?: Partial<Pick<Note, 'title' | 'content'>>) => Note;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  sync: () => Promise<void>; // placeholder, no backend
  syncing: boolean;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);
const STORAGE_KEY = 'app_notes_v1';

export const NotesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: Note[] = JSON.parse(raw);
          setNotes(parsed);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch {
        // ignore
      }
    })();
  }, [notes]);

  const createNote = (data?: Partial<Pick<Note, 'title' | 'content'>>): Note => {
    const now = Date.now();
    const note: Note = {
      id: uuidv4(),
      title: data?.title?.trim() || '',
      content: data?.content?.trim() || '',
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    setNotes((prev) => [note, ...prev]);
    return note;
  };

  const updateNote = (id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const sync = async () => {
    // UI-only placeholder to simulate syncing
    setSyncing(true);
    await new Promise((res) => setTimeout(res, 1200));
    setSyncing(false);
  };

  const filteredNotes = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [notes, query]);

  const value = useMemo(
    () => ({
      notes,
      filteredNotes,
      query,
      setQuery,
      createNote,
      updateNote,
      deleteNote,
      sync,
      syncing,
    }),
    [notes, filteredNotes, query, syncing]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

// PUBLIC_INTERFACE
export const useNotes = () => {
  /** Access notes list and CRUD helpers with search and sync placeholder. */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};
