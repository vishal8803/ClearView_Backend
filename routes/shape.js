var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertShape',upload.single('icon'),function(req,res)
{
    pool.query('insert into shapes (shapename, adpicture, status) values (?,?,?)',[req.body.shapename,req.body.myfileName,req.body.status],function(error,result){
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


router.get('/fetchAllShape', function(req, res) {
    pool.query('select * from shapes',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deleteShape',function(req,res)
{
    pool.query('delete from shapes where shapeid=? ',[req.body.shapeid],function(error,result){
     
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updateshape',function(req,res)
{
    pool.query('update  shapes set shapename=? , status=? where shapeid=? ',[req.body.shapename,req.body.status , req.body.shapeid],function(error,result){
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

router.post('/updateShapePicture',upload.single('adpicture'),function(req,res)
{
    pool.query('update shapes set adpicture=? where shapeid=? ',[req.body.myfileName , req.body.shapeid],function(error,result){
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
