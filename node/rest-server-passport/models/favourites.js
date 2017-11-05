var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	favourite: [{type: Schema.Types.ObjectId, ref: 'Dish'}],
});

module.exports = mongoose.model('Favourite', favouriteSchema);


