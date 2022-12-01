import { Router } from 'express'
import userRouter from './user'
import testRouter from './test'
import chatRoomRouter from './chatRoom'

const router = Router()
router.use('/user', userRouter)
router.use('/chatRoom', chatRoomRouter)

router.use('/test', testRouter)

export default router
