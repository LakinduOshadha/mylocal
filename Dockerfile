# build environment
FROM node as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
RUN npm run build

# production environment
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html/app

# new
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/mime.types /etc/nginx/conf.d/mime.types

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
