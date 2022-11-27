import { Router } from 'express'
import * as chatRoomController from '../controller/chatRoom'
import * as chatRoomValidator from '../validator/chatRoom'

const router = Router()

router.post('/', chatRoomValidator.create, chatRoomController.create)

export default router
