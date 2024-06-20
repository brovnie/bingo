import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from './_layout';

// export default function Index() {
//   const router = useRouter();
//   const { userToken } = useContext(AuthContext);

//   useEffect(() => {
//     if (userToken !== undefined) {
//       userToken === null
//         ? router.replace('/login')
//         : router.replace('/createBingo');
//     }
//   }, [userToken]);

//   return null;
// }

export default function Index() {
  const router = useRouter();
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate token retrieval

    // get user token from persistence if exists

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  //redirect
  useEffect(() => {
    // redirect to createbingo
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
