/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true
      }
    }
  }
); 

module.exports = sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // This file will be created automatically
});

module.exports = sequelize;*/
const mongoose = require('mongoose');

const uri = 'mongodb+srv://vanamsricharan75:D6xnacvXoKw8zF9M@cluster0.c4uj7qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;


