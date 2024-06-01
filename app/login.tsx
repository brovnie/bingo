import { Button, Text, TextInput, View } from 'react-native';
// import auth from '@react-native-firebase/auth';

export default function Login() {
  //     auth()
  //   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       console.log('That email address is already in use!');
  //     }

  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }

  //     console.error(error);
  //   });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View>
        <TextInput placeholder="Enter username" />
        <TextInput placeholder="Enter password" secureTextEntry={true} />
        <Button onPress={() => {}} title="test" />
      </View>
    </View>
  );
}
