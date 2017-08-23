var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/:url', function(req, res){
  //res.send(req.params.url);
  var db=mongoose.connect("mongodb://admin:admin@ds119728.mlab.com:19728/prototype");
  //db.on('error', console.error.bind(console, 'connection error:'));
  var urlSchema = mongoose.Schema({
      originalURL: String,
      shortURL: String
  });

  var url = mongoose.model('url', urlSchema);

  var original = req.params.url;
  var random = Math.floor(Math.random()*10000);
  var s = random.toString();
  
  var item = new url({
    originalURL: original, 
    shortURL: s
  });

  item.save();
  var data = {
    originalURL: item.originalURL,
    shortURL: s
  };
  res.json(data); 
});

router.get('/:url',function(req,res){
  var db = mongoose.connect("mongodb://admin:admin@ds119728.mlab.com:19728/prototype");
  var urlSchema = mongoose.Schema({
    originalURL: String,
    shortURL: String
  });

  var url = mongoose.model('url', urlSchema);
  var url_arg = req.params.url;
  var ori;
  var obj = url.findOne({'shortURL': url_arg},'originalURL', function(err, lol){
    if(err){
        console.log("Databse error");
    }
    ori = "https://www."+ lol.originalURL;
    console.log(ori);
    res.send(ori);
  });
  //res.send(ori);
  //return res.redirect('https://www.google.com');
});
module.exports = router;
