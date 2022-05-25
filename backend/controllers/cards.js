const Card = require('../models/card');
const erorrNotFound = require('../Error/errorNotFound');
const errorInvalidData = require('../Error/errorInvalidData');


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
      console.log(err);
      if (err.name === 'ValidationError') {
        console.log(err);
        throw new errorInvalidData('invalid data passed to the server');
      }
      throw err;
    })
    .catch(next);
};

module.exports.deleteCard = (req, res) => {
  //(if req.params.cardId , req.user._id)
  //to do , req.params.cardId is card's id , req.user._id is users id 
  //find card in collection (modal) if found check if owner is equal req.user._id if yes delete 
  // if not throw you are a not the user.
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Card Not Found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid Card Id' });
      } else {
        res.status(500).send({ message: ' Server Error' });
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
        res.status(404).send({ message: 'Card Not Found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid Card Id' });
      } else {
        res.status(500).send({ message: 'Server Error' });
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
        res.status(404).send({ message: 'Card Not Found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid Card Id' });
      } else {
        res.status(500).send({ message: 'Server Error' });
      }
    });
};
