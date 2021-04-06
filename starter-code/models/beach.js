const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const flags=['red','yellow','green'];

const beachSchema = new Schema({
  name: String,
  flag: {type: String, enum: flags}
});

module.exports = mongoose.model('Beach', beachSchema);
