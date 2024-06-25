import { useContext, useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import { AuthContext } from './_layout';
import React from 'react';

export default function Index() {
  const router = useRouter();
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: fix bug with rendering before firebase
    // is able to fetch data from persistence
    // or implement a splash / logo animation?
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isLoading && userToken !== undefined) {
      if (userToken === null) {
        router.replace('/login');
      } else {
        router.replace('/createBingo');
      }
    }
  }, [isLoading, userToken, router]);

  return <Slot />;
}
