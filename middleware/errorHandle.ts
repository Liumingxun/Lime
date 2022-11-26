import type { ErrorRequestHandler } from 'express'

export const errorHandle: ErrorRequestHandler = (err, req, res, _next) => {
  if (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}
