const express = require('express');
const Controller = require('../controllers/user.controller');
const middleware = require('../midlewares/auth.middleware');

const router = express.Router();


/* User RequireMents Apis  */
router.post('/register',Controller.RegisterUser);
router.post('/login',middleware.authUser,Controller.LoginUser)
router.post('/logout',Controller.LogoutUser);
router.get('/get-user/:id',middleware.authUser,Controller.getUser);
router.put('/update-user/:id',middleware.authUser,Controller.updateUser);
router.delete('/delete-user/:id',middleware.authUser,Controller.deleteUser);
router.put('/change-password/:id',middleware.authUser,Controller.ChangePassword);

module.exports = router;