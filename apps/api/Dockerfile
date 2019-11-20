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
    echo "install production dependancies"; \
    yarn install --no-cache --frozen-lockfile --production; \
  else \
    echo "install development dependancies"; \
    yarn install --no-cache --development; \
  fi;

# build
FROM dependancies AS build

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "serve"]
