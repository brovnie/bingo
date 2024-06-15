import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from './_layout';

export default function Index() {
  const router = useRouter();
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate token retrieval
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  //redirect
  useEffect(() => {
    console.warn(userToken);
    if (!isLoading && userToken !== undefined) {
      if (userToken === null) {
        router.replace('/login');
      } else {
        router.replace('/createBingo');
      }
    }
  }, [isLoading, userToken, router]);

  return null;
}
