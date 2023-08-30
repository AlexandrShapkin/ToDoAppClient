FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/sites-enabled/default
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
