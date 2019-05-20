FROM node:12.2.0-alpine

COPY package.json .

RUN npm install

COPY . .

CMD npm run serve

EXPOSE 3000

#DOCKER RUN COMMAND
#docker run --name moe -p 3000:3000 kevin170113664/daily-moe:latest