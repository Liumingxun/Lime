import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import type { Request } from 'express-jwt'
import type { Handler } from '../types'
import { prisma } from '../index'
import mailerConfig from '../config/mailer'

export const sendmail: Handler = function (req, res, next) {
  const { to } = req.body
  const mailer = nodemailer.createTransport({
    host: mailerConfig.host,
    port: 465,
    secure: true,
    auth: {
      user: mailerConfig.user,
      pass: mailerConfig.pass,
    },
  })

  const verifyCode = Math.random().toPrecision(4).split('.')[1]

  mailer.sendMail({
    from: '"Luoming" <liumingxun@yeah.net>',
    to,
    subject: 'Hello',
    text: `${verifyCode}`,
  }).then((info) => {
    if (info.accepted.includes(to)) {
      prisma.verifyCode.create({
        data: {
          email: to,
          code: verifyCode,
        },
      })
        .then(() =>
          res.json({
            success: true,
            message: 'success',
          }))
        .catch(() => {
          res.json({
            success: false,
            message: '验证码已发送',
          })
        })
    }
    else {
      res.json({
        success: false,
        message: '发送失败',
      })
    }
  }).catch(err => next(err))
}

export const login: Handler = function (req, res, next) {
  const { username, password } = req.body
  prisma.user.findUnique({
    where: {
      username,
    },
  }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = `Bearer ${jwt.sign(
          {
          id: user.id,
        },
          process.env.HS256_SECRET!,
          {
          expiresIn: '1d',
        })}`

        res.json({
          success: true,
          message: 'success',
          data: {
            token,
          },
        })
      }
      else {
        res.json({
          success: false,
          message: '密码错误',
        })
      }
    }
    else {
      res.json({
        success: false,
        message: '用户不存在',
      })
    }
  }).catch(err => next(err))
}

export const register: Handler = function (req, res, next) {
  const { username, password, email, code } = req.body
  prisma.verifyCode.findUnique({
    where: {
      email,
    },
  }).then((verify) => {
    if (verify) {
      if (verify.code === code) {
        prisma.user.create({
          data: {
            username,
            password,
            email,
            nickname: username,
          },
        }).then(() => {
          res.json({
            success: true,
            message: 'success',
          })
        }).catch(err => next(err))
      }
      else {
        res.json({
          success: false,
          message: '验证码错误',
        })
      }
    }
    else {
      res.json({
        success: false,
        message: '没有验证码',
      })
    }
  }).catch(err => next(err))
}

export const profile: Handler = function (req: Request, res, next) {
  const { id } = req.auth!
  prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
      nickname: true,
      avatar: true,
      bio: true,
      createAt: true,
      gender: true,
    },
  }).then((user) => {
    res.json({
      success: true,
      message: 'success',
      data: user,
    })
  }).catch(err => next(err))
}
