import { body } from 'express-validator'
import { validator } from '../middleware/validator'
import { prisma } from '../index'

export const sendmail = validator([
  body('to')
    .notEmpty().withMessage('Email 不能为空').bail()
    .isEmail().withMessage('无效的 Email 地址').bail()
    .custom((email) => {
      return prisma.user.findUnique({
        where: {
          email,
        },
      }).then((user) => {
        if (user)
          return Promise.reject(new Error('Email 已被使用'))
      })
    },
    ),
])
export const register = validator([
  body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .custom((username) => {
      return prisma.user.findUnique({
        where: {
          username,
        },
      }).then((user) => {
        if (user)
          return Promise.reject(new Error('用户名已被使用'))
      })
    }),
  body('password').notEmpty().withMessage('密码不能为空'),
  body('email')
    .notEmpty().withMessage('Email 不能为空').bail()
    .isEmail().withMessage('无效的 Email 地址'),
  body('code')
    .notEmpty().withMessage('验证码不能为空').bail()
    .custom((code) => {
      if (code.length !== 4)
        return Promise.reject(new Error('验证码错误'))
      return Promise.resolve()
    }),
])
export const login = validator([
  body('username')
    .notEmpty().withMessage('用户名不能为空').bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空'),
])
