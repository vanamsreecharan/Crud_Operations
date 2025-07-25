/*const express=require('express');
const router=express.Router();
const userController=require('../Controllers/controller');
router.post('/users',userController.createUser);
router.get('/users',userController.getAllUsers);
router.get('/users/:id',userController.getUserById);
router.delete('/users/:id',userController.deleteUserById);
router.put('/users/:id',userController.updateUserById);
router.get('/company-summary',userController.getCompanySummary);
module.exports=router;*/
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/controller');
const { authenticateJWT, authorizeRoles } = require('../Middleware/Middleware');

router.post('/users',userController.createUser);
router.get('/users',userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUserById);
router.put('/users/:id', userController.updateUserById);
router.get('/summary', userController.getCompanySummary);

module.exports = router;
