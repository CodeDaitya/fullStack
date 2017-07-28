var mongoose = require('mongoose');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url, {useMongoClient: true});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function(){
  console.log('Correctly connected to the server');

  Promotions.create({
    "name": "Weekend Grand Buffet",
    "image": "/media/ganitagya/WorkD/Reps/respUIFrameW/bootstrap/conFusion/img/buffet.png",
    "label": "New",
    "price": "19.99",
    "description": "Featuring . . ."
  }, function(err, promotion){
    if(err) throw err;
    console.log('Promotion created!');
    console.log(promotion);

    var id = promotion._id;
    setTimeout(function(){
      Promotions.findByIdAndUpdate(id,
      {description: 'Updated description'},
      {new: true}, function(err, promotion){
        if(err) throw err;
        console.log('Promotions updated!');
        console.log(promotion);

        db.collection('promotions').drop(function(){
          db.close();
        });
      });
    }, 3000);
  });
});
