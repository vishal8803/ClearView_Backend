var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertframetype',upload.single('icon'),function(req,res)
{
    pool.query('insert into frametypes (frametypename, adpicture, status) values (?,?,?)',[req.body.frametypename,req.body.myfileName,req.body.status],function(error,result){
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

router.get('/fetchAllframetype', function(req, res) {
    pool.query('select * from frametypes',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deleteframetype',function(req,res)
{
    pool.query('delete from frametypes where frameid=? ',[req.body.frameid],function(error,result){
     
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updateframetype',function(req,res)
{
    pool.query('update  frametypes set frametypename=? , status=? where frameid=? ',[req.body.frametypename,req.body.status , req.body.frameid],function(error,result){
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

router.post('/updateframetypePicture',upload.single('adpicture'),function(req,res)
{
    pool.query('update frametypes set adpicture=? where frameid=? ',[req.body.myfileName , req.body.frameid],function(error,result){
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
