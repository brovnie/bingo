import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Slot, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type AuthContextType = {
  userToken: FirebaseAuthTypes.UserCredential | null;
  setUserToken: React.Dispatch<
    React.SetStateAction<FirebaseAuthTypes.UserCredential | null>
  >;
};

export const AuthContext = React.createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {},
});

export default function RootLayout() {
  const [userToken, setUserToken] =
    useState<FirebaseAuthTypes.UserCredential | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate token retrieval
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      <Slot />
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
