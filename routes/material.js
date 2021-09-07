var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertMaterial',upload.single('adpicture'),function(req,res)
{
    pool.query('insert into material (materialname, adpicture, status) values (?,?,?)',[req.body.materialname,req.body.myfileName,req.body.status],function(error,result){
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

router.get('/fetchAllMaterial', function(req, res) {
    pool.query('select * from material',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});
router.get('/fetchAllMaterialName', function(req, res) {
    pool.query('select materialname from material',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deletematerial',function(req,res)
{
    pool.query( 'delete from material where matarialid=?' ,[req.body.materialid],function(error,result){
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

router.post('/updatematerial',function(req,res)
{
    pool.query('update  material set materialname=? , status=? where matarialid=? ',[req.body.materialname,req.body.status , req.body.materialid],function(error,result){
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


router.post('/updatematerialpicture',upload.single('adpicture'),function(req,res)
{
    pool.query('update material set adpicture=? where matarialid=? ',[req.body.myfileName , req.body.materialid],function(error,result){
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
