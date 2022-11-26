import { Router } from 'express'
import userRouter from './user'
import testRouter from './test'

const router = Router()
router.use('/user', userRouter)
router.use('/test', testRouter)

export default router
