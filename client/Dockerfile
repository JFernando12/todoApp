FROM node:14 AS UI_STAGE

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.22.1-alpine as PROD_STAGE

COPY --from=UI_STAGE /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g","daemon off;" ]
