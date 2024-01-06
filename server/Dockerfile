# Используем образ с Node.js
FROM node:18

ENV DB_NAME=
ENV BG_USER=
ENV DB_PASSWORD=
ENV DB_HOST=
ENV DB_PORT=



# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json
COPY app/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код проекта
COPY . .

# Запускаем приложение
CMD ["node", "app/index.js"]