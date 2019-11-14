const config = {
  domain: process.env.DOMAIN || 'domain.tld',
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoPort: process.env.MONGO_PORT || '27017',
  mongoDatabase: process.env.MONGO_DATABASE || 'my-app',
  port: process.env.API_PORT || 3001,
  secrets: process.env.SECRETS || 'secret,keys',
};

export default config;
