module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "localhost:3000",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://wes@localhost/bjj-symposium",
};
