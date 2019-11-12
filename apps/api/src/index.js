import serverFactory from './serverFactory';
import config from './config';
import { getCollection } from './mongo';

const { port, secrets } = config;

const app = serverFactory({ getCollection, secrets });

app.listen(port, error => {
  if (error) {
    console.error('Server failed', { error });
    return false;
  }
  console.log('Api server is listening', { port });
});
