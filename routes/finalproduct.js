var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/checkDuplicateProducts',function(req,res){
    pool.query("select * from finalproduct where productid=? and colorid=? and size=?",[req.body.productid,req.body.colorid,req.body.size],function(error,result){
       
        if(error)
        {
            res.status(500).json([]) ;
        }else
        {
            console.log(result.length)
            if(result.length==0)
            {
                res.status(200).json(false) ;
            }else
            {
                res.status(200).json(true) ;
            }
        }
    })
})

router.post('/fetchProductPicture',function(req,res){
    
    pool.query('select * from productpictures where finalproductid=? ',[req.body.finalproductid],function(error , result){
        
        if(error)
        {
            res.status(500).json([]) ;
        }else
        {
            res.status(200).json({data:result})
        }
    })
})



router.post('/insertFinalProduct',upload.single('picture'),function(req,res)
{
    pool.query('insert into finalproduct (productid, colorid, size, price, offertype, offerprice, description, picture,stock) values (?,?,?,?,?,?,?,?,?)',[req.body.productid,req.body.colorid,req.body.size,req.body.price,req.body.offertype,req.body.offerprice,req.body.description,req.body.myfileName,req.body.stock],function(error,result){
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

router.get('/fetchAllFinalProducts', function(req, res) {
    pool.query('select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid )as colorname from finalproduct as fp',function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});
router.post('/fetchAllFinalProductsByProductId', function(req, res) {
    pool.query('select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid )as colorname from finalproduct as fp where fp.productid=?',[req.body.productid],function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});
router.post('/fecthAllFinalProductColor', function(req, res) {
    pool.query('select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid )as colorname from finalproduct as fp where productid=? and size=?',[req.body.productid , req.body.size],function(error,result){
       
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post("/insertMultipleImages",upload.any(),function(req,res){
    q='insert into productpictures (finalproductid,images) values ?' ;
    console.log(req.files)
    pool.query(q,[req.files.map((item)=>
        [req.body.finalproductid,item.filename]
    )],function(error,result){
        if(error)
        {
            res.status(500).json({result:false})
        }else
        {
            res.status(200).json({result:true})
        }
    })
})

router.post("/deleteProductPicture",function(req,res){
    pool.query('delete from productpictures where productPictureid=?',[req.body.productPictureid],function(error,result){
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true) ;
        }
    })
})

router.post("/updateProductPicture",upload.single('picture'),function(req,res){
    console.log(req.files) ;
    pool.query('update productpictures set images=? where productPictureid=?',[req.body.myfileName,req.body.productPictureid],function(error,result){
        if(error)
        {
            res.status(500).json(false) ;
        }else
        {
            res.status(200).json(true) ;
        }
    })
})

router.post('/fecthAllFinalProductSize', function(req, res) {
    pool.query('select size from finalproduct where productid=? group by size ',[req.body.productid],function(error,result){

       
        if(error)
        {
            res.status(500).json([]);
        }else
        {
            res.status(200).json({data:result});
        }
    })
});

router.post('/deleteFinalProduct',function(req,res)
{
    pool.query( 'delete from finalproduct where finalproductid=?' ,[req.body.finalproductid],function(error,result){
    //  console.log(req.body.finalproductid);
        if(error)
        {
            res.status(500).json(false);
        }else
        {
            res.status(200).json(true);
        }
    })
})

router.post('/updatefinalproductpicture',upload.single('picture'),function(req,res)
{
    pool.query('update finalproduct set picture=? where finalproductid=? ',[req.body.myfileName , req.body.finalproductid],function(error,result){
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

router.post('/updateFinalProduct',function(req,res)
{
    pool.query('update  finalproduct set productid=? , colorid=?,size=?,price=?,offertype=?,offerprice=?,description=?,stock=? where finalproductid=? ',[req.body.productid,req.body.colorid , req.body.size,req.body.price,req.body.offertype,req.body.offerprice,req.body.description,req.body.stock,req.body.finalproductid],function(error,result){
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
