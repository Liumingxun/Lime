import { Router } from 'express'
import userRouter from './user'
import testRouter from './test'
import chatroomRouter from './chatRoom'

const router = Router()
router.use('/user', userRouter)
router.use('/chatroom', chatroomRouter)

router.use('/test', testRouter)

export default router
