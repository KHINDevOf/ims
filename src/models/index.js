"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// local config (for development only)
let config = {};
try {
  config = require(__dirname + "/../../config/config.json")[env] || {};
} catch (e) {
  config = {};
}

const db = {};

// ✅ Use Railway env vars if available, otherwise fallback to config.json
const hasRailwayMysql =
  process.env.MYSQLHOST &&
  process.env.MYSQLUSER &&
  process.env.MYSQLDATABASE &&
  process.env.MYSQLPASSWORD;

// Try public URL first if available, then internal
const hasRailwayPublicUrl = process.env.MYSQL_PUBLIC_URL;

let sequelize;

if (hasRailwayPublicUrl) {
  // Use public URL connection (more reliable for Railway)
  console.log("🔄 Using Railway MySQL public URL connection");
  console.log("   Public URL:", process.env.MYSQL_PUBLIC_URL ? "***configured***" : "not set");
  sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else if (hasRailwayMysql) {
  // Use individual environment variables
  console.log("🔄 Using Railway MySQL individual variables");
  console.log("   Host:", process.env.MYSQLHOST);
  console.log("   Database:", process.env.MYSQLDATABASE);
  console.log("   User:", process.env.MYSQLUSER);
  console.log("   Port:", process.env.MYSQLPORT || 3306);
  sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT || 3306,
      dialect: "mysql",
      logging: false,
      dialectOptions: {
        connectTimeout: 60000,
        acquireTimeout: 60000,
        timeout: 60000,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
} else {
  // Local development fallback
  console.log("🔄 Using local config.json");
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host || "localhost",
    port: config.port || 3306,
    dialect: config.dialect || "mysql",
    logging: false,
    ...(config || {}),
  });
}

// Load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    try {
      const modelExport = require(path.join(__dirname, file));
      const model =
        typeof modelExport === "function"
          ? modelExport(sequelize, Sequelize.DataTypes)
          : modelExport;

      if (model && model.name) {
        db[model.name] = model;
      }
    } catch (error) {
      console.log(`⚠️  Model not loaded: ${file}`);
    }
  });

// Run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
    } catch (error) {
      console.log(`⚠️  Association error for ${modelName}:`, error.message);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;