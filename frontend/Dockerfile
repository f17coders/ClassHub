## 1. Build React App
FROM node:20 as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . ./
RUN npm run build

## 2. React를 Nginx로 Serve
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
# Expose port 80
EXPOSE 80
# Volumn 추가
VOLUME /etc/letsencrypt:/etc/letsencrypt
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]