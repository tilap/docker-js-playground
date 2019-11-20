# base
FROM mhart/alpine-node:12.13.1 AS base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# dependancies
FROM base AS dependancies

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
    echo "production build"; \
    yarn install --no-cache --frozen-lockfile --production; \
  else \
    echo "development build, no install"; \
  fi;

# RUN yarn install --no-cache --frozen-lockfile --production;

# build
FROM dependancies AS build

COPY . .

RUN yarn run build

FROM nginx:1.17.5-alpine

COPY --from=build /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
