const {Sequelize}=require('sequelize');
const sequelize=new Sequelize('formcrud','root','123456',{
host:'localhost',
port: 3306,

dialect:'mysql'

});
module.exports=sequelize;
