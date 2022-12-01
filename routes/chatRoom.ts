import { Router } from 'express'
import * as chatRoomController from '../controller/chatRoom'
import * as chatRoomValidator from '../validator/chatRoom'

const router = Router()

// 创建 / 解散聊天室
router.post('/create', chatRoomValidator.create, chatRoomController.create)
router.delete('/dismiss/:chatRoomId', chatRoomController.dismiss)

// 获得 / 修改聊天室信息
router.get('/profile/:chatRoomId', chatRoomController.getProfile)
// router.patch('profile/:chatRoomId', chatRoomController.patchProfile)

// 添加 / 删除频道
// router.post('/addChannel', chatRoomController.addChannel)
// router.delete('/removeChannel/:chatRoomId/:channelId', chatRoomController.removeChannel)

// 设置 / 取消管理员
// router.get('/setOperator/:channelId/:userId', chatRoomController.setOperator)
// router.delete('/unsetOperator/:channelId/:userId', chatRoomController.unsetOperator)

// 获取全部列表
router.get('/', chatRoomController.all)
// 获取我的聊天室列表
router.get('/have', chatRoomController.have)
// 加入 / 退出聊天室
router.get('/join/:chatRoomId', chatRoomController.join)
// router.get('/leave/:chatRoomId', chatRoomController.leave)

export default router
