FROM node:16-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
