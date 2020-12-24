var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {OAuth2Client} = require("google-auth-library");  
const { response } = require('../app');
// const bcrypt = require('bcrypt')

const client = new OAuth2Client("99398379882-rgd084aj9nvmn18uhio87pa6cq31jov2.apps.googleusercontent.com")

// ======================
const base = new mongoose.Schema({
  name: {
      type: String,
      required: true
  }, 
  email: {
      type: String,
      required: true
  },
  imgUrl: {
      type: String,
  }
});
const signUpTemplateCopy = mongoose.model('users', base);

// router.post ("/test", (req,res)=>{
//   const {name , email}= req.body;
//   const signedUpUser = new signUpTemplateCopy({
//     username: name,
//     email: response.payload.email,
// });

// signedUpUser.save()
// .then(data => {
//   res.json(data)
// })
// .catch(error => {
//   res.json(error)
// });
// })
router.get('/:id', (req,res)=>{
  signUpTemplateCopy.findById(req.params.id,function(err, r) {
    if (err) throw err;
    console.log(r);
    if (r){
      res.json(r);
    }
  })
})
router.post('/GoogleLogin', function(req, res) {
  const {tokenId} = req.body;
  client.verifyIdToken({idToken : tokenId, audience:"99398379882-rgd084aj9nvmn18uhio87pa6cq31jov2.apps.googleusercontent.com"}).then(response =>{
    signUpTemplateCopy.findOne({email : response.payload.email},function(err, r) {
      if (err) throw err;
      console.log(r);
      if (r){
        res.json(r);
      }
      else{
        const signedUpUser = new signUpTemplateCopy({
          name: response.payload.name,
          email: response.payload.email,
          imgUrl: response.payload.picture,
      });
    
      signedUpUser.save()
          .then(data => {
              res.json(data)
          })
          .catch(error => {
              res.json(error)
          });
      }
    })
  })
});


module.exports = router;
