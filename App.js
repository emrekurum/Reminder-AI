import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, Button, Card, Title } from 'react-native-paper';
import { NlpManager } from '@nlpjs/basic';

// NLP Yöneticisini oluştur
const manager = new NlpManager({ languages: ['tr'], forceNER: true });

// NLP Yöneticisini eğit
manager.addDocument('tr', '2 gün sonra', 'date.future');
manager.addDocument('tr', '3 gün sonra', 'date.future');
manager.addDocument('tr', 'önümüzdeki hafta', 'date.future');
// Daha fazla örnek ekleyerek eğitebiliriz

manager.train();

const parseTask = async (input) => {
  const response = await manager.process('tr', input);
  const dateEntity = response.entities.find((entity) => entity.entity === 'date');

  if (dateEntity) {
    return `${input} (Tarih: ${dateEntity.resolution.value})`;
  }
  return input;
};

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Verileri yüklerken hata:', error);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Verileri kaydederken hata:', error);
    }
  };

  const addTask = async () => {
    if (task.trim()) {
      const parsedTask = await parseTask(task);
      const newTasks = [...tasks, parsedTask];
      setTasks(newTasks);
      setTask('');
      saveTasks(newTasks);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Hatırlatıcı Uygulaması</Title>
      <TextInput
        mode="outlined"
        label="Hatırlatıcı ekle"
        value={task}
        onChangeText={(text) => setTask(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={addTask} style={styles.button}>
        Ekle
      </Button>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item}</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
