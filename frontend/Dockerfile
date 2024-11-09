
FROM node:18 AS build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

RUN npm run build

FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/dist .

EXPOSE 5173

CMD ["serve", "-s", ".", "-l", "5173"]