const sequelize=require('./db');
sequelize.authenticate()
.then(()=>{
    console.log('connection usefull');
})
.catch(err=>{
console.log('failed connection');
console.error(err);
});