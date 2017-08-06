var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
},
{
	timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);
module.exports = Leaders;
