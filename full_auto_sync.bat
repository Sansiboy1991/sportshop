@echo off
cd /d D:\project\sportshop
setlocal EnableDelayedExpansion

:: ==============================
:: 🗓️  Створення папки для логів
:: ==============================
if not exist logs mkdir logs
set LOGFILE=logs\sync_log_%date:~-4,4%-%date:~3,2%-%date:~0,2%.txt

(
echo =====================================
echo 💾 ПОВНА АВТОСИНХРОНІЗАЦІЯ SPORTSHOP
echo [%date% %time%]
echo =====================================

:: 1️⃣ Перевірка змін
for /f %%i in ('git status --porcelain ^| find /c /v ""') do set changes=%%i
if !changes! gtr 0 (
    echo 📂 Знайдено !changes! змінених файлів.
    git add .
    git commit -m "Авто-коміт %date% %time%" >nul
    git push origin main
    if !errorlevel! neq 0 (
        echo ⚠️ Помилка при push — можливо конфлікт або втрачено зʼєднання.
        exit /b
    )
    echo ✅ Зміни успішно збережені на GitHub.
) else (
    echo 💤 Локальних змін не знайдено.
)

:: 2️⃣ Оновлення з GitHub
echo.
echo 🔄 ОНОВЛЕННЯ РЕПОЗИТОРІЮ...
git pull origin main
if !errorlevel! neq 0 (
    echo ⚠️ Помилка при pull. Перевір конфлікти вручну.
    exit /b
)
echo ✅ Репозиторій синхронізовано.

:: 3️⃣ Перевірка залежностей
if exist package.json (
    echo.
    echo 📦 Перевірка залежностей...
    npm install --silent
    echo ✅ Залежності актуальні.
)

:: 4️⃣ Запуск бекенду в новому вікні
echo.
echo 🚀 Запуск бекенду...
start cmd /k "cd /d D:\project\sportshop && node backend/server.mjs"

:: 5️⃣ Запуск фронтенду (Vite/React)
if exist package.json (
    echo.
    echo 🚀 Запуск фронтенду...
    start cmd /k "cd /d D:\project\sportshop && npm run dev"
)

:: 6️⃣ Відкриття браузера
timeout /t 5 /nobreak >nul
start "" http://localhost:4000
start "" http://localhost:5173

echo.
echo 🟢 УСЕ ГОТОВО: сервер і фронтенд запущені!
echo =====================================

)>>%LOGFILE%

echo ✅ Усі дії збережено у лог-файлі: %LOGFILE%
<<<<<<< HEAD
pause
=======
pause
>>>>>>> 227fe2b8748843e5fa1e991ae88569d059853373
