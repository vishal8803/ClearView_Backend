var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertColor',upload.single('adpicture'),function(req,res)
{
    pool.query('insert into color (colorname, adpicture, status) values (?,?,?)',[req.body.colorname,req.body.myfileName,req.body.status],function(error,result){
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

router.get('/fetchallColor', function(req, res) {
    pool.query('select * from color',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deletecolor',function(req,res)
{
    pool.query( 'delete from color where colorid=?' ,[req.body.colorid],function(error,result){
     
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updatecolor',function(req,res)
{
    pool.query('update  color set colorname=? , status=? where colorid=? ',[req.body.colorname,req.body.status , req.body.colorid],function(error,result){
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

router.post('/updatecolorpicture',upload.single('adpicture'),function(req,res)
{
    pool.query('update color set adpicture=? where colorid=? ',[req.body.myfileName , req.body.colorid],function(error,result){
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
