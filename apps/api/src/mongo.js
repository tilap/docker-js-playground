import { MongoClient } from 'mongodb';
import config from './config';

const { mongoHost: host, mongoPort: port, mongoDatabase: database } = config;

let connection;

const getConnection = async () => {
  if (!connection) {
    try {
      const mongoUrl = `mongodb://${host}:${port}`;
      connection = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
      console.info('Mongo connexion done');
    } catch (error) {
      console.error('Mongo connexion error', { error });
    }
  }
  return connection;
};

const getDb = async () => {
  const client = await getConnection();
  return client.db(database);
};

export const getCollection = async name => {
  const db = await getDb();
  return db.collection(name);
};
