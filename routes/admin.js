var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.post('/checkadmincredential', function(req, res) {
    pool.query('select * from admin where emailid=? and password=?',[req.body.emailid , req.body.password],function(error,result){
        console.log(error)
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            if(result.length==1){
            res.status(200).json({status:true , data:result});
            }else
            {
                res.status(200).json({status:false}); 
            }
        }
    })
});

module.exports = router;