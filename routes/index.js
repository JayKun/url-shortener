var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

var urlSchema = mongoose.Schema({
      originalURL: String,
      shortURL: String
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/:url(*)', function(req, res){
  //res.send(req.params.url);
  var db=mongoose.connect("mongodb://admin:admin@ds119728.mlab.com:19728/prototype");
  //db.on('error', console.error.bind(console, 'connection error:'));
  var url = mongoose.model('url', urlSchema);
  // verify url exists
  //var random;
  //var original;
  request(req.params.url, function(error, response, body){
    if(error){
        var random = "Null";
        var original = "URL not valid";
        var data = {
          originalURL: original,
          shortURL: random
        };
        res.json(data);
     }
    else{
          var original = req.params.url;
          var random = Math.floor(Math.random()*10000);
          random = random.toString();
          var item = new url({
            originalURL: original, 
            shortURL: random
          });

         item.save();
         var data = {
           originalURL: original,
           shortURL: random
          };
         res.json(data);
        }
    });

});

router.get('/:num',function(req,res){
  var db = mongoose.connect("mongodb://admin:admin@ds119728.mlab.com:19728/prototype");
 
  var url = mongoose.model('url', urlSchema);
  var url_arg = req.params.num;
  var ori;
  url.findOne({'shortURL': url_arg},'originalURL', function(err, lol){
    if(err){
        console.log("Databse error");
    }
    ori = lol.originalURL;
    console.log(ori);
    res.redirect(301, ori);
  });
});
module.exports = router;
