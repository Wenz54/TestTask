## 🏗 Архитектура приложения
1. Основные компоненты системы
- Frontend: React + TypeScript
- State Management: Redux Toolkit
- Стили: Sass (SCSS)
- Анимации: Framer Motion
- Виртуализация списка: react-window
- API: Binance WebSocket

2. Слои приложения
- UI Layer: Компоненты React (AssetList, AssetForm, PortfolioOverview)
- State Layer: Redux (portfolioSlice, store)
- Service Layer: WebSocket (binance.ts), localStorage (storage.ts)
- Utility Layer: Хуки (useWebSocket), утилиты (formatters.ts)

3. Поток данных
- Пользователь добавляет актив через форму (AssetForm)
- Данные сохраняются в Redux Store и localStorage
- WebSocket подключается к Binance API для получения обновлений
- Цены обновляются в реальном времени
- Компоненты автоматически перерисовываются через Redux

4. Ключевые принципы
- Однонаправленный поток данных (Flux architecture)
- Декомпозиция компонентов
- Типизация на всех уровнях
- Оптимизация производительности (memo, виртуализация)
- Обработка ошибок (WebSocket reconnection)

## 📦 Используемые технологии
- Core: React, TypeScript, Redux Toolkit
- Styling: Sass, CSS Modules
- Animations: Framer Motion
- Data Fetching: WebSocket, Axios
- Performance: react-window
- Build Tool: Vite
- Deployment: Vercel

## 🗂 Файловая структура
src/
├── components/      # UI-компоненты
│   ├── AssetForm/   # Форма добавления актива
│   ├── AssetList/   # Список активов
│   └── AssetRow/    # Строка актива
├── store/           # Redux store
│   ├── portfolioSlice.ts
│   └── store.ts
├── hooks/           # Кастомные хуки
│   └── useWebSocket.ts
├── utils/           # Вспомогательные функции
│   ├── binance.ts   # WebSocket логика
│   └── storage.ts   # Локальное хранилище
├── styles/          # Глобальные стили
└── types/           # Типы TypeScript

## 🛠 Установка и запуск
1. Клонируйте репозиторий:
```
git clone https://github.com/Wenz54/EconomicApp.git
cd portfolio-app
```
Установите зависимости:
```
npm install
```
Запустите приложение:
```
npm run dev
```
