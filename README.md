# Reminder Application

AI-powered mobile reminder application. Create reminders by understanding date and time expressions in Turkish using natural language processing.

## Features

- Create reminders using Turkish natural language expressions
- Local notification support
- Data persistence with AsyncStorage
- Clean Architecture principles
- Modern UI with React Native Paper

## Technologies

- React Native
- Expo
- AsyncStorage
- Expo Notifications
- React Native Paper

## Installation

### Requirements

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Steps

1. Clone the repository:
```bash
git clone https://github.com/emrekurum/Reminder-AI.git
cd HatirlatmaUygulamasi
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

## Usage

After starting the application, you can use natural language expressions to add reminders:

- "2 saat sonra" (2 hours later)
- "3 gün sonra" (3 days later)
- "1 hafta sonra" (1 week later)
- "2 ay sonra" (2 months later)
- "30 dakika sonra" (30 minutes later)

## Project Structure

The project is organized following Clean Architecture principles:

```
src/
├── domain/           # Domain layer (business logic)
│   ├── entities/     # Domain entities
│   ├── repositories/ # Repository interfaces
│   └── usecases/     # Use cases
├── data/             # Data layer
│   ├── repositories/ # Repository implementations
│   └── services/     # Data services
├── presentation/     # Presentation layer
│   ├── screens/      # Screen components
│   └── components/   # Reusable components
├── core/             # Core utilities
│   ├── utils/        # Utility functions
│   └── constants/    # Application constants
└── infrastructure/   # Infrastructure layer
    └── notifications/# Notification services
```

## Legal Notice / Yasal Uyarı

**English:**

The source code of this project is made publicly available solely for review and educational purposes.

⚠️ Cannot be copied, distributed, or used for commercial purposes.

If you wish to use or license this project commercially, please contact me: [emrekurum07@hotmail.com]

© 2026 Emre KURUM. All Rights Reserved.

---

**Türkçe:**

Bu projenin kaynak kodu yalnızca inceleme ve eğitim amaçlı olarak kamuya açık hale getirilmiştir.

⚠️ Ticari amaçlarla kopyalanamaz, dağıtılamaz veya kullanılamaz.

Bu projeyi ticari olarak kullanmak veya lisanslamak isterseniz, lütfen benimle iletişime geçin: [emrekurum07@hotmail.com]

© 2026 Emre KURUM. Tüm Hakları Saklıdır.
