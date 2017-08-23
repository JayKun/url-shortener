var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:admin@ds119728.mlab.com:19728/prototype"); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var kittenSchema  = mongoose.Schema({
        name: String
    });
    var Kitten =  mongoose.model('Kitten', kittenSchema);

    var silence = new Kitten({name: 'silence'});
    console.log(silence.name);
    silence.save();

    var fluffy = new Kitten({name: 'fluffy'});
    fluffy.save();
    
    Kitten.find(function(err, kittens){
        if(err)
            console.erro(err);
    });
});
