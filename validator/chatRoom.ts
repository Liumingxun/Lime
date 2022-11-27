import { body } from 'express-validator'
import { validator } from '../middleware/validator'

export const create = validator([
  body('name').notEmpty().withMessage('聊天室名称不能为空'),
])
