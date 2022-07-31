FROM node:alpine as build
WORKDIR /build
COPY . /build

RUN yarn install
RUN yarn run build

FROM nginx:alpine
COPY --from=build /build/templates /etc/nginx/templates
COPY --from=build /build/dist /usr/share/nginx/html
