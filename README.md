# Urbanfood / underfood

Pet-проєкт інтернет-магазину з фокусом на UI/UX, адаптивність та сценарії e-commerce без backend.

## Демо
- Netlify: https://react-shop-yuribaranov.netlify.app/

## Стек
- React 19
- Vite
- React Router DOM
- CSS Modules
- Swiper
- React Icons
- Context API (кошик, обране)

## Реалізовані сторінки
- `/` — головна
- `/catalog` та `/catalog/:sectionId` — каталог
- `/product/:productId` — сторінка товару (на мок-даних)
- `/contacts` — контакти
- `/favorites` — обране
- `/cart` — кошик
- `/vacancies` — вакансії
- `/404` і `*` — сторінка 404

## Що працює в демо-режимі
- Авторизація в модалці (без реальної SMS/API)
- Пошук по локальних даних каталогу
- Кошик, промокоди та бонуси на мок-логіці

## Локальний запуск
```bash
npm install
npm run dev
```

## Перевірка якості
```bash
npm run lint
npm run build
```

## Продакшн-перевірка локально
```bash
npm run preview
```

## Відомі обмеження
- Немає backend/API інтеграції.
- Checkout не підключений до платіжного процесу.
- Дані товарів і вакансій зберігаються у локальних data-файлах.
- Частина UX-сценаріїв позначена як тимчасово недоступна або demo.
