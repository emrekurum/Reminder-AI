/**
 * Delete Task Use Case
 * Business logic for deleting a task
 */
export class DeleteTaskUseCase {
  constructor(taskRepository, notificationService) {
    this.taskRepository = taskRepository;
    this.notificationService = notificationService;
  }

  /**
   * Execute delete task use case
   * @param {string} taskId - Task id to delete
   * @returns {Promise<{success: boolean, error: string|null}>}
   */
  async execute(taskId) {
    try {
      if (!taskId) {
        return {
          success: false,
          error: 'Task id is required',
        };
      }

      await this.taskRepository.delete(taskId);
      // Note: In a production app, you might want to cancel the scheduled notification
      // This would require storing notification identifiers with tasks

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      console.error('Error in DeleteTaskUseCase:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete task',
      };
    }
  }
}

