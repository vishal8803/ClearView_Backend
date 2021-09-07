var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.get('/fetchallstates', function(req, res) {
        pool.query('select * from state',function(error,result){
            if(error)
            {
                res.status(500).json([]);
            }else
            {
                res.status(200).json({data:result});
            }
        })
});

router.post('/insertstore',upload.single('picture'),function(req,res)
{
    pool.query('insert into storelocation ( storeState, storeCity, storeName, addressOne, addressTwo, landMark, lat, lng, contactNumber, email, picture) values (?,?,?,?,?,?,?,?,?,?,?)',[req.body.state,req.body.city,req.body.storename,req.body.addressone,req.body.addresstwo,req.body.landmark,req.body.lattitude,req.body.longitude,req.body.mobilenum,req.body.emailaddress,req.body.myfileName],function(error,result){
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

router.get('/fetchAllStores', function(req, res) {
    pool.query('select * from storelocation',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/updateStore',function(req,res)
{
    pool.query('update  storelocation set storeState=?, storeCity=?, storeName=?, addressOne=?, addressTwo=?, landMark=?, lat=?, lng=?, contactNumber=?, email=? where storeId=? ',[req.body.state,req.body.city,req.body.storename,req.body.addressone,req.body.addresstwo,req.body.landmark,req.body.lattitude,req.body.longitude,req.body.mobilenum,req.body.emailaddress,req.body.storeId],function(error,result){
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

router.post('/deleteStore',function(req,res)
{
    pool.query('delete  from storelocation where storeId=? ',[req.body.storeId],function(error,result){
        console.log(req.body.storeId)
        if(error)
        
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updatetPictureStore',upload.single('picture'),function(req,res)
{
    pool.query('update  storelocation set picture=? where storeId=? ',[req.body.myfileName , req.body.storeId],function(error,result){
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
