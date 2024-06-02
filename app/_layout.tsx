import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type AuthContextType = {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = React.createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {},
});

export default function RootLayout() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate token retrieval
    setTimeout(() => {
      setUserToken(null); // Replace this with actual token retrieval logic
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
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
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
