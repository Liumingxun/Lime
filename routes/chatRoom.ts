import { Router } from 'express'
import * as chatRoomController from '../controller/chatRoom'
import * as chatRoomValidator from '../validator/chatRoom'

const router = Router()

// 创建 / 解散聊天室
router.post('/', chatRoomValidator.create, chatRoomController.create)
router.delete('/:chatRoomId', chatRoomController.dismiss)

export default router
