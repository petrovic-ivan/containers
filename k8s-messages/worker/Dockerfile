FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apt-get update
COPY . .
EXPOSE 4202
CMD [ "npm", "run", "start-prd" ]