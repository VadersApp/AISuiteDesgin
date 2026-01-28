'use client';
import {
  collection,
  onSnapshot,
  Query,
  queryEqual,
  Unsubscribe,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

export function useCollection<T>(query: Query | null) {
  const [data, setData] = useState<T[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const queryRef = useRef<Query | null>(null);

  useEffect(() => {
    if (query === null && queryRef.current === null) {
      return;
    }
    
    if (query && queryRef.current && queryEqual(query, queryRef.current)) {
      return;
    }

    queryRef.current = query;
    let unsubscribe: Unsubscribe = () => {};

    if (query) {
      unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            } as T;
          });
          setData(docs);
        },
        (error) => {
          setError(error);
        },
      );
    } else {
        setData(undefined);
    }
    

    return () => unsubscribe();
  }, [query]);

  return { data, error };
}
