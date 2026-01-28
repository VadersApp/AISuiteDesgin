'use client';
import { useAuth } from '../provider';
import { User, onIdTokenChanged, signInAnonymously } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    // Sign in anonymously if no user is signed in.
    if (!auth.currentUser) {
      signInAnonymously(auth).catch((error) => {
        console.error('Anonymous sign-in failed', error);
      });
    }

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
