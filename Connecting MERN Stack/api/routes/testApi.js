var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/apitest', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

  const base = new mongoose.Schema({name: String, age: Number});

  const Model = mongoose.model("people", base);
// const newData = new Model ({name: "hala", age: 23})
// newData.save(function(err){
//     if (err) {
//         return handleError(err);
//     }
// });

router.get('/', function(req, res, next) {
    Model.find((e,r) => {
        if(e){
            console.log(e)
        }
        else{
            res.send(r);
        }
    })
  
});

router.post('/', function(req, res, next) {
    const newData = new Model (req.body)
newData.save(function(err){
    if (err) {
        res.send("data not saved");
        return handleError(err);
    }
});
res.send("data saved");
});


router.delete('/:id', function(req, res, next) {
    Model.deleteOne({ _id: req.params.id }).then(function(){ 
        console.log("Data deleted"); // Success 
    })
    .then(()=>{
        res.send("data delete");
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
  
});
router.put('/:id', function(req, res, next) {
    Model.updateOne({_id: req.params.id},{name: req.body.name , age : req.body.age},function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            res.send("data updated");
        } 
    })
  
});


module.exports = router;
