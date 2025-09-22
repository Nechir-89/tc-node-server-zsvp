import pgp from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const db = pgp()({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

export default db;
