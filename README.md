a reminder application at mobile but powered by AI
# Reminder-AI 🧠⏰

A smart reminder app built with **React Native (Expo)** that lets users create quick task reminders using natural language date inputs (e.g., "yarın saat 10:30") and automatically schedules local push notifications.

![Reminder App](https://img.shields.io/badge/Built%20with-Expo%20%7C%20React%20Native-blue.svg)

## 🚀 Features

- 📅 **Smart Reminder Input:** Add reminders using natural language (e.g., "3 saat sonra", "yarın 10:00").
- 🔔 **Local Push Notifications:** Automatically schedules a notification for your task.
- 💾 **Persistent Storage:** Tasks are saved locally using `AsyncStorage`.
- 🧹 **Delete with Ease:** Swipe-to-delete or use the delete button.
- 🎨 **Clean UI:** Built with `react-native-paper` for a modern Material look.

## 🛠️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [react-native-paper](https://callstack.github.io/react-native-paper/)
- Date parsing handled via custom `parseDate()` in `dateParser.js`

## 📂 Project Structure

Reminder-AI/
├── App.js # Main app with task logic
├── dateParser.js # Custom Turkish-friendly date parser
├── assets/ # Static files
├── app.json # Expo config
├── package.json # Dependencies
└── ...


## 📦 Installation & Usage

### Prerequisites

- Node.js and npm/yarn
- Expo CLI (`npm install -g expo-cli`)

### Install & Run

```bash
git clone https://github.com/emrekurum/Reminder-AI.git
cd Reminder-AI
npm install  # or yarn install
expo start

Then open the app in the Expo Go app (on Android/iOS) or emulator.

✍️ Usage
Type a task like Yarın 14:00 sunum hazırla.

Press Ekle.

If the date is valid, the app saves the task and schedules a notification.

You can delete a task using the 🗑️ icon.

⚠️ If permissions for notifications are not granted, a warning will appear.

🧠 How Does the Date Parser Work?
The parseDate() function inside dateParser.js handles Turkish phrases and attempts to convert them into valid Date objects for scheduling notifications.

Example inputs:

yarın 10:00

3 saat sonra

15 Ağustos 2025 09:30

📌 Known Limitations
Only local notifications (no remote/cloud support).

No timezone handling.

Does not use a backend (offline only).

🤝 Contributing
Pull requests are welcome!
To contribute:

bash
Kopyala
Düzenle
git checkout -b feature/your-feature
git commit -m "Add new feature"
git push origin feature/your-feature
Then create a Pull Request.
