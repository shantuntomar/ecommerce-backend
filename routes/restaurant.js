var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/addnewrestaurant',upload.any(), function (req, res, next) {
    console.log(req.files)
    pool.query("insert into restaurant(restaurant_name, owner_name, address, state, city, zipcode, location, emailaddress, type, mobilenumber, idproof, idproofimage, shopact, shopactimage, fssai, fssaiimage, gst, status, logo, password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.restaurant_name,
            req.body.owner_name,
            req.body.address,
            req.body.state,
            req.body.city,
            req.body.zipcode,
            req.body.location,
            req.body.emailaddress,
            req.body.type,
            req.body.mobilenumber,
            req.body.idproof,
            // idproofimage,
            req.files[0].originalname,
            req.body.shopact,
            // shopactimage,
            req.files[1].originalname,
            req.body.fssai,
            // fssaiimage,
            req.files[2].originalname,
            req.body.gst,
            req.body.status,
            // logo,
            req.files[3].originalname,
            req.body.password
        ],function(error,result){
            if(error){
                console.log(error);
                res.status(500).json({result:false})
            }
            else{
                res.status(200).json({result:true})
            }

        })
});

router.get('/listrestaurant' , function(req,res){

    console.log(req.headers);

    // var token = jt.verify(
    //     console.log(req.headers),
    //     //req.headers.authorization,
    //     'thenumericinfosystempvtltdgwali'
    // )

    pool.query("select R.* , (select S.statename from states S where S.stateid=R.state) as Statename, (select C.cityname from cities C where C.cityid=R.city) as cityname from restaurant R" , function(error,result){
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.post('/restaurantbyid' , function(req,res){
    pool.query("select R.* , (select S.statename from states S where S.stateid=R.state) as Statename, (select C.cityname from cities C where C.cityid=R.city) as cityname from restaurant R where R.restaurant_id = ?" , [req.body.restaurant_id] , function(error,result){
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.post('/editrestaurant', function (req, res, next) {
    console.log(req.files)
    pool.query("update restaurant set restaurant_name=?, owner_name=?, address=?, state=?, city=?, zipcode=?, location=?, emailaddress=?, type=?, mobilenumber=?, idproof=?, shopact=?, fssai=?, gst=?, status=? where restaurant_id=?",
    [
        
            req.body.restaurant_name,
            req.body.owner_name,
            req.body.address,
            req.body.stateId,
            req.body.city,
            req.body.zipcode,
            req.body.location,
            req.body.emailaddress,
            req.body.type,
            req.body.mobilenumber,
            req.body.id,
            req.body.shopact,
            req.body.fssai,
            req.body.gst,
            req.body.status,
            req.body.restaurant_id,
    ],
            
        function(error,result){
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

router.post('/updateIdProofImage' , upload.single('idproofimage') , function(req,res) {
    pool.query("update restaurant set idproofimage=? where restaurant_id=?", 
    [
        req.file.originalname,
        req.body.restaurantid

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

router.post('/updateShopActImage' , upload.single('shopactimage') , function(req,res) {
    pool.query("update restaurant set shopactimage=? where restaurant_id=?", 
    [
        req.file.originalname,
        req.body.restaurantid

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

router.post('/updateFssaiImage' , upload.single('fssaiimage') , function(req,res) {
    pool.query("update restaurant set fssaiimage=? where restaurant_id=?", 
    [
        req.file.originalname,
        req.body.restaurantid

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})


router.post('/updateLogoImage' , upload.single('logo') , function(req,res) {
    pool.query("update restaurant set logo=? where restaurant_id=?", 
    [
        req.file.originalname,
        req.body.restaurantid

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})



router.post('/deleterestaurant' , function(req,res) {
    pool.query("delete from restaurant where restaurant_id=?", 
    [
        req.body.restaurantid

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

// food item backend 

router.post('/addfooditems' , upload.any() , function (req , res , next) {
    pool.query("insert into fooditems(restaurant_id, foodtype, foodtypeimage, foodtypead, status, foodimage) values(?,?,?,?,?,?)" , 
        [
            req.body.restaurant_id,
            // req.body.foodtype_id,
            req.body.foodtype,
            req.files[0].originalname,
            req.body.foodtypead,
            req.body.status,
            req.files[1].originalname,
        ], 
        function (error , result ){
            if(error){
                console.log(error);
                res.status(500).json({result:false})
            }
            else{
                res.status(200).json({result:true})

            }
        }
    )
})

router.post('/listfooditemsbyrestaurant' , function( req , res){
    pool.query("select * from fooditems where restaurant_id=?", [req.body.restaurant_id] ,  function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.get('/listfooditems' , function( req , res){
    pool.query("select * from fooditems",  function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.post('/editfooditem', function (req, res, next) {
    console.log(req.files)
    pool.query("update fooditems set restaurant_id=?, foodtype=?, foodtypead=?, status=? where fooditem_id=?",
    [
        
            req.body.restaurant_id,
            // req.body.foodtype_id,
            req.body. foodtype,
            req.body.foodtypead,
            req.body.status,
            req.body.fooditem_id,
    ],
            
        function(error,result){
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

router.post('/updatefoodtypeimage' , upload.single('foodtypeimage') , function(req,res) {
    pool.query("update fooditems set foodtypeimage=? where fooditem_id=?", 
    [
        req.file.originalname,
        req.body.fooditem_id

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

router.post('/updatefoodimage' , upload.single('foodimage') , function(req,res) {
    pool.query("update fooditems set foodimage=? where fooditem_id=?", 
    [
        req.file.originalname,
        req.body.fooditem_id

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

router.post('/deletefooditems' , function(req,res) {
    pool.query("delete from fooditems where fooditem_id=?", 
    [
        req.body.fooditem_id

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

router.post('/checklogin', function(req, res, next) {
    pool.query("select * from restaurant  where (emailaddress=? or  mobilenumber=?) and password=?",
    [
        req.body.emailid, 
        req.body.emailid, 
        req.body.password
    ], function (error , result ) {
        if(error){
            console.log(error);
            res.status(500).json({result:false})
        }
        else{
          //   for basic security 
          if(result.length == 1){
            res.status(200).json({result:true , data:result[0]});
          }
          else{
              res.status(500).json({result:false , data:[]});
          }
        }
    } )
});

// food type backend 

router.post('/addfoodtypes' , upload.single('foodimage') , function (req , res , next) {
    pool.query("insert into foodtype (restaurant_id, food_id, fooditem, foodtype, foodimage, price, offer, offertype, ingredients) values(?,?,?,?,?,?,?,?,?)", 
        [
            req.body.restaurantid,
            req.body.foodtypeid,
            req.body.fooditem,
            req.body.foodtype,
            req.file.originalname,
            req.body.price,
            req.body.offer,
            req.body.offertype,
            req.body.ingredients,
        ], 
        function (error , result ){
            if(error){
                console.log(error);
                res.status(500).json({result:false})
            }
            else{
                res.status(200).json({result:true})

            }
        }
    )
})

router.get('/listfoodtypes' , function( req , res){
    pool.query("select * from foodtype where fooditem_id", [req.body.fooditem_id] , function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.post('/listfoodtypesoffer' , function( req , res){
    pool.query("select * from foodtype where offer > 0 and restaurant_id=?", [req.body.restaurant_id] , function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.post('/listfoodtypesbyfooditems' , function( req , res){
    pool.query("select * from foodtype", function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.post('/listfoodtypesoffer' , function( req , res){
    pool.query("select * from foodtype where restaurant_id=? and offer > 0" , [req.body.restaurant_id], function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.post('/savefoodimage' , upload.single('foodimage') , function(req,res) {
    pool.query("update fooditems set foodimage=? where foodtype_id=?", 
    [
        req.file.originalname,
        req.body.foodtype_id

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

router.post('/editfoodtypes', function (req, res, next) {
    console.log(req.files)
    pool.query("update foodtype set restaurant_id=?, food_id=?, fooditem=?, foodtype=?, price=?, offer=?, offertype=?, ingredients=?",
    [
        
            req.body.restaurant_id,
            req.body.food_id,
            req.body. fooditem,
            req.body.foodtype,
            req.body.price,
            req.body.offer,
            req.body.offertype,
            req.body.ingredients,
    ],
            
        function(error,result){
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

router.post('/deletefoodtypes' , function(req,res) {
    pool.query("delete from foodtype where foodtype_id=?", 
    [
        req.body.foodtype_id

    ], 
    
    function (error , result) {
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true})

        }
    })


})

// manage order details 

router.post('/generateorder' , function (req , res , next) {
    pool.query("insert into ordergeneration (orderdate , ordertime , mobileno , emailid , totalamount ) values(?,?,?,?,?)", 
        [
            req.body.orderdate,
            req.body.ordertime,
            req.body.mobileno,
            req.body.emailid,
            req.body.totalamount,
        ], 
        function (error , result ){
            if(error){
                console.log(error);
                res.status(500).json({result:false})
            }
            else{
                res.status(200).json({result:true , orderid: result.insertId})

            }
        }
    )
})

router.post('/submitorder' , function (req , res , next) {
    q = 
    "insert into orders (orderid , orderdate, ordertime, mobileno, emailid, fooditem, qtydemand, price, offer, amount, deliverystatus, paymentstatus, paymentmode, restaurant_id, deliverat , fooditem_id , totalamount) values ?";
    pool.query(
        q,
        [
            req.body.cart.map((item)=>[

                req.body.orderid,
                req.body.orderdate,
                req.body.ordertime,
                req.body.mobileno,
                req.body.emailid,
                item.fooditem,
                item.qtydemand,
                item.price,
                item.offer,
                item.amount,
                req.body.deliverystatus,
                req.body.paymentstatus,
                req.body.paymentmode,
                req.body.restaurantid,
                req.body.deliverat,
                item.foodtype_id,
                req.body.totalamount,
            ])
        ], 
        function (error , result ){
            if(error){
                console.log(error);
                res.status(500).json({result:false})
            }
            else{
                res.status(200).json({result:true})

            }
        }
    )
})

router.get('/fetchOrders' , function( req , res){
    pool.query("select * from orders", function(error , result) {
        if(error){
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})




module.exports = router;


