var mongoose = require('mongoose');

var Dishes = require('./models/dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url, {useMongoClient:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('Connected correctly to the server');

  Dishes.create({
    name: 'Uthapizza',
    description: 'Something',
    comments: {
      rating: 2,
      comment: 'Whatever..',
      author: 'Bipity Bopity Bop'
    }
  }, function(err, dish){
    if(err) throw err;
    console.log('Dish created!');
    console.log(dish);

    var id = dish._id;

    setTimeout(function(){
      Dishes.findByIdAndUpdate(id,
        {
          $set: {description: 'Something updated'}
        }, {new: true}).exec(function(err, dish){
        if(err) throw err;
        console.log('Updated dish!');
        console.log(dish);

        dish.comments.push({
          rating: 4,
          comment: 'Finger Lickin\'',
          author: 'Khakra Fafda Chakli'
        });

        dish.save(function(err, dish){
          if(err) throw err;
          console.log('Updated Comment!');
          console.log(dish);

          db.collection('dishes').drop(function(){
            db.close();
          });
        });
      });
    }, 3000);
  });
});