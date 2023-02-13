const router = require("express").Router();
const signup = require("../componnents/authentications/user/signup");
const login= require("../componnents/authentications/user/login");
const dashboard=require("../componnents/dashboard/user/dashboard");
const forgotPassword = require("../componnents/authentications/user/login");
const updatePassword = require("../componnents/authentications/user/login");



//--user/signup
router.post('/signup',signup.post);
router.get('/signup',signup.get);
router.get('/signup/verifyotp/:email',signup.verifyotp);
router.post('/signup/verifyotp/:email',signup.checkotp);

router.post('/forgot-password', forgotPassword);
router.post('/update-password', updatePassword);



//--user/login
router.post('/login',login.post);
router.get('/login',login.get);

//--user/dashboard
router.get('/dashboard/:id',dashboard.get);



module.exports = router;