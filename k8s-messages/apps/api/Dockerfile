FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4201
CMD [ "npm", "run", "start-prd" ]