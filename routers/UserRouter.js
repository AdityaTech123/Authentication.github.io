const express= require('express');
const loginController = require('../controllers/UserController');

const router= express.Router();

const isAuthenticated= (req,res,next) =>{
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/notAuthenticated');
  }
}

router.get('/logIn', loginController.showLogInPage);
router.get('/signUp',loginController.showSignUpPage);
router.post('/logIn',loginController.createNewUser);
router.post('/home',loginController.logInHomePage);
router.get('/notAuthenticated', loginController.showUnautherizedPage)
router.get('/home',isAuthenticated, loginController.showHomePage);
router.get('/resetPassword',loginController.showResetPPage);
router.post('/resetPassword/:id',loginController.updatePassword);
router.get('/home/:id', loginController.getUserDetails);
router.get('/forgotPassword',loginController.showForgotPPage);
router.post('/forgotPassword',loginController.generatePassword);
router.get('/logout',(req,res)=>{
  req.logout();
  req.session.destroy(err=>{
    if(err){
      return res.sendStatus(500);
    }
    res.redirect('/logIn');
  });
})

module.exports=router;