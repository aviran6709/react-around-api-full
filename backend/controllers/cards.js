const Card = require('../models/card');
const errorNotFound = require('../Error/errorNotFound');
const errorInvalidData = require('../Error/errorInvalidData');
const errorHandler = require("../middlewares/errorHandlers")

module.exports.getCards = (req, res) => {
  Card.find({}).populate('likes')
    .then((cards) => res.send(cards))
    .catch((err) => res.status(err.statusCode).send({ message: err.message }));
};
module.exports.createCard = (req, res, next) => {
  
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
   
      if (err.name === 'ValidationError') {
        console.log(err);
        throw new errorInvalidData('invalid data passed to the server');
      }
      throw err;
    })
    .catch(next);
};

module.exports.deleteCard = (req, res) => {

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new errorNotFound( 'Card Not Found' );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InvalidDataError(  'Invalid Card Id' );
      
      } else {
        throw new errorHandler( ' Server Error');
       
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new errorNotFound( 'Card Not Found' );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        
        throw new InvalidDataError(  'Invalid Card Id' );
      } else {
        throw new errorHandler( ' Server Error');
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new errorNotFound( 'Card Not Found' );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InvalidDataError(  'Invalid Card Id' );
      } else {
        throw new errorHandler( ' Server Error')
      }
    });
};
