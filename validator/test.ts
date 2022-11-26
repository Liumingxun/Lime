import { param } from 'express-validator'
import { validator } from '../middleware/validator'

export const test = validator([
  param('id')
    .notEmpty().withMessage('id 不能为空').bail()
    .isInt().withMessage('id必须是整数').bail()
    .isLength({ min: 3, max: 10 }).withMessage('id长度必须在1-10之间').bail(),
])
