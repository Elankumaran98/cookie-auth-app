const config = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  secretKey: process.env.SECRET_KEY,
  refreshSecretKey: process.env.REFRESH_SECRET_KEY,
  clientUrl: process.env.CLIENT_URL,
};

export default config;
