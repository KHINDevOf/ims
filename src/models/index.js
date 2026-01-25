// // 'use strict';

// // const fs = require('fs');
// // const path = require('path');
// // const Sequelize = require('sequelize');
// // const process = require('process');
// // const basename = path.basename(__filename);
// // const env = process.env.NODE_ENV || 'development';
// // const config = require(__dirname + '/../../config/config.json')[env];

// // const data = new Sequelize(
// //   process.env.MYSQLDATABASE,
// //   process.env.MYSQLUSER,
// //   process.env.MYSQLPASSWORD,
// //   {
// //     host: process.env.MYSQLHOST,
// //     port: process.env.MYSQLPORT,
// //     dialect: "mysql",
// //     logging: false,
// //   }
// // );
// // const db = {};

// // let sequelize;
// // if (config.use_env_variable) {
// //   sequelize = new Sequelize(process.env[config.use_variable], config);
// // } else {
// //   sequelize = new Sequelize(config.database, config.username, config.password, config);
// // }

// // fs
// //   .readdirSync(__dirname)
// //   .filter(file => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach(file => {
// //     try {
// //       const modelExport = require(path.join(__dirname, file));
// //       let model;

// //       if (typeof modelExport === 'function') {
// //         model = modelExport(sequelize, Sequelize.DataTypes);
// //       } else {
// //         model = modelExport;
// //       }

// //       if (model && model.name) {
// //         db[model.name] = model;
// //       }
// //     } catch (error) {
// //       // console.error(`Error loading model ${file}:`, error.message);
// //     }
// //   });

// // Object.keys(db).forEach(modelName => {
// //   if (db[modelName].associate) {
// //     try {
// //       db[modelName].associate(db);
// //     } catch (error) {
// //       // console.error(`Error associating model ${modelName}:`, error.message);
// //     }
// //   }
// // });

// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// // db.data = data;

// // module.exports = db;

// "use strict";

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";

// // local config (for development only)
// let config = {};
// try {
//   config = require(__dirname + "/../../config/config.json")[env] || {};
// } catch (e) {
//   config = {};
// }

// const db = {};

// // ✅ Use Railway env vars if available, otherwise fallback to config.json
// const hasRailwayMysql =
//   process.env.MYSQLHOST &&
//   process.env.MYSQLUSER &&
//   process.env.MYSQLDATABASE &&
//   process.env.MYSQLPASSWORD;

// const sequelize = hasRailwayMysql
//   ? new Sequelize(
//       process.env.MYSQLDATABASE,
//       process.env.MYSQLUSER,
//       process.env.MYSQLPASSWORD,
//       {
//         host: process.env.MYSQLHOST,
//         port: process.env.MYSQLPORT || 3306,
//         dialect: "mysql",
//         logging: false,
//       },
//     )
//   : new Sequelize(config.database, config.username, config.password, {
//       host: config.host || "fullstacks",
//       port: config.port || 3306,
//       dialect: config.dialect || "mysql",
//       logging: false,
//       ...(config || {}),
//     });

// // Load all models
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const modelExport = require(path.join(__dirname, file));
//     const model =
//       typeof modelExport === "function"
//         ? modelExport(sequelize, Sequelize.DataTypes)
//         : modelExport;

//     if (model && model.name) db[model.name] = model;
//   });

// // Run associations
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    logging: false,
  }
);


module.exports = { sequelize };
