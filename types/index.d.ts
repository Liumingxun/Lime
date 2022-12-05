import type { Handler as ExpressHandler, NextFunction, Response } from 'express'
import type { Request as JwtRequest } from 'express-jwt'

export interface BaseResponse {
  success: boolean
  message: string
  data?: Record<string, any>
  errors?: Record<string, any>
}

// @fixme
export interface Request<Q = Record<string, any>, P = Record<string, any>> extends JwtRequest {
  query: Q
  params: P
}

export interface Handler extends ExpressHandler {
  (req: Request, res: Response<BaseResponse>, next: NextFunction): void
}
