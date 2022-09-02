var express = require('express');
const { UnavailableForLegalReasons } = require('http-errors');
var router = express.Router();
var pool = require('./pool');

/* GET home page. */

router.post('/checkMob', function(req, res, next) {
  pool.query('select * from userdetails where mobileno=?' , [req.body.mobileno] , function(error , result){
      if(error){
          console.log(error)
          res.status(500).json({result:false})

      }
      else{
          if(result.length == 0){
            res.status(200).json({result:false})
          }
          else{
            res.status(200).json({result:true , data:result[0]});
          }

      }
  })
});

router.post('/insertUserDeatils', function(req, res, next) {
  pool.query('insert into userdetails set mobileno=? , emailid=? , firstname=? , password=? , addressstatus=false', 
    [
      req.body.mobileno,
      req.body.emailid,
      req.body.firstname,
      req.body.password,

    ] , 
    function(error , result){
      if(error){
        console.log(error);
        res.status(500).json({result:false})
      }
      else{
        res.status(200).json({result:true})
      }

    }
  )

});

router.post('/updateUserDetails', function(req, res, next) {
  pool.query('update userdetails set address1=? , address2=? , state=? , city=? , zipcode=? ,  addressstatus=true where mobileno=?', 
    [
      req.body.address1,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.zipcode,
      req.body.mobileno,
    ] , 
    function(error , result){
      if(error){
        console.log(error);
        res.status(500).json({result:false})
      }
      else{
        res.status(200).json({result:true})
      }

    }
  )

});

module.exports = router;
