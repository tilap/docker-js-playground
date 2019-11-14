import assert from 'assert';
import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
import Router from 'koa-router';

const serverFactory = ({ domain, getCollection, secrets }) => {
  // Check config
  assert(secrets, 'Config error: missing secrets');

  // Create app
  const app = new Koa();
  app.keys = secrets;

  app.on('router-error', error => {
    console.error('uncaught router error', { error });
  });

  app.use(helmet());
  app.use(bodyparser());

  // Cors only accept subdomains queries
  app.use(cors({ origin: ctx => {
    const { origin } = ctx.request.header;
    if (!origin.endsWith(domain)) {
      throw new Error('Access denied');
    }
    return ctx.request.header.origin
  }}));

  // Add subdomaain in context so we know if witch website we are over the api
  app.use((ctx, next) => {
    const { origin } = ctx.request.header;
    const subdomain = `${origin}`.substring(0, origin.length - domain.length);
    ctx.state = ctx.state ? {...ctx.state, subdomain } : { subdomain };
    return next();
  })

  const router = new Router();

  router.use(async (ctx, next) => {
    const { method, url } = ctx.req;

    console.log('request in', { method, url });
    try {
      await next();
    } catch (error) {
      ctx.res.statusCode = 500;
      ctx.body = { error: 'action error' };
    }
    console.log('request out', { method, url, statusCode: ctx.res.statusCode });
  });

  router.get('/', async ctx => {
    ctx.body = { ok: Date.now(), route: '/', secrets: secrets };
  });

  router.get('/insert', async ctx => {
    const { subdomain } = ctx.state;
    const collection = await getCollection('items');
    const result = await collection.insertOne({ date: Date.now(), subdomain });
    ctx.body = { insert: result };
  });

  router.get('/get', async ctx => {
    const { subdomain } = ctx.state;
    const collection = await getCollection('items');
    const result = await collection.find({ subdomain }).toArray();
    ctx.body = { items: result };
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};

export default serverFactory;
