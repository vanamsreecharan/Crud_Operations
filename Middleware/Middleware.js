const jwt=require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(authHeader&&authHeader.startsWith('Bearer')){
        const token=authHeader.split(' ')[1];//extracting jwt token from authorization header

        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return res.status(403).json({message:'invalid token'});
            req.user=user;
            next();
        });
    }
    else{
        res.status(401).json({message:'Authorization token missing'});
    }
};
const authorizeRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!req.user||!roles.include(req.user.Role)){
            return res.status(403).json({
                message:'Access Denied:Role is not mentioned'
            });
        }
            next();
    };
};
module.exports={authenticateJWT,authorizeRoles};
