import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateBingo() {
  const [gameName, setGameName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const addItem = () => {
    if (title === '') return;

    if (items.length >= 9) {
      return Alert.alert('Error', 'You can only add 9 items.');
    }

    setItems([...items, { id: items.length + 1, title, description }]);
    saveData();
    setTitle('');
    setDescription('');
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.gridItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Here you can navigate to another screen or perform any other action
  const handleFinalize = () => {
    saveData();
    Alert.alert('Game Ready', `Game "${gameName}" is ready with 9 items.`);
  };
  const deleteThisItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    saveData();
    setModalVisible(false);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('gameName', gameName);
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  const loadData = async () => {
    try {
      const savedGameName = await AsyncStorage.getItem('gameName');
      const savedItems = await AsyncStorage.getItem('items');

      if (savedGameName !== null) {
        setGameName(savedGameName);
      }
      if (savedItems !== null) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteThisItem(selectedItem.id)}
                  >
                    <Text style={styles.buttonText}>Delete Item</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  finalizeContainer: {
    marginTop: 20,
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
