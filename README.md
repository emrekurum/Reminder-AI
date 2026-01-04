# Hatırlatma Uygulaması

AI destekli mobil hatırlatıcı uygulaması. Türkçe doğal dil işleme ile tarih ve zaman ifadelerini anlayarak hatırlatıcılar oluşturabilirsiniz.

## Özellikler

- Türkçe doğal dil ifadeleri ile hatırlatıcı oluşturma
- Yerel bildirim desteği
- AsyncStorage ile veri kalıcılığı
- Clean Architecture prensipleri ile geliştirilmiş mimari
- React Native Paper ile modern UI

## Teknolojiler

- React Native
- Expo
- AsyncStorage
- Expo Notifications
- React Native Paper

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI

### Adımlar

1. Projeyi klonlayın:
```bash
git clone https://github.com/emrekurum/Reminder-AI.git
cd HatirlatmaUygulamasi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

## Kullanım

Uygulama başlatıldıktan sonra, hatırlatıcı eklemek için doğal dil ifadeleri kullanabilirsiniz:

- "2 saat sonra"
- "3 gün sonra"
- "1 hafta sonra"
- "2 ay sonra"
- "30 dakika sonra"

## Proje Yapısı

Proje Clean Architecture prensipleri ile organize edilmiştir:

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

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için LICENSE dosyasına bakın.
