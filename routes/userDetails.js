var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.post('/checkMobileNumber', function(req,res){
    pool.query('select * from userdetails where mobileNum=?',[req.body.mobileNum],function(error,result){
        if(error)
        {
            res.status(500).json([])
        }else
        {
            console.log(req.body.mobileNum)
            if(result.length==1)
            {
                res.status(200).json({result:true,data:result})
            }else
            {
                res.status(200).json({result:false})
            }
        }
    })
})

router.post('/insertUser',function(req,res){
    pool.query('insert into userdetails values(?,?,?,?)',[req.body.email,req.body.mobileNum,req.body.username,req.body.password],function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            var body = {email:req.body.email,mobileNum:req.body.mobileNum,username:req.body.username,password:req.body.password}
            res.status(200).json({result:true,data:body})
        }
    })
})

module.exports = router;