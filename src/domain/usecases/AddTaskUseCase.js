/**
 * Add Task Use Case
 * Business logic for adding a new task
 */
import { Task } from '../entities/Task';
import { parseDate } from '../../core/utils/dateParser';

export class AddTaskUseCase {
  constructor(taskRepository, notificationService) {
    this.taskRepository = taskRepository;
    this.notificationService = notificationService;
  }

  /**
   * Execute add task use case
   * @param {string} description - Task description
   * @returns {Promise<{success: boolean, task: Task|null, error: string|null}>}
   */
  async execute(description) {
    try {
      if (!description || !description.trim()) {
        return {
          success: false,
          task: null,
          error: 'Task description cannot be empty',
        };
      }

      const scheduledDate = parseDate(description);
      if (!scheduledDate) {
        return {
          success: false,
          task: null,
          error: 'Invalid date or time expression',
        };
      }

      const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const task = new Task(taskId, description.trim(), scheduledDate);

      if (!task.isValid()) {
        return {
          success: false,
          task: null,
          error: 'Invalid task data',
        };
      }

      await this.taskRepository.save(task);
      await this.notificationService.scheduleNotification(
        task.description,
        task.scheduledDate
      );

      return {
        success: true,
        task,
        error: null,
      };
    } catch (error) {
      console.error('Error in AddTaskUseCase:', error);
      return {
        success: false,
        task: null,
        error: error.message || 'Failed to add task',
      };
    }
  }
}

