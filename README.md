# Gulp + SCSS Project

Проект з конфігурацією Gulp для роботи з SCSS.

## ✨ Можливості

- ✅ **SCSS компіляція** - автоматична компіляція SCSS → CSS
- ✅ **Live Reload** - автоматичне оновлення браузера при змінах
- ✅ **Автопрефікси** - автоматичне додавання вендорних префіксів (-webkit-, -moz-, -ms-)
- ✅ **Мінімізація** - стиснення CSS для продакшену
- ✅ **Форматування** - Prettier для уніфікації коду
- ✅ **Source Maps** - для зручного дебагу

## 🚀 Команди

```bash
# Встановлення
yarn install
# або
npm install

# Розробка (з live reload на http://localhost:3000)
yarn start
# або
npm start
# Створює: style.css (15KB, форматований)

# Продакшн збірка (з мінімізацією)
yarn gulp:build
# або
npm run gulp:build
# Створює: style.min.css (12KB, мінімізований, ~20% економії)

# Тільки компіляція (без мінімізації)
yarn gulp:styles
# або
npm run gulp:styles

# Форматування SCSS
yarn gulp:format
# або
npm run gulp:format
```

**Результат збірки:**
- `dist/css/style.css` - для розробки (15KB, 725 рядків, з source maps)
- `dist/css/style.min.css` - для продакшену (12KB, 1 рядок, без source maps)
- `dist/css/test-features.css` - тестові приклади (1.2KB)
- `dist/css/test-features.min.css` - мінімізовані тести (831B)

## 📁 Структура

```
src/scss/           - SCSS файли
  ├── style.scss    - Головний файл
  ├── _variables.scss
  ├── _mixins.scss
  ├── _base.scss
  └── components/
      ├── _header.scss
      └── _footer.scss

dist/css/           - Скомпільовані CSS файли
demo.html           - Демонстраційна сторінка
gulpfile.js         - Конфігурація Gulp
```

## 🧪 Тестування

1. Запустіть `npm start`
2. Відкриється `http://localhost:3000/demo.html`
3. Змініть будь-який SCSS файл
4. Браузер автоматично оновиться!

## 📦 Технології

- Gulp 5
- SCSS (Sass)
- Autoprefixer
- CleanCSS
- BrowserSync
- Prettier

## 🎯 Приклад SCSS

```scss
// Змінні
$primary-color: #3498db;

// Міксіни з новим синтаксисом
@use 'sass:color';

@mixin button-style($bg-color) {
  padding: 10px 20px;
  background-color: $bg-color;
  
  &:hover {
    // Використовуємо color.adjust замість darken (новий стандарт)
    background-color: color.adjust($bg-color, $lightness: -10%);
  }
}

// Використання
.button {
  @include button-style($primary-color);
}
```

**Примітка:** Проект використовує сучасний синтаксис Sass з `@use` замість застарілого `@import` та `color.adjust()` замість `darken()`/`lighten()`. Це виправляє всі deprecation warnings.

## 📊 Результат

**Вхід (SCSS):**
```scss
.test { display: flex; }
```

**Вихід (CSS з автопрефіксами):**
```css
.test {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}


