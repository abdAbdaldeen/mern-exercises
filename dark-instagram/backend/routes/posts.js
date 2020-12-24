var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


  const base = new mongoose.Schema({postText: String, postImgUrl: String, userID: String, date:Date, name:String, imgUrl:String, comments: [{name : String, text: String, imgUrl:String}]});
  const Model = mongoose.model("posts", base);

  router.get('/', function(req, res) {
    Model.find((e,r) => {
        if(e){
            console.log(e)
        }
        else{
            res.send(r);
        }
    })
});
router.post('/', function(req, res) {
    const newData = new Model (req.body)
    newData.save(function(err){
        if (err) {
        res.send("data not saved");
        return handleError(err);
    }
});
res.send("data saved");
});
router.post('/addcomment/:id', function(req, res) {
Model.findById(req.params.id, (e ,r)=>{
    if (e) console.log(e);
    if (r) {
        r.comments.push({
            name : req.body.name, text: req.body.text, imgUrl:req.body.imgUrl
       })
       r.save();
    }
    
    
}).then(()=>{res.json("done")})
.catch ((e)=>{
    res.json(e);
})
});

  
// ==============================================


module.exports = router;
