import { View, Text, TextInput, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from './_layout';
import { router } from 'expo-router';

export default function login() {
  const { setUserToken, createUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');

  return (
    <View>
      <Text>login</Text>
      <TextInput
        placeholder="Type in your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Type in your password"
        value={passWord}
        onChangeText={setPassWord}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => (
          setUserToken(email, passWord), router.replace('/createBingo')
        )}
      />
      <Text>Or</Text>
      <Button
        title="Sign up"
        onPress={() => (
          createUser(email, passWord), router.replace('/createBingo')
        )}
      />
    </View>
  );
}
