import { Prisma } from '@prisma/client'
import type { Response } from 'express'
import type { BaseResponse, ChatRoomType, ChatRoomWithChannel, Handler, Request } from '../types'
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

export const profile: Handler = function (req: Request, res: Response<BaseResponse<ChatRoomWithChannel | null>>, next) {
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
  }).then((data) => {
    res.json({
      success: true,
      message: 'success',
      data,
    })
  }).catch(err => next(err))
}

export const list: Handler = function (req: Request, res, next) {
  const { id } = req.auth!
  const { list, type } = req.query
  if (list === 'mine') {
    prisma.chatRoom.findMany({
      where: {
        memberId: {
          has: id,
        },
        type,
      },
      include: {
        group: {
          include: {
            channel: true,
          },
        },
      },
    }).then((data) => {
      res.json({
        success: true,
        message: 'success',
        data,
      })
    }).catch(err => next(err))
  }
}
