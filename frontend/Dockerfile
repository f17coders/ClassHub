FROM node:20 as builder
COPY package*.json .
RUN npm ci
COPY . /app/
WORKDIR /app
EXPOSE 3000
CMD ["npm", "start"]