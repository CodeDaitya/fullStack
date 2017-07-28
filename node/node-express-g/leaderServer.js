var mongoose = require('mongoose');

var Leaders = require('./models/leadership');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url, {useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('Connected correctly to the server');

  Leaders.create({
    'name': 'Peter Pan',
    'image': '/media/ganitagya/WorkD/Reps/respUIFrameW/bootstrap/conFusion/img/alberto.png',
    'designation': 'Chief Epicurious Officer',
    'abbr': 'CEO',
    'description': 'Our CEO, Peter, . . .'
  }, function(err, leader){
    if(err) throw err;
    console.log('Leader created!');
    console.log(leader);

    var id = leader.id;

    setTimeout(function(){
      Leaders.findByIdAndUpdate(id,
      {description: 'Updated Description'},
      {new: true}).exec(function(err, leader){
        if(err) throw err;
        console.log('Leader updated!');
        console.log(leader);

        db.collection('leaders').drop(function(){
          db.close();
        });
      });
    }, 3000)
  });
});