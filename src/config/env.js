const dotenv = require('dotenv');

dotenv.config();

// console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

// console.log(`Loaded env: [name]: ${requireEnv("PORT")}`)

module.exports = {
  port: Number(process.env.PORT || 3000),
  databaseUrl: requireEnv('DATABASE_URL'),
  dbSchema: process.env.DB_SCHEMA || 'public',
};