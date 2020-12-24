var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth')
  const base = new mongoose.Schema({task: String, isdone: Boolean});
  const Model = mongoose.model("tasks", base);


  router.get('/tasks', function(req, res, next) {
    Model.find((e,r) => {
        if(e){
            console.log(e)
        }
        else{
            res.send(r);
        }
    })
});
router.post('/tasks',auth, function(req, res, next) {
    const newData = new Model (req.body)
    newData.save(function(err){
        if (err) {
        res.send("data not saved");
        return handleError(err);
    }
});
res.send("data saved");
});
// ------------------------------
// ------------------------------
// ------------------------------
router.get('/tasks/:id', function(req, res, next) {
    const UserModel = mongoose.model(req.params.id, base);
    UserModel.find((e,r) => {
        if(e){
            console.log(e)
        }
        else{
            res.send(r);
        }
    })
});

router.post('/tasks/:id', function(req, res) {
    const UserModel = mongoose.model(req.params.id, base);
    const newData = new UserModel (req.body)
    newData.save(function(err){
        if (err) {
        res.send("data not saved");
        return handleError(err);
    }
});
res.send("data saved");
});

router.put('/tasks/done/:userid/:taskid', function(req, res) {
    const UserModel = mongoose.model(req.params.userid, base);
    UserModel.findById(req.params.taskid,function (e,r) {
    if(e){
        res.send(e)
    }
    else{
        r.isdone = true;
        r.save();
    }
})
.then(()=>{
    res.send("data saved");
})
.catch((e)=>{
    res.send(e); 
})
// res.send("data saved");
});


router.put('/tasks/update/:userid/:taskid', function(req, res) {
    const UserModel = mongoose.model(req.params.userid, base);
    UserModel.updateOne({_id: req.params.taskid},{task: req.body.task },function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            res.send("data updated");
        } 
    })
// res.send("data saved");
});

router.delete('/tasks/:userid/:taskid', function(req, res, next) {
    const UserModel = mongoose.model(req.params.userid, base);

    UserModel.deleteOne({ _id: req.params.taskid })
    .then(()=>{
        res.send("data delete");
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
});
// ------------------------------
// ------------------------------
// ------------------------------
router.put('/tasks/done/:id',auth, function(req, res) {
    Model.findById(req.params.id,function (e,r) {
    if(e){
        res.send(e)
    }
    else{
        r.isdone = true;
        r.save();
    }
})
.then(()=>{
    res.send("data saved");
})
.catch((e)=>{
    res.send(e); 
})
// res.send("data saved");
});

router.put('/tasks/update/:id',auth, function(req, res) {
    Model.updateOne({_id: req.params.id},{task: req.body.task },function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            res.send("data updated");
        } 
    })
// res.send("data saved");
});



router.delete('/tasks/:id',auth, function(req, res, next) {
    Model.deleteOne({ _id: req.params.id })
    .then(()=>{
        res.send("data delete");
    })
    .catch(function(error){ 
        console.log(error); // Failure 
    }); 
});


module.exports = router;
