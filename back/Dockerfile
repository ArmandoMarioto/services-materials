
FROM node:18

WORKDIR /app

RUN rm -rf dist

COPY back/package*.json ./

RUN npm install

COPY back .

# Adicionando o wait-for-it.sh ao Dockerfile
COPY ./back/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh


RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run start:prod"]