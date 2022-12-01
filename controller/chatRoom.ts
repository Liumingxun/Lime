import type { ChatRoomType } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { Request } from 'express-jwt'
import type { Handler } from '../types'
import { prisma } from '../index'

const chatRoomCreate = (name: string, id: string, type?: ChatRoomType) => Prisma.validator<Prisma.ChatRoomCreateInput>()({
  name,
  creator: {
    connect: {
      id,
    },
  },
  type,
  memberId: {
    set: [id],
  },
})

export const create: Handler = function (req: Request, res, next) {
  const { name, type } = req.body
  prisma.chatRoom.create({
    data: chatRoomCreate(name, req.auth!.id, type),
  }).then(() => {
    res.json({
      success: true,
      message: 'success',
    })
  }).catch(err => next(err))
}

export const dismiss: Handler = (req: Request, res, next) => {
  const { chatRoomId } = req.params
  prisma.chatRoom.delete({
    where: {
      id: chatRoomId,
    },
  }).then(() => {
    res.json({
      success: true,
      message: 'success',
    })
  }).catch(err => next(err))
}

export const join: Handler = function (req: Request, res, next) {
  const { chatRoomId } = req.params
  prisma.chatRoom.update({
    where: {
      id: chatRoomId,
    },
    data: {
      memberId: {
        push: req.auth!.id,
      },
    },
  }).then(() => {
    res.json({
      success: true,
      message: 'success',
    })
  }).catch(err => next(err))
}

// @todo: 分页器
const list = function (where?: Prisma.ChatRoomWhereInput,
  orderBy?: Prisma.ChatRoomOrderByWithRelationInput) {
  return prisma.chatRoom.findMany({
    where,
    orderBy,
  })
}

export const all: Handler = function (req, res, next) {
  list().then((data) => {
    res.json({
      success: true,
      message: 'success',
      data,
    })
  }).catch(err => next(err))
}

export const have: Handler = function (req: Request, res, next) {
  list({
    memberId: {
      has: req.auth!.id,
    },
  }).then((data) => {
    res.json({
      success: true,
      message: 'success',
      data,
    })
  }).catch(err => next(err))
}

export const getProfile: Handler = function (req: Request, res, next) {
  const { chatRoomId } = req.params
  prisma.chatRoom.findUnique({
    where: {
      id: chatRoomId,
    },
    include: {
      group: {
        include: {
          channel: true,
        },
      },
    },
  }).then((_data) => {
    res.json({
      success: true,
      message: 'success',
      // data,
    })
  }).catch(err => next(err))
}
