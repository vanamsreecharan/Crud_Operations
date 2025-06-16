const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());

const sequelize=require('./db');
const userRoutes=require('./Routes/routes');
app.use(express.static('public'));
app.use(express.json());
app.use('/',userRoutes);
app.get('/',(req,res)=>{
res.send("your get request is working!");
});

sequelize.sync({alter:true})
.then(()=>{
    console.log('database synchronized');
    app.listen(3000,()=>{
        console.log('server running at http://localhost:3000');
    });  
}).catch((error)=>{
console.log('error synchronized the database',error);
}
);
