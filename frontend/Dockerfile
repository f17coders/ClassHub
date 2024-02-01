## 1. Build React App
FROM node:20 as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

## 2. React를 Nginx로 Serve
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
