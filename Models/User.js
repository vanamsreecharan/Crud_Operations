const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {

    employeeid:{
    type: DataTypes.STRING,
      unique:true,
       allowNull:false,
       primaryKey:true,
        
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey:true,
          validate:{
            isEmail:true,
            isSignavoxEmail(value){
                if(!value.endsWith('@signavoxtechnologies.com')){
                    throw new Error('Email must end with @signavoxtechnologies.com');
                }
            }
          }
    },
    Role:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
               isValidRole(value){
                const allowedRoles=[
                    'testing','developer','hr','manager','teamlead','ceo','operations'
                ];
                if(!allowedRoles.includes(value.toLowerCase())){
                    throw new Error('Role must be one of these:testing,developer,hr,manager,teamlead,ceo,operations');
                }
               }
            }

    },
    Address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
   DOB: {
  type: DataTypes.DATEONLY
},

    PhoneNumber: {
        type: DataTypes.BIGINT,
        unique:true,
        primarykey:true,
    }
}, {
    tableName: 'users',
    timestamps: false,
    id: false,

});


module.exports = User;


