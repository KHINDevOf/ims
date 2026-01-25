
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("fullstacks", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
//   logging: false, 
// });

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE || "fullstacks",
  process.env.MYSQLUSER || "root",
  process.env.MYSQLPASSWORD || "",
  {
    host: process.env.MYSQLHOST || "localhost",
    port: Number(process.env.MYSQLPORT || 3306),
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      // Railway MySQL often requires this, safe to keep
      connectTimeout: 30000,
    },
  }
);

module.exports = sequelize;
