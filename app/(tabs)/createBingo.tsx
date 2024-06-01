import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

export default function CreateBingo() {
  const [gameName, setGameName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (title === '' || description === '') return;

    if (items.length >= 9) {
      return Alert.alert('Error', 'You can only add 9 items.');
    }

    setItems([...items, { id: items.length + 1, title, description }]);
    setTitle('');
    setDescription('');
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem}>
      <Text style={styles.gridItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Here you can navigate to another screen or perform any other action
  const handleFinalize = () =>
    Alert.alert('Game Ready', `Game "${gameName}" is ready with 9 items.`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bingo Game Setup</Text>
      <TextInput
        style={styles.input}
        placeholder="Game Name"
        value={gameName}
        onChangeText={setGameName}
      />
      {items.length < 9 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Item Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Item Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Add Item" onPress={addItem} />
        </>
      )}

      {items.length > 0 && (
        <View style={styles.grid}>
          <FlatList
            data={items}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
          />
        </View>
      )}
      {items.length === 9 && (
        <Button title="Finalize/Generate" onPress={handleFinalize} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  grid: {
    marginTop: 20,
  },
  gridItem: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  gridItemText: {
    fontSize: 18,
  },
});
