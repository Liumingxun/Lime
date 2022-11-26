import { validationResult } from 'express-validator'
import type { ValidationChain } from 'express-validator'
import type { Handler } from '../types'

export const validator = (validations: ValidationChain[]) => {
  const v: Handler = async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty())
      return next()

    res.status(422).json({
      success: false,
      message: '校验失败',
      errors: errors.array(),
    })
  }
  return v
}
