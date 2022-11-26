import { Router } from 'express'
import * as userController from '../controller/user'
import * as userValidator from '../validator/user'

const router = Router()

router.get('/', userController.profile)
router.post('/register', userValidator.register, userController.register)
router.post('/sendmail', userValidator.sendmail, userController.sendmail)
router.post('/login', userValidator.login, userController.login)

export default router
