/**
 * Task Item Component
 * Displays a single task item
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

export const TaskItem = ({ task, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.taskContainer}>
          <View style={styles.taskContent}>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.date}>
              {formatDate(task.scheduledDate)}
            </Text>
          </View>
          <IconButton
            icon="delete"
            color="red"
            size={20}
            onPress={() => onDelete(task.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

