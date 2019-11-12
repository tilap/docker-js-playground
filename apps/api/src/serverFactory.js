import assert from 'assert';
import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors';
import json from 'koa-json';
import Router from 'koa-router';

const serverFactory = ({ getCollection, secrets }) => {
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

  // /!\ Ultra lazy quick way to allow anyting ^^
  app.use(cors({ origin: ctx => ctx.request.header.origin }));

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
    const collection = await getCollection('items');
    const result = await collection.insertOne({ date: Date.now() });
    ctx.body = { insert: result };
  });

  router.get('/get', async ctx => {
    const collection = await getCollection('items');
    const result = await collection.find({}).toArray();
    ctx.body = { items: result };
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
};

export default serverFactory;
