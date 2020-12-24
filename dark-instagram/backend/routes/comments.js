var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


  const base = new mongoose.Schema({comText: String, postID: String, date:Date, name:String, imgUrl:String});
  const Model = mongoose.model("comments", base);

  router.get('/:id', function(req, res) {
    Model.find({postID:req.params.id},(e,r) => {
        if(e){
            console.log(e)
        }
        else{
            res.json(r);
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

  
// ==============================================


module.exports = router;
