import type { Handler } from '../types'
import { prisma } from '../index'

export const create: Handler = function (req, res, next) {
  const { name } = req.body
  prisma.chatRoom.create({
    data: {
      name,
      creatorId: (req as any).auth.id,
    },
  }).then(() => {
    res.json({
      success: true,
      message: 'success',
    })
  }).catch(err => next(err))
}
