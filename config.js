require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
  frontendUrl: process.env.FRONTEND_URL,
};