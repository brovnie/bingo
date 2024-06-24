import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { firebase_auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

type AuthContextType = {
  userToken: FirebaseAuthTypes.UserCredential | null;
  setUserToken: (email: string, pw: string) => void;
  createUser: (email: string, pw: string) => void;
  clearUserToken: (userId: string) => void;
  isLoading: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
  userToken: null,
  setUserToken: (email: string, pw: string) => null,
  createUser: (email: string, pw: string) => null,
  clearUserToken: (userId: string) => null,
  isLoading: true,
});

export default function RootLayout() {
  const [userToken, setUserToken] =
    useState<FirebaseAuthTypes.UserCredential | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = firebase_auth;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserToken(user);
      setIsLoading(false);
    });
  }, []);

  const handleLogin = async (email: string, pw: string) => {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    const auth = firebase_auth;

    const handleLogin = async () => {
      if (userName === "" || !userName) return;
      if (passWord === "" || !passWord) return;

      await signInWithEmailAndPassword(auth, userName, passWord)
        .then((user) => setUserToken(user))
        .catch((error) => {
          if (error.code === "auth/email-already-in-use")
            return Alert.alert("That email address is already in use!");

          if (error.code === "auth/invalid-email")
            return Alert.alert("That email address is invalid!");

          Alert.alert(`Miscellaneous error: ${error.code}`);
        });
    };
  };

  const handleSignup = async (email: string, pw: string) => {
    if (userName === "" || !userName) return;
    if (passWord === "" || !passWord) return;

    await createUserWithEmailAndPassword(auth, userName, passWord)
      .then((user) => setUserToken(user))
      .catch((error) => {
        if (error.code === "auth/email-already-in-use")
          return Alert.alert("That email address is already in use!");

        if (error.code === "auth/invalid-email")
          return Alert.alert("That email address is invalid!");

        Alert.alert(`Miscellaneous error: ${error.code.split("auth/")[0]}`);
      });
  };
  const handleLogOut = async (userId: string) => {};

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' />
    </View>
  ) : (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken: () => handleLogin(email, pw),
        createUser: () => handleSignup(email, pw),
        clearUserToken: () => handleLogOut(userId),
      }}
    >
      <Slot />
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
