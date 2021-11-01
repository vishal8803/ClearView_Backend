var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.post('/fecthAllAddress',function(req,res){
    pool.query('select * from useraddress where mobilenum=?',[req.body.mobileNum],function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            if(result.length>0)
            res.status(200).json({data:result})
            else
            res.status(200).json({data:null})
        }
    })
})

router.post('/insertUserAddress',function(req,res){
    pool.query('insert into useraddress ( mobilenum, addressone, addresstwo, pincode, city, state, name, altmobilenum) values(?,?,?,?,?,?,?,?)',[req.body.mobileNum, req.body.addressone, req.body.addresstwo, req.body.pincode, req.body.city, req.body.state, req.body.name, req.body.altMobileNum],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:true})
        }
    })
})
router.post('/updateAddress',function(req,res){
    pool.query('update useraddress set mobilenum=?, addressone=?, addresstwo=?, pincode=?, city=?, state=?, name=?, altmobilenum=? where addressid=?',[req.body.mobileNum, req.body.addressone, req.body.addresstwo, req.body.pincode, req.body.city, req.body.state, req.body.name, req.body.altMobileNum,req.body.addressid],function(error,result){
   
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:true})
        }
    })
})

router.post('/deleteAddress',function(req,res){
    pool.query('delete from useraddress where addressid=?',[req.body.addressid],function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:true})
        }
    })
})

module.exports = router;