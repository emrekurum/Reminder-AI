/**
 * Task Entity
 * Represents a reminder task in the domain layer
 */
export class Task {
  constructor(id, description, scheduledDate, createdAt = new Date()) {
    this.id = id;
    this.description = description;
    this.scheduledDate = scheduledDate;
    this.createdAt = createdAt;
  }

  /**
   * Check if the task is valid
   * @returns {boolean}
   */
  isValid() {
    return (
      this.id &&
      this.description &&
      this.description.trim().length > 0 &&
      this.scheduledDate &&
      this.scheduledDate instanceof Date &&
      this.scheduledDate > new Date()
    );
  }

  /**
   * Convert task to plain object for storage
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      description: this.description,
      scheduledDate: this.scheduledDate.toISOString(),
      createdAt: this.createdAt.toISOString(),
    };
  }

  /**
   * Create task from plain object
   * @param {Object} data
   * @returns {Task}
   */
  static fromJSON(data) {
    return new Task(
      data.id,
      data.description,
      new Date(data.scheduledDate),
      new Date(data.createdAt)
    );
  }
}

