const Sequelize = require('sequelize')
const op = Sequelize.Op

//OBD DATA database instance
const instanceData = new Sequelize(process.env.DB_OBD_DATA, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
  const dbData = {}
  const taskData = {}
  //Connect sequelize


dbData.Sequelize = Sequelize
dbData.instanceData = instanceData
dbData.UserModel = require('../models/user')(instanceData, Sequelize)
dbData.TaskModel = require('../models/task')(instanceData, Sequelize)


dbData.UserModel.hasMany(dbData.TaskModel);

//create new database if it doesn't already exist
instanceData.sync()
.then(()=>dbData.UserModel.sync({alter:true,preserveColumnsOnSync: true}))
.then(()=>dbData.TaskModel.sync({alter:true,preserveColumnsOnSync: true}))


instanceData
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    });

    module.exports = {
        'dbData' : dbData,
        'op' : op
      };