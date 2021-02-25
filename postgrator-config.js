require("dotenv").config();

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  ssl: true,
  connectionString: process.env.DATABASE_URL,
};
