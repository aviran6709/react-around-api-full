const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const users = require('./routes/users');
const {createUser ,login} = require('./controllers/users');
const auth = require('./middlewares/auth');
const cards = require('./routes/cards')
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const errorHandlers = require('./middlewares/errorHandlers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,

});


app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin',celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(8),
  })

}), login);

app.post('/signup',celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(8),
  })

}), createUser);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.get('*', (req, res) => res.status(404).send({ message: 'Requested Resource Not Found mmmm' }));



app.use(errorLogger);
app.use(errors());
app.use(errorHandlers)

app.listen(PORT, () => {console.log("link to server")});


