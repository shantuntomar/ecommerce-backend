var express = require('express');
const pool = require('./pool');
var router = express.Router();
var jt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage;
// scratch is a folder in web server where all token and security is manage 
localStorage = new LocalStorage("./scratch");

/* GET home page. */
router.post('/checkadminlogin', function (req, res, next) {
  pool.query("select * from superadmin where emailid=? and password=?",
    [
      req.body.emailid,
      req.body.password
    ], function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false })
      }
      else {
        //   for basic security 
        if (result.length == 1) {
          res.status(200).json({ result: true });
        }
        else {
          res.status(500).json({ result: false });
        }
      }
    })
});

router.get("/assignToken", function (req, res, next) {

  try {

    var token = jt.sign({ id: 100 }, 'thenumericinfosystempvtltdgwali', { expiresIn: '60s' })
    console.log(token);
    //localStorage.setItem("token" , token);
    res.status(200).json({access_token:token});
  }
  
  catch (e) {

    console.log("get token => ", e);
    res.status(500).json({access_token:null});
  }

})

router.get("/readToken", function (req, res, next) {

  try {

    var v = jt.verify(
      localStorage.getItem("token" , v),
      'thenumericinfosystempvtltdgwali'
      
    )
  }
  
  catch (e) {

    console.log("error => ", e);
  }

})

module.exports = router;


