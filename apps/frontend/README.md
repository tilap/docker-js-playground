# Craco SSR

A simple personal boilerplate for quick react project.

- Create react app / Craco
- React loadable
- Material-ui & custom theme switching
- Full SSR support
- absolute import

## Usage

### Environment vars

- `PORT`: port the server will listen too
- `DISABLE_STATICS`: if `1` or `true`, express wont server static files (usefull when serving throw nginx)

### Docker

```
docker build -t site
docker run -p 3000:3000 -t site
```

Visit http://localhost:3000


## Todo

### Improvements

- SSR in development. Does not work as it is based on build files and not serving craco dev.


Et si je disais adieux au SSR ?

Faire une application front simple (le reste du site sera sur autre chose)
J'ai juste besoin de l'authentification. Elle peut être faite sur un serveur node stupide koa/nginx.

Ensuite une fois authentificer, ça passe en cookie.
L'app qui est sur un sous domaine peut alors aisément faire appel à l'api via le serveur pour avoir les infos.

Il faut que je proxify l'api. genre /api => nginx map sur une autre app dans le docker
Comment je gère les sockets? De la même façon probablement.

Authentifié => cookie avec un jwt => le serveur aapi prend le jwt et en extrait le user tout seul.

https://github.com/shakyShane/cra-docker/blob/master/docker-cloud-example.yml
