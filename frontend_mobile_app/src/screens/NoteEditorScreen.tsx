import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Header } from '../components/Header';
import { ThemedButton } from '../components/ThemedButton';
import { useNotes } from '../context/NotesContext';
import { Note } from '../types/note';

type Props = {
  noteId?: string;
  onBack: () => void;
};

const NoteEditorScreen: React.FC<Props> = ({ noteId, onBack }) => {
  const { colors } = useTheme();
  const { notes, createNote, updateNote, deleteNote } = useNotes();
  const existing = useMemo<Note | undefined>(() => notes.find((n) => n.id === noteId), [notes, noteId]);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [content, setContent] = useState(existing?.content ?? '');

  useEffect(() => {
    setTitle(existing?.title ?? '');
    setContent(existing?.content ?? '');
  }, [existing?.id]);

  const handleSave = () => {
    if (existing) {
      updateNote(existing.id, { title: title.trim(), content: content.trim() });
    } else {
      // Create new note; no need to keep a local reference
      createNote({ title: title.trim(), content: content.trim() });
    }
    onBack();
  };

  const handleDelete = () => {
    if (!existing) {
      onBack();
      return;
    }
    Alert.alert('Delete note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteNote(existing.id);
          onBack();
        },
      },
    ]);
  };

  const headerRight = (
    <ThemedButton title="Save" onPress={handleSave} variant="secondary" />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={existing ? 'Edit Note' : 'New Note'} onBack={onBack} right={headerRight} />
      <View style={styles.body}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={colors.inputPlaceholder}
          value={title}
          onChangeText={setTitle}
          style={[styles.title, { color: colors.text }]}
        />
        <TextInput
          placeholder="Write your note..."
          placeholderTextColor={colors.inputPlaceholder}
          value={content}
          onChangeText={setContent}
          style={[styles.content, { color: colors.text }]}
          multiline
        />
        {existing ? (
          <ThemedButton title="Delete" onPress={handleDelete} variant="ghost" style={{ marginTop: 12 }} />
        ) : null}
      </View>
    </View>
  );
};

export default NoteEditorScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1, padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22,
  },
});
