const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const {
  CODE_OK,
  CODE_CREATED,
  TEXT_ERROR_NO_USER,
  TEXT_ERROR_VALIDATION,
  TEXT_ERROR_CONFLICT,
} = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');

const ValidationError = require('../errors/ValidationError');

const ConflictError = require('../errors/ConflictError');

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => {
      res
        .send(users);
    })
    .catch(next);
};
module.exports.getUser = (req, res, next) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(TEXT_ERROR_NO_USER);
      }
      res
        .status(CODE_OK)
        .send(user);
    })
    .catch(next);
};
module.exports.updateUser = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(TEXT_ERROR_NO_USER);
      }
      res
        .status(CODE_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(TEXT_ERROR_VALIDATION));
      } else {
        next(err);
      }
    });
};
module.exports.updateUserAvatar = (req, res, next) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(TEXT_ERROR_NO_USER);
      }
      res
        .status(CODE_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(TEXT_ERROR_VALIDATION));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      User
        .create(req.body)
        .then((user) => {
          if (!user) {
            throw new NotFoundError(TEXT_ERROR_NO_USER);
          }
          res
            .status(CODE_CREATED)
            .send({
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
              _id: user._id,
            });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(TEXT_ERROR_VALIDATION));
          } else if (err.name === 'MongoServerError') {
            next(new ConflictError(TEXT_ERROR_CONFLICT));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  User
    .findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : '637fca34917bfc0782ce3e49',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ message: 'Всё верно!' });
    })
    .catch(next);
};
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(TEXT_ERROR_NO_USER);
      }
      res
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(TEXT_ERROR_VALIDATION));
      } else {
        next(err);
      }
    });
};
