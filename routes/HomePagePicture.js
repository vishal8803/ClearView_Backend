var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/insertHomePagePicture',upload.single('picture'),function(req,res){
    pool.query('insert into homepagepicture (position,status,picture) values(?,?,?)',[req.body.position,req.body.status,req.body.myfileName],function(error,result){
        console.log(req.body)
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.get('/fetchAllPicture',function(req,res){
    pool.query('select * from homepagepicture',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result})
        }
    })
})


router.post('/deletePicture',function(req,res)
{
    pool.query('delete from homepagepicture where idhomepagepicture=? ',[req.body.pictureid],function(error,result){
     
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updatehomepagePictureDetails',function(req,res)
{
    pool.query('update  homepagepicture set position=? , status=? where idhomepagepicture=? ',[req.body.positionNumber,req.body.status , req.body.pictureid],function(error,result){
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

router.post('/updatehomepagePicture',upload.single('picture'),function(req,res)
{
    pool.query('update homepagepicture set picture=? where idhomepagepicture=? ',[req.body.myfileName , req.body.pictureid],function(error,result){
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

module.exports=router ;