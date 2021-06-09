# build environment
FROM node as build
WORKDIR /mylocal
ENV PATH /mylocal/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
RUN npm run build

# production environment
FROM nginx
COPY --from=build /mylocal/build /usr/share/nginx/html/mylocal

# new
COPY --from=build /mylocal/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /mylocal/nginx/mime.types /etc/nginx/conf.d/mime.types

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
