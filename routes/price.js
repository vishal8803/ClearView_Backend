var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertPrice',function(req,res)
{
    pool.query('insert into price (minprice, maxprice) values (?,?)',[req.body.minprice,req.body.maxprice],function(error,result){
        console.log(error)
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})


router.get('/fetchAllPrice', function(req, res) {
    pool.query('select * from price',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deltePrice',function(req,res)
{
    pool.query( 'delete from price where priceid=?' ,[req.body.priceid],function(error,result){
        // console.log(error)
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updateprice',function(req,res)
{
    pool.query('update  price set minprice=? , maxprice=? where priceid=? ',[req.body.minprice,req.body.maxprice , req.body.priceid],function(error,result){
        console.log(error)
        if(error)
        
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})


module.exports = router;
