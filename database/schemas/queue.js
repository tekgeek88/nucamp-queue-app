const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueItemSchema = new Schema({
  startTime: {
    type: Date,
    required: false,
    default: null
  },
  endTime: {
    type: Date,
    required: false,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const QueueSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: [QueueItemSchema]
}, {timestamps: true});

const Queue = mongoose.model('Queue', QueueSchema);
export default Queue;
