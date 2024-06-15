import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from './_layout';
import { firebase_auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function login() {
  const { setUserToken } = useContext(AuthContext);

  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const auth = firebase_auth;

  const handleLogin = async () => {
    if (userName === '' || !userName) return;
    if (passWord === '' || !passWord) return;
    // if (usernameRef.current === null || !usernameRef.current) return;
    // if (passwordRef.current === null || !passwordRef.current) return;

    signInWithEmailAndPassword(auth, userName, passWord)
      .then((user) => setUserToken(user))
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use')
          return Alert.alert('That email address is already in use!');

        if (error.code === 'auth/invalid-email')
          return Alert.alert('That email address is invalid!');

        Alert.alert(error);
      });
  };

  const handleSignup = async () => {
    if (usernameRef.current === null || !usernameRef.current) return;
    if (passwordRef.current === null || !passwordRef.current) return;

    await createUserWithEmailAndPassword(
      auth,
      usernameRef.current,
      passwordRef.current
    )
      .then((user) => {
        setUserToken(user);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use')
          return Alert.alert('That email address is already in use!');

        if (error.code === 'auth/invalid-email')
          return Alert.alert('That email address is invalid!');

        Alert.alert(error);
      });
  };

  return (
    <View>
      <Text>login</Text>
      <TextInput
        placeholder="Type in your email"
        value={userName}
        onChangeText={setUserName}
        //  ref={usernameRef}
      />
      <TextInput
        placeholder="Type in your password"
        // ref={passwordRef}
        value={passWord}
        onChangeText={setPassWord}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text>Or</Text>
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
}
