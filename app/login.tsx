import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from './_layout';

export default function login() {
  const { setUserToken } = useContext(AuthContext);

  const handleLogin = () => {
    // Simulate a login action
    console.warn('click');
    setUserToken('dummy-token');
  };

  return (
    <View>
      <Text>login</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
