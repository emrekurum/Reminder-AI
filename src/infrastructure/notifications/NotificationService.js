/**
 * Notification Service
 * Handles notification scheduling and permissions
 */
import * as Notifications from 'expo-notifications';
import { NOTIFICATION_CONFIG } from '../../core/constants';

export class NotificationService {
  /**
   * Request notification permissions
   * @returns {Promise<boolean>} - true if permission granted
   */
  async requestPermissions() {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  /**
   * Schedule a notification
   * @param {string} message - Notification message
   * @param {Date} scheduledDate - Date to trigger notification
   * @returns {Promise<void>}
   */
  async scheduleNotification(message, scheduledDate) {
    try {
      const secondsUntilTrigger = Math.max(
        (scheduledDate.getTime() - Date.now()) / 1000,
        0
      );

      await Notifications.scheduleNotificationAsync({
        content: {
          title: NOTIFICATION_CONFIG.TITLE,
          body: message,
          sound: NOTIFICATION_CONFIG.SOUND,
        },
        trigger: {
          seconds: secondsUntilTrigger,
        },
      });

      console.log(
        `Notification scheduled, will trigger in ${secondsUntilTrigger} seconds.`
      );
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      throw error;
    }
  }

  /**
   * Cancel a notification by identifier
   * @param {string} identifier - Notification identifier
   * @returns {Promise<void>}
   */
  async cancelNotification(identifier) {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      throw error;
    }
  }

  /**
   * Cancel all scheduled notifications
   * @returns {Promise<void>}
   */
  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      throw error;
    }
  }
}

