const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau" ,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'explorer' ,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg' ,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9-.]{2,63}\.[a-z]{2,6}\/?([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/;
        return regex.test(v);
      },
      message: 'Wrong url',
    },
  },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    }

});

module.exports = mongoose.model('user', userSchema);