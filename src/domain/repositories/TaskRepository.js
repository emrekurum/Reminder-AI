/**
 * Task Repository Interface
 * Defines the contract for task data operations
 */
export class TaskRepository {
  /**
   * Get all tasks
   * @returns {Promise<Array<Task>>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get task by id
   * @param {string} id
   * @returns {Promise<Task|null>}
   */
  async getById(id) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Save a task
   * @param {Task} task
   * @returns {Promise<void>}
   */
  async save(task) {
    throw new Error('save() must be implemented');
  }

  /**
   * Delete a task by id
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('delete() must be implemented');
  }

  /**
   * Delete all tasks
   * @returns {Promise<void>}
   */
  async deleteAll() {
    throw new Error('deleteAll() must be implemented');
  }
}

