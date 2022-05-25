const User = require('../models/user');
const bcrypt = require('bcryptjs'); // importing bcrypt
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

let userId;
const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      userId = user._id;

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // the hashes didn't match, rejecting the promise

        return Promise.reject(new Error('Incorrect password or email'));
      }

      
    res.send({ token: jwt.sign({ _id: userId  }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) })
      // successful authentication


    })
  
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid User Id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const createUser = (req, res) => {
  const { email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: email,
        password: hash,
      })
    )
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User Validation Failed' });
      } else {
        res.status(500).send({ message: 'Server Error' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User Validation Failed' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const getUserInfo = (req, res) => {
  console.log(req.user);
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid User Id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {res.send({ data: user })
  console.log(user);
  }
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User Validation Failed' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUserInfo,
};
