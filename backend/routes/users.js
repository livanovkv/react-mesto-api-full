const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, getUserInfo,
  updateUser, updateUserAvatar,
} = require('../controllers/users');

router
  .get('/', getUsers)
  .get('/me', getUserInfo)
  .get('/:id', celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }), getUser)
  .patch('/me', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }), updateUser)
  .patch('/me/avatar', celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().max(500).regex(/^(https?:\/\/(www\.)?([a-zA-z0-9-]{1}[a-zA-z0-9-]*\.?)*\.{1}([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:?#[]@!\$&'\(\)\*\+,;=])*)/),
    }),
  }), updateUserAvatar);

module.exports = router;
