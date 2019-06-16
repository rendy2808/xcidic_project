var express = require('express');
var router = express.Router();
var { dbData, op } = require('../config/db')
var { taskData, op } = require('../config/db')



/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(dbData.)
  dbData.UserModel.findAll({

  }).then(data => {
    res.send(data)
  })
});

module.exports = router;
