const sequelize = require('../db');
const User = require('../Models/User');
exports.createUser= async(req,res)=>{
    try{
        let{ employeeid,firstname,lastname,email_id,Role,Address,DOB,PhoneNumber}=req.body;
 if (!employeeid) {
      
      const lastUser = await User.findOne({
        order: [['employeeid', 'DESC']]
      });

      let newIdNumber = 1000;
      if (lastUser && lastUser.employeeid) {
        const lastId = parseInt(lastUser.employeeid.replace('SIG', ''), 10);
        newIdNumber = lastId + 1;
      }

      employeeid = `SIG${newIdNumber}`;
    }
        const newUser=await User.create({
            employeeid,
            firstname,
            lastname,
            email_id,
            Role,
            Address,
            DOB,
            PhoneNumber
        });
        res.status(201).json({
message:'user created successful!',
data:newUser
        });
    }
    catch(error){
        res.status(500).json({
            message:'failed to create',
            error:error.message
        });
    }
};
exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.findAll();
        res.status(200).json(users);
    }
    catch{
        res.status(500).json({
            message:'failed to fetch users',
            error:error.message
        });
    }
};
exports.getUserById=async(req,res)=>{
    try{
        const user=await User.findOne({where:{employeeid:req.params.id}});
        if(!user){
            return res.status(404).json({
                message:'user not found',
            })
        }
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({
            message:'failed to fetch users',
            error:error.message
        });
    }
};
exports.deleteUserById=async(req,res)=>{
     console.log(`DELETE request received for ID: ${req.params.id}`);
    try{
        const deletedaccount=await User.destroy({
where :{ employeeid:req.params.id}
        });
        if(deletedaccount==0){
        return res.status(404).json({
            message:'user not found',
        });
    }
    res.status(200).json({message:'user deleted successfully'});
    }
    catch(error){
        res.status(500).json({
            message:'failed to delete user',
            error:error.message,
        });
    }
};
exports.updateUserById=async(req,res)=>{
    try{
    const updatedUser=await User.update(req.body,{
        where:{employeeid:req.params.id}
    });
if(updatedUser[0]===0){
    return res.status(404).json({
        message:'user not found or nothing to update',
    });
}
// res.status(200).json(updatedUser);
 const userData = await User.findOne({ where: { employeeid: req.params.id } });
res.status(200).json({
    message:'user data updated successfully', 
    data: userData
});
}
catch(error){
res.status(500).json({
    message:'failed to update user',
    error:error.message,
});}}
exports.getCompanySummary=async(req,res)=>{
    try{
const totalEmployees=await User.count();
const roleSummary=await User.findAll({
attributes:['Role',[sequelize.fn('COUNT',sequelize.col('Role')),'count']],
group:['Role'],

});
res.status(200).json({
    message:'Company Data fetched successfully',
    totalEmployees,
    roleSummary,
});
    }
    catch(error){
res.status(500).json({
    message:'failed to fetch company summary',
    error:error.message,

});
    }
}


