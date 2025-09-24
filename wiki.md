## **2. Структура SCSS в `app/assets/`**

```
app/assets/
├─ scss/
│  ├─ abstracts/           # Переменные, функции, миксины
│  │  ├─ _variables.scss   # Основные токены
│  │  ├─ _mixins.scss      # Миксины
│  │  ├─ _functions.scss   # Функции
│  │
│  ├─ base/
│  │  ├─ _reset.scss       # CSS reset
│  │  ├─ _typography.scss  # Базовая типографика
│  │
│  ├─ themes/
│  │  ├─ _light.scss       # Light тема
│  │  ├─ _dark.scss        # Dark тема
│  │
│  ├─ utilities/
│  │  ├─ _helpers.scss     # Хелперы (clearfix, visually-hidden)
│  │
│  └─ main.scss            # Главный файл импорта
```

## **4. Темы через CSS-переменные**

### **Light Theme**

```scss
// themes/_light.scss
html[data-theme="light"] {
  --color-primary: #3b82f6;
  --color-secondary: #f59e0b;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-border: #e5e7eb;
}
```

### **Dark Theme**

```scss
// themes/_dark.scss
html[data-theme="dark"] {
  --color-primary: #2563eb;
  --color-secondary: #d97706;
  --color-bg: #111827;
  --color-text: #f9fafb;
  --color-border: #374151;
}
```

---

# Git

---

## 1️⃣ Настроим алиасы Git для быстрого старта

Выполни в терминале:

```bash
# ====== Основные ======
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm 'commit -m'
git config --global alias.st status
git config --global alias.pl pull
git config --global alias.ps push

# ====== Быстрые команды для Git Flow ======
# Начать фичу
git config --global alias.start-feature '!f(){ git checkout develop && git pull origin develop && git checkout -b feature/$1; }; f'

# Начать багфикс
git config --global alias.start-bugfix '!f(){ git checkout develop && git pull origin develop && git checkout -b bugfix/$1; }; f'

# Начать hotfix
git config --global alias.start-hotfix '!f(){ git checkout main && git pull origin main && git checkout -b hotfix/$1; }; f'

# Начать релиз
git config --global alias.start-release '!f(){ git checkout develop && git pull origin develop && git checkout -b release/$1; }; f'
```

Теперь ты сможешь:

```bash
git start-feature auth
# создаст feature/auth из develop

git start-bugfix dark-mode
# создаст bugfix/dark-mode из develop

git start-hotfix payment-error
# создаст hotfix/payment-error из main

git start-release v1.0.0
# создаст release/v1.0.0 из develop
```

---

## 2️⃣ Структура веток в проекте

После внедрения алиасов, твой рабочий процесс будет таким:

```
main
│
└── develop
    ├── feature/auth
    ├── feature/theme-switcher
    ├── bugfix/dark-mode
    └── release/v1.0.0
```

---

## 3️⃣ Автоматизация с хуками Git

Чтобы избежать случайных коммитов в `main` и `develop` без PR, можно добавить **hook**:

**`.git/hooks/pre-push`**

```bash
#!/bin/bash
protected_branches=("main" "develop")

current_branch=$(git rev-parse --abbrev-ref HEAD)

for branch in "${protected_branches[@]}"; do
    if [[ "$current_branch" == "$branch" ]]; then
        echo "❌ Нельзя пушить напрямую в $branch! Создай ветку и сделай Pull Request."
        exit 1
    fi
done
```

Активировать:

```bash
chmod +x .git/hooks/pre-push
```

---

## 4️⃣ Советы по использованию

- Всегда начинай работу с `git start-feature` или `git start-bugfix`, а не вручную.
- После завершения задачи — делай **PR в develop**, проходи ревью.
- Для релиза — мерж release-ветки в main и develop, добавляй тег версии:

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

---

Я могу ещё сделать **полный `.gitconfig` файл**, в который сразу включу эти алиасы, форматирование логов, цветную историю и автоматический `rebase` при `pull`.
Тогда тебе останется просто скачать его и положить в домашнюю папку.

Хочешь, я его соберу?
