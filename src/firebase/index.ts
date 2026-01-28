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

  // If the API key is a placeholder, initialize a minimal app to avoid crashing.
  // Firebase functionality will not work correctly, but the UI can be built.
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('...')) {
    console.warn("Firebase API key is a placeholder. Initializing a minimal Firebase app to prevent crashing. No Firebase features will work.");
    return initializeApp({ projectId: firebaseConfig.projectId || "qore-os-for-enterprises-gcp" });
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
