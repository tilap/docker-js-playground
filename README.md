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

- api: a single api based on koajs
- frontend: a client-side website based on create-react-app, empowered with craco
- homepage: a static dummy html website
- a nginx reverse proxy to rule all the websites
- database: a simple mongo

## Usage

### Production

#### Quick start

Make sure to have docker & docker-compose installed on your computer.

Add a domain name and some subdomains in your /etc/hosts. For example:

```sh
127.0.0.1 tralala.io
127.0.0.1 site1.tralala.io
127.0.0.1 site2.tralala.io
```

Then:

```sh
git clone https://github.com/tilap/docker-js-playground.git
cd docker-js-playground
docker-compose build
DOMAIN=tralala.io docker-compose up
```

You're done. Then visit:

- http://tralala.io => static website
- http://tralala.io/api => to access the api (/api/get and /api/insert)
- http://site1.tralala.io/, http://site2.tralala.io/

The "site" app (site1.domain.tld for example) provides a client side nav with a page fetching data from the server and a button to insert a row in the database.

### Development

To dev on this stack, an extra docker-compose file is provided (docker-compose.dev.yml) to make dev env works.

Once the repo clonse, you can run

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
DOMAIN=tralala.io docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Then for:

- **frontend**: go in the apps/frontend, yarn install and yarn start. Any local change will be live reloaded
- **homepage**: go in the apps/homepage/src. Any change will be take into account on homepage reload (no live reload yet)
- **api**: TODO

### Other build options

Env vars when uping your docker-compose:

- `DOMAIN`: (default domain.tld): a domain (or subdomain)
- `LOGS_PATH` (default ./logs): local folder where logs will be stored
- `MONGO_PATH` (default ./data/mongo): local folder where mongo data will be stored

## Out of the scope of the project

This is a bare project made of almost nothing. Code is just a minimal one, the important part is the docker playground, apps are just there to make it understanable :)

## Ideas for later?

Idea is not about code stack (js), but about docker stack.

- [ ] Add USER in dockerfiles (instead of root)
- [X] Expand docker-compose.yml for and dev env (and duplicate nginx.production.conf for a dev.nginx.conf)
- [ ] Add letsencrypt for domains, subdomains and so on
- [ ] Add a github action to trigger a deploy on remote server
- [ ] (?) Move api expose as a graphql
- [ ] (?) Add a [docker-weblate](https://github.com/beevelop/docker-weblate) docker image to manage translation of the apps
- [ ] (?) Split the apps over many repos

## LICENSE

Just do what you fucking want with that repo :x