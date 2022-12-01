import type { Prisma } from '@prisma/client'
import { Router } from 'express'
import { prisma } from '../index'

const router = Router()

const userInclude: Prisma.UserInclude = {
  createdChatRoom: true,
}

const userWhere: Prisma.UserWhereUniqueInput = {
  username: 'luoming',
}

router.get('/', (req, res) => {
  prisma.user.findMany(
    {
      where: userWhere,
      include: userInclude,
    }).then((users) => {
    res.json(users)
  })
})

export default router
