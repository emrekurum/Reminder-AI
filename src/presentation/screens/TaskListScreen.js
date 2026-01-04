/**
 * Task List Screen
 * Main screen displaying task list and input form
 */
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { TaskItem } from '../components/TaskItem';
import { TaskRepositoryImpl } from '../../data/repositories/TaskRepositoryImpl';
import { NotificationService } from '../../infrastructure/notifications/NotificationService';
import { AddTaskUseCase } from '../../domain/usecases/AddTaskUseCase';
import { DeleteTaskUseCase } from '../../domain/usecases/DeleteTaskUseCase';
import { GetTasksUseCase } from '../../domain/usecases/GetTasksUseCase';

export const TaskListScreen = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize dependencies
  const taskRepository = new TaskRepositoryImpl();
  const notificationService = new NotificationService();
  const addTaskUseCase = new AddTaskUseCase(taskRepository, notificationService);
  const deleteTaskUseCase = new DeleteTaskUseCase(
    taskRepository,
    notificationService
  );
  const getTasksUseCase = new GetTasksUseCase(taskRepository);

  useEffect(() => {
    loadTasks();
    requestPermissions();
  }, []);

  const loadTasks = async () => {
    try {
      const loadedTasks = await getTasksUseCase.execute();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      Alert.alert('Hata', 'Görevler yüklenirken bir hata oluştu.');
    }
  };

  const requestPermissions = async () => {
    const granted = await notificationService.requestPermissions();
    if (!granted) {
      Alert.alert(
        'İzin Gerekli',
        'Bildirimler için izin verilmedi. Lütfen ayarlardan izin verin.'
      );
    }
  };

  const handleAddTask = async () => {
    if (!taskDescription.trim()) {
      return;
    }

    setLoading(true);
    const result = await addTaskUseCase.execute(taskDescription);

    if (result.success) {
      setTaskDescription('');
      await loadTasks();
    } else {
      Alert.alert('Hata', result.error || 'Görev eklenirken bir hata oluştu.');
    }

    setLoading(false);
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      'Görevi Sil',
      'Bu görevi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteTaskUseCase.execute(taskId);
            if (result.success) {
              await loadTasks();
            } else {
              Alert.alert('Hata', result.error || 'Görev silinirken bir hata oluştu.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Hatırlatıcı Uygulaması</Title>
      <TextInput
        mode="outlined"
        label="Hatırlatıcı ekle (örn: 2 saat sonra, 3 gün sonra)"
        value={taskDescription}
        onChangeText={setTaskDescription}
        style={styles.input}
        disabled={loading}
      />
      <Button
        mode="contained"
        onPress={handleAddTask}
        style={styles.button}
        disabled={loading}
        loading={loading}
      >
        Ekle
      </Button>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={handleDeleteTask} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Title style={styles.emptyText}>
              Henüz görev eklenmedi
            </Title>
          </View>
        }
      />
    </View>
  );
};

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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

