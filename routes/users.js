var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var randomInt = require('random-int')

var { dbData, op } = require('../config/db')
const salt = bcrypt.genSaltSync(9);
const payload_key = 'GundamGundamapayangRandomhayooooo12345678'
const payload_key_admin = 'AdminGundamGundamapayangRandomhayooooo12345678'



function verifyTokenAdmin(req,res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorized Request')
  }
  let token = req.headers.authorization
  if(token === 'null'){
      return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, payload_key_admin)
  if(!payload){
      return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

function verifyTokenUser(req,res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorized Request')
  }
  let token = req.headers.authorization
  if(token === 'null'){
      return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, payload_key)
  if(!payload){
      return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

/* GET users listing. */
router.post('/login', function(req, res, next) {
  dbData.UserModel.findOne({
    where:{
      username:req.body.username
    }
  }).then(dataUser => {
    if(dataUser == null){
      res.send({success:false,message:'Data not found'})
    }else{
      if(bcrypt.compareSync(req.body.password, dataUser.password) === false){
        res.send({success:false,message:'Incorrect Auth'})
      }else{
        let payload = {subject:dataUser.id,username:dataUser.username,type:dataUser.type}
        if(dataUser.type == 'admin'){
          let token = jwt.sign(payload,payload_key_admin)
        }else{
          let token = jwt.sign(payload,payload_key)
        }
        res.send({success:true,dataUser,token})
      }
    }
  })
});

router.post('/register', function(req, res, next) {
  var password = bcrypt.hashSync(req.body.password, salt);
  var today = new Date();
  dbData.UserModel.create({
    id : randomInt(100000,999999),
    name : req.body.name,
    password : password,
    username : req.body.username,
    type : req.body.type,
    created : today,
    updated : today
  }).then(user=>{
    res.send({success:true,user})
  }).catch(err => res.send({success:false}))
});

module.exports = router;
