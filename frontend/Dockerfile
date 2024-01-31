## 1. Build React App
FROM node:20 as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

## 2. React를 Nginx로 Serve
FROM nginx:latest
WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/build .
# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]