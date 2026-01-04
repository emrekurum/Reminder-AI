/**
 * Get Tasks Use Case
 * Business logic for retrieving all tasks
 */
export class GetTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Execute get tasks use case
   * @returns {Promise<Array<Task>>}
   */
  async execute() {
    try {
      return await this.taskRepository.getAll();
    } catch (error) {
      console.error('Error in GetTasksUseCase:', error);
      return [];
    }
  }
}

