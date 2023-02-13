const express=require("express");
const jwt =  require('jsonwebtoken');
const bcrypt = require("bcrypt");
const sqlcon=require("../../databasevariables/sqlcon");
const mysql = require("mysql2");
const path=require("../../../path");



const result={
post: async (req,res)=>{
    console.log(req.body);
    let {email , password} = req.body;
    // var hashedpassword;
    if(email && password){
      bcrypt.hash(password,process.env.SALT,(err,hash)=>{
        hashedpassword=hash;
      });
      email=email.toLowerCase();
      var query= "SELECT * FROM user WHERE email = '"+email+"';";
      sqlcon.query(query, function (err, result) {
        if (!err){
          if(result.length!=0){
            if(result[0].password==password){
              if(result[0].verify==true){
                // res.status(200).json({
                //   status:true,
                //   msg:"User Exist"
                // });
                res.redirect("dashboard/"+
                result[0].id
                );

              }else{
                res.redirect("signup/verifyotp/"+
                email
                );

              }

            }else{
              res.status(401).json({
                success:false,
                msg:"Password incorrect"
              });

            }


          }else{
            res.status(404).json({
              success:false,
              msg:"Email ID don't exist"
            });
          }
        }else{
          res.status(500).json({success:false,
              msg:"Internal Server Database error",
              err:err});
  
        }
      });
  
  
    }else{
      res.status(400).json({success:false,
      msg:"One of the field Found Missing"});
  }
  },
  get:(req,res)=>{
    // res.json({
    //   status:200,
    //   msg:"ready to login"
    // })
    res.sendFile(path+"/public/login.html");
  },

  post:async (req,res)=>{
    var email = req.body.email;
   
      //console.log(sendEmail(email, fullUrl));
   
      connection.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
          if (err) throw err;
           
          var type = ''
          var msg = ''
     
          console.log(result[0]);
       
          if (result[0].email.length > 0) {
   
             var token = randtoken.generate(20);
   
             var sent = sendEmail(email, token);
   
               if (sent != '0') {
   
                  var data = {
                      token: token
                  }
   
                  connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
                      if(err) throw err
           
                  })
   
                  type = 'success';
                  msg = 'The reset password link has been sent to your email address';
   
              } else {
                  type = 'error';
                  msg = 'Something goes to wrong. Please try again';
              }
   
          } else {
            console.log('2');
              type = 'error';
              msg = 'The Email is not registered with us';
   
          }
      
          req.flash(type, msg);
          res.redirect('/');
      });
  },
  post:async (req,res)=>{
 
    var token = req.body.token;
    var password = req.body.password;
 
   connection.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
        if (err) throw err;
 
        var type
        var msg
 
        if (result.length > 0) {
                
              var saltRounds = 10;
 
             // var hash = bcrypt.hash(password, saltRounds);
 
            bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(password, salt, function(err, hash) {
 
                   var data = {
                        password: hash
                    }
 
                    connection.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
                        if(err) throw err
                   
                    });
 
                  });
              });
 
            type = 'success';
            msg = 'Your password has been updated successfully';
              
        } else {
 
            console.log('2');
            type = 'success';
            msg = 'Invalid link; please try again';
 
            }
 
        req.flash(type, msg);
        res.redirect('/');
    });
}
  

}


module.exports = result;