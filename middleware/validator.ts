import type { ValidationChain } from 'express-validator'
import type { Handler } from '../types'

export const validator = (validations: ValidationChain[]) => {
  const v: Handler = async (req, res, next) => {
    Promise.all(validations.map(validation => validation.run(req)))
      .then((value) => {
        value.forEach((result) => {
          if (result.isEmpty())
            return next()
          res.status(422).json({
            success: false,
            message: '校验失败',
            errors: result.array(),
          })
        })
      })
      .catch((err) => {
        next(err)
      })
  }
  return v
}
