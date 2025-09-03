import React, { useMemo, useState } from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import NoteEditorScreen from '../screens/NoteEditorScreen';
import { NotesProvider } from '../context/NotesContext';
import { ThemeProvider } from '../theme/ThemeProvider';

type Route =
  | { name: 'Login' }
  | { name: 'Signup' }
  | { name: 'Home' }
  | { name: 'Editor'; params?: { id?: string } };

// PUBLIC_INTERFACE
export const AppNavigator: React.FC = () => {
  /** Minimal navigation state machine without external dependencies. */
  const [route, setRoute] = useState<Route>({ name: 'Login' });

  const authHandlers = useMemo(
    () => ({
      toSignup: () => setRoute({ name: 'Signup' }),
      toLogin: () => setRoute({ name: 'Login' }),
      onAuthSuccess: () => setRoute({ name: 'Home' }),
    }),
    []
  );

  const homeHandlers = useMemo(
    () => ({
      openNote: (id: string) => setRoute({ name: 'Editor', params: { id } }),
      newNote: () => setRoute({ name: 'Editor' }),
      logout: () => setRoute({ name: 'Login' }),
      backHome: () => setRoute({ name: 'Home' }),
    }),
    []
  );

  return (
    <ThemeProvider>
      <NotesProvider>
        {route.name === 'Login' && (
          <LoginScreen onLoginSuccess={authHandlers.onAuthSuccess} goToSignup={authHandlers.toSignup} />
        )}
        {route.name === 'Signup' && (
          <SignupScreen onSignupSuccess={authHandlers.onAuthSuccess} goToLogin={authHandlers.toLogin} />
        )}
        {route.name === 'Home' && (
          <HomeScreen onOpenNote={homeHandlers.openNote} onCreateNew={homeHandlers.newNote} onLogout={homeHandlers.logout} />
        )}
        {route.name === 'Editor' && (
          <NoteEditorScreen noteId={route.params?.id} onBack={homeHandlers.backHome} />
        )}
      </NotesProvider>
    </ThemeProvider>
  );
};
