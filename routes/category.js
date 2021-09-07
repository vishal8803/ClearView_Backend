var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertCategory',upload.single('icon'),function(req,res)
{
    pool.query('insert into categories ( categoryname, icon) values (?,?)',[req.body.categoryname,req.body.myfileName],function(error,result){
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

router.get('/fetchAllCategory', function(req, res) {
    pool.query('select * from categories',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deleteCategory',function(req,res)
{
    pool.query('delete  from categories where categoryid=? ',[req.body.categoryid],function(error,result){
     
        if(error)
        
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updateCategory',function(req,res)
{
    pool.query('update  categories set categoryname=? where categoryid=? ',[req.body.categoryname,req.body.categoryid],function(error,result){
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

router.post('/updateIconCategory',upload.single('icon'),function(req,res)
{
    pool.query('update categories set icon=? where categoryid=? ',[req.body.myfileName , req.body.categoryid],function(error,result){
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
