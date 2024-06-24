import { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "./_layout";

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
    if (userToken !== undefined) {
      userToken !== null
        ? router.replace("/createBingo")
        : router.replace("/login");
    }
  }, [isLoading, userToken, router]);

  return null;
}
