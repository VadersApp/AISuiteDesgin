'use client';
import { FirebaseApp } from 'firebase/app';
import { PropsWithChildren, useMemo } from 'react';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({
  children,
  firebaseApp,
}: PropsWithChildren<{ firebaseApp: FirebaseApp }>) {
  const isConfigValid = useMemo(
    () => !!firebaseApp.options.apiKey && !firebaseApp.options.apiKey.includes('...'),
    [firebaseApp.options.apiKey]
  );

  const auth = useMemo(() => {
    if (isConfigValid) {
      return getAuth(firebaseApp);
    }
    return {} as Auth;
  }, [firebaseApp, isConfigValid]);

  const firestore = useMemo(() => {
    if (isConfigValid) {
      return getFirestore(firebaseApp);
    }
    return {} as Firestore;
  }, [firebaseApp, isConfigValid]);

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
