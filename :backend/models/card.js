const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9-.]{2,63}\.[a-z]{2,6}\/?([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/;
        return regex.test(v);
      },
      message: 'Wrong url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create the model and export it
module.exports = mongoose.model('card', cardSchema);