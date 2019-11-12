# docker-js-playground

Quick bare product playground for docker deployment.

For a given `domain.tld`, it provides:

- domain.tld: a static html website
- domain.tld/api: an api use by every apps
  - [GET] domain.tld/api/ : stupid json to say it's ok
  - [GET] domain.tld/api/insert : insert an item { date: [timestamp] }
  - [GET] domain.tld/api/get : fetch all items
- *.domain.tld: react app with a call on the api to retrieve data and a button to insert data (best killer app ever)

Quick techstack overview:

- api: a single api base on koajs
- frontend: a client-side website base on create-react-app, empowered with craco
- homepage: a static dummy html website
- a nginx reverse proxy to rule them all
- database: a simple mongo

## Usage

Add a domain name and some subdomain in your /etc/hosts. For example

```
127.0.0.1 tralala.io
127.0.0.1 site1.tralala.io
127.0.0.1 site2.tralala.io
```

Then:

- git clone the repo
- docker-compose build
- DOMAIN=tralala.io docker-compose up

You're done. Then visit:

- http://tralala.io => static website
- http://tralala.io/api => to access the api (/api/get and /api/insert)
- http://site1.tralala.io/, http://site2.tralala.io/

The site app (app1.domain.tld) provide a client side nav with a page fetching data from the server and a button to insert a row in the database.

## Out of the project

This is a bare project made of almost nothing. Code is just a minimal one, the important part is the docker playground, apps are just there to make it understanable :)

## Todo (Later?)

Idea is not about code stack (js), but about docker stack

- expand docker-compose.yml for test and dev env (and duplicate production.nginx.conf for a dev.nginx.conf)
- add letsencrypt for domains, subdomains and so on
- move api expose as a graphql (but not my needs today)

## LICENSE

Just do what you fucking want with that repo :x