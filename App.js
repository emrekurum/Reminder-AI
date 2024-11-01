import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, Button, Card, Title, IconButton } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { parseDate } from './dateParser'; // dateParser.js dosyasından fonksiyonu içe aktar

// Bildirim ayarlama fonksiyonu
const scheduleNotification = async (task, date) => {
  const secondsUntilTrigger = Math.max((date.getTime() - Date.now()) / 1000, 0); // Geçerli zaman ile hedef zaman arasındaki farkı saniye olarak hesapla

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hatırlatma",
      body: task,
      sound: 'default', // Varsayılan bildirim sesi
    },
    trigger: {
      seconds: secondsUntilTrigger, // Bildirimi belirtilen süre sonra tetikle
    },
  });

  console.log(`Bildirim ayarlandı, ${secondsUntilTrigger} saniye sonra çalacak.`);
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

    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Bildirim izni verilmedi!');
      }
    };

    loadTasks();
    requestPermissions();
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
      const notificationDate = parseDate(task); // Türkçe karakterleri algılayan fonksiyon
      console.log('Belirlenen tarih:', notificationDate); // API yanıtını kontrol et
      if (notificationDate) {
        const newTasks = [...tasks, `${task} (Tarih: ${notificationDate})`];
        setTasks(newTasks);
        setTask('');
        saveTasks(newTasks);
        await scheduleNotification(task, notificationDate); // Bildirim programla
      } else {
        alert('Geçersiz tarih veya zaman girdiniz.');
      }
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasks(newTasks);
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
        renderItem={({ item, index }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.taskContainer}>
                <Text>{item}</Text>
                <IconButton
                  icon="delete"
                  color="red"
                  size={20}
                  onPress={() => deleteTask(index)}
                />
              </View>
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
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
