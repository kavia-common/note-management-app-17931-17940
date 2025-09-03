import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useNotes } from '../context/NotesContext';
import { ThemedInput } from '../components/ThemedInput';
import { Header } from '../components/Header';
import { FAB } from '../components/FAB';
import { Card } from '../components/Card';
import { Empty } from '../components/Empty';
import { Ionicons } from '@expo/vector-icons';
import { Note } from '../types/note';

type Props = {
  onOpenNote: (id: string) => void;
  onCreateNew: () => void;
  onLogout: () => void;
};

const HomeScreen: React.FC<Props> = ({ onOpenNote, onCreateNew, onLogout }) => {
  const { colors, toggleTheme, colorScheme } = useTheme();
  const { filteredNotes, query, setQuery, sync, syncing } = useNotes();

  const headerRight = useMemo(
    () => (
      <TouchableOpacity onPress={toggleTheme} accessibilityRole="button" accessibilityLabel="Toggle theme">
        <Ionicons name={colorScheme === 'dark' ? 'sunny' : 'moon'} color={colors.primary} size={20} />
      </TouchableOpacity>
    ),
    [toggleTheme, colorScheme, colors.primary]
  );

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity onPress={() => onOpenNote(item.id)} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {item.title || 'Untitled'}
        </Text>
        {item.content ? (
          <Text style={[styles.content, { color: colors.textSecondary }]} numberOfLines={2}>
            {item.content}
          </Text>
        ) : null}
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Notes" right={headerRight} />
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <ThemedInput placeholder="Search notes..." value={query} onChangeText={setQuery} />
        </View>
        <TouchableOpacity onPress={sync} style={[styles.syncBtn, { borderColor: colors.border }]} accessibilityRole="button">
          <Ionicons name={syncing ? 'cloud-sync' : 'cloud-outline'} color={colors.primary} size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={[styles.syncBtn, { borderColor: colors.border }]} accessibilityRole="button">
          <Ionicons name="log-out-outline" color={colors.secondary} size={22} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={<Empty title="No notes yet" subtitle="Tap + to create your first note" />}
        renderItem={renderItem}
      />

      <FAB onPress={onCreateNew} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
    alignItems: 'center',
  },
  syncBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { width: '100%' },
  title: { fontSize: 16, fontWeight: '700' },
  content: { fontSize: 14, marginTop: 6 },
});
