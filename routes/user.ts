import { Router } from 'express'
import * as userController from '../controller/user'

const router = Router()

router.get('/', userController.profile)
router.post('/register', userController.register)
router.get('/sendmail/:to', userController.sendmail)
router.post('/login', userController.login)

export default router
