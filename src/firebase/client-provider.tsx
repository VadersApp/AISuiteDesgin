'use client';
import { FirebaseApp } from 'firebase/app';
import { PropsWithChildren, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({
  children,
  firebaseApp,
}: PropsWithChildren<{ firebaseApp: FirebaseApp }>) {
  const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);
  const firestore = useMemo(() => getFirestore(firebaseApp), [firebaseApp]);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
