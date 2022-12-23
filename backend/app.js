require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const { celebrate, Joi } = require('celebrate');

const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

const {
  CODE_INTERNAL_SERVER_ERROR,
  TEXT_ERROR_INTERNAL_SERVER,
  TEXT_ERROR_NOT_FOUND,
} = require('./utils/constants');

const NotFoundError = require('./errors/NotFoundError');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().max(100).email(),
    password: Joi.string().min(8).max(100).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().max(500).uri().regex(/^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/),
    email: Joi.string().required().max(100).email(),
    password: Joi.string().min(8).max(100).required(),
  }),
}), createUser);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res, next) => {
  next(new NotFoundError(TEXT_ERROR_NOT_FOUND));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = CODE_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === CODE_INTERNAL_SERVER_ERROR
        ? TEXT_ERROR_INTERNAL_SERVER
        : message,
    });
  next();
});

app.listen(PORT);
