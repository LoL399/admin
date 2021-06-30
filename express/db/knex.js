const config = require("../configs");

module.exports = require("knex")({
  client: "pg",
  connection: {
    host: config.host || "127.0.0.1",
    user: config.user || "postgres",
    password: config.password || "Loito2112",
    database: config.database || "lemoncat",
    charset: "utf8",
  },
  migrations: {
    directory: __dirname + "/migrations",
  },
  seeds: {
    directory: __dirname + "/seeds",
  },
  useNullAsDefault: true,
});