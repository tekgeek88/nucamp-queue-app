const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueItemSchema = new Schema({
  startTime: {
    type: Date,
    required: false
  },
  endTime: {
    type: Date,
    required: false
  },
  payload: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const QueueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: [QueueItemSchema],
}, {timestamps: true});

const Queue = mongoose.model('Queue', QueueSchema);
export default Queue;
