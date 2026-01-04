/**
 * Task Repository Implementation
 * AsyncStorage based implementation of TaskRepository
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { Task } from '../../domain/entities/Task';
import { STORAGE_KEYS } from '../../core/constants';

export class TaskRepositoryImpl extends TaskRepository {
  /**
   * Get all tasks from storage
   * @returns {Promise<Array<Task>>}
   */
  async getAll() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      if (!data) {
        return [];
      }

      const tasksData = JSON.parse(data);
      return tasksData.map((taskData) => Task.fromJSON(taskData));
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Get task by id
   * @param {string} id
   * @returns {Promise<Task|null>}
   */
  async getById(id) {
    try {
      const tasks = await this.getAll();
      return tasks.find((task) => task.id === id) || null;
    } catch (error) {
      console.error('Error getting task by id:', error);
      return null;
    }
  }

  /**
   * Save a task
   * @param {Task} task
   * @returns {Promise<void>}
   */
  async save(task) {
    try {
      const tasks = await this.getAll();
      const existingIndex = tasks.findIndex((t) => t.id === task.id);

      if (existingIndex >= 0) {
        tasks[existingIndex] = task;
      } else {
        tasks.push(task);
      }

      const tasksData = tasks.map((t) => t.toJSON());
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasksData));
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }

  /**
   * Delete a task by id
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      const tasks = await this.getAll();
      const filteredTasks = tasks.filter((task) => task.id !== id);

      const tasksData = filteredTasks.map((t) => t.toJSON());
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasksData));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  /**
   * Delete all tasks
   * @returns {Promise<void>}
   */
  async deleteAll() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TASKS);
    } catch (error) {
      console.error('Error deleting all tasks:', error);
      throw error;
    }
  }
}

