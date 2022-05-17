const { celebrate, Joi } = require('celebrate');
const validateUrl = require("../utils/validator")
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  getUserInfo,
  updateUserAvatar,
  
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', getUserById);

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  })
}),updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl) 
  })
}),updateUserAvatar);




module.exports = router;




