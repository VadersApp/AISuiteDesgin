import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { firebaseConfig } from './config';
import {
  useFirebaseApp,
  useFirestore,
  useAuth,
  FirebaseProvider,
} from './provider';
import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { FirebaseClientProvider } from './client-provider';

function initializeFirebase(): FirebaseApp {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}

export {
  useFirebaseApp,
  useFirestore,
  useAuth,
  FirebaseProvider,
  FirebaseClientProvider,
  useUser,
  useDoc,
  useCollection,
  initializeFirebase,
};
