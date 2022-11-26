import type { Handler as ExpressHandler, NextFunction, Request, Response } from 'express'

export interface BaseResponse {
  success: boolean
  message: string
  data?: Record<string, any>
  errors?: Record<string, any>
}


export interface Handler extends ExpressHandler {
  (req: Request, res: Response<BaseResponse>, next: NextFunction): void
}
