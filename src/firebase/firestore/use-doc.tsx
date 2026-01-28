'use client';
import {
  doc,
  DocumentReference,
  onSnapshot,
  refEqual,
  Unsubscribe,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

export function useDoc<T>(ref: DocumentReference | null) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const refRef = useRef<DocumentReference | null>(null);

  useEffect(() => {
    if (ref === null && refRef.current === null) {
      return;
    }
    
    if (ref && refRef.current && refEqual(ref, refRef.current)) {
      return;
    }

    refRef.current = ref;
    let unsubscribe: Unsubscribe = () => {};

    if (ref) {
      unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          if (snapshot.exists()) {
            setData({ ...snapshot.data(), id: snapshot.id } as T);
          } else {
            setData(undefined);
          }
        },
        (error) => {
          setError(error);
        },
      );
    } else {
      setData(undefined);
    }

    return () => unsubscribe();
  }, [ref]);

  return { data, error };
}
