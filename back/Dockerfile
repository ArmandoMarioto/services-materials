
FROM node:18

WORKDIR /app

RUN rm -rf dist

COPY back/package*.json ./

RUN npm install

COPY back .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]