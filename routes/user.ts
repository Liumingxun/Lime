import { Router } from 'express'
import * as userController from '../controller/user'
import * as userValidator from '../validator/user'

const router = Router()

// 注册
router.post('/register', userValidator.register, userController.register)
// 发送验证码
router.post('/sendmail', userValidator.sendmail, userController.sendmail)
// 登录
router.post('/login', userValidator.login, userController.login)
// 获取用户信息
router.get('/', userController.profile)
// 加入聊天室
router.post('/chatRoom/:chatRoomId', userController.joinChatRoom)
// 退出聊天室
router.delete('/chatRoom/:chatRoomId', userController.quitChatRoom)

export default router
