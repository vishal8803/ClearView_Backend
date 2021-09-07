var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/insertProduct',upload.single('picture'), function(req, res, next) {
  pool.query('insert into product (productname, categoryid, type, frameid, materialid, shapeid, description, picture,status , adstatus) values (?,?,?,?,?,?,?,?,?,?)',[req.body.productname,req.body.categoryid,req.body.type,req.body.frametypeid,req.body.materialid,req.body.shapeid,req.body.description,req.body.myfileName,req.body.status,req.body.adstatus],function(error,result){
      console.log(error)
    if(error)
    {
        res.status(500).json(false);
    }else
    {
        res.status(200).json(true);
    }
  })
});


router.post('/fetchAllProductByGenderAndId', function(req, res) {
    pool.query('select p.*, (select categoryname from categories where categoryid = p.categoryid )as categoryname,(select frametypename from frametypes where frameid =p.frameid )as frametypename,(select materialname from material where matarialid=p.materialid)as materialname,(select shapename from shapes where shapeid = p.shapeid)as shapename from product  as p where p.type=? and p.categoryid=?',[req.body.gender,req.body.categoryid],function(error,result){
        console.log(req.body)
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});
router.get('/fetchAllProduct', function(req, res) {
    pool.query('select p.*, (select categoryname from categories where categoryid = p.categoryid )as categoryname,(select frametypename from frametypes where frameid =p.frameid )as frametypename,(select materialname from material where matarialid=p.materialid)as materialname,(select shapename from shapes where shapeid = p.shapeid)as shapename from product  as p',function(error,result){
        
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deleteProduct',function(req,res)
{
    pool.query('delete from product where productid=? ',[req.body.productid],function(error,result){
     
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updateproductPicture',upload.single('picture'),function(req,res)
{
    pool.query('update product set picture=? where productid=? ',[req.body.myfileName , req.body.productid],function(error,result){
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

router.post('/updateProduct',function(req,res)
{
    pool.query('update  product set productname=? , categoryid=? , type=?,frameid=?,materialid=?, shapeid=?,description=?,status=?,adstatus=? where productid=? ',[req.body.productname,req.body.categoryid , req.body.type,req.body.frametypeid,req.body.materialid,req.body.shapeid,req.body.description,req.body.status,req.body.adstatus,req.body.productid],function(error,result){
        console.log(req.body)
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
