import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

const FirebaseContext = createContext<{
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} | null>(null);

export function FirebaseProvider({
  children,
  firebaseApp,
  auth,
  firestore,
}: PropsWithChildren<{
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}>) {
  return (
    <FirebaseContext.Provider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebaseApp() {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }

  return context.firebaseApp;
}

export function useAuth() {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }

  return context.auth;
}

export function useFirestore() {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error('useFirestore must be used within a FirebaseProvider');
  }

  return context.firestore;
}
