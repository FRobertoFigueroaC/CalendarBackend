const { Schema, model } = require('mongoose');
const User = require('./User');


const EventSchema = Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  bgColor: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

EventSchema.method('toJSON', function(){
  const { _id,__v, ...object} = this.toObject()
  object.id = _id;
  return object;
});

module.exports = model('Event', EventSchema);