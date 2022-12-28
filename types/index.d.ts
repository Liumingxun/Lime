import {ChannelGroup, ChatRoom, Channel} from "@prisma/client";
import type { Handler as ExpressHandler, NextFunction, Response } from 'express'
import type { Request as JwtRequest } from 'express-jwt'
export type * from '@prisma/client'

export interface BaseResponse<T> {
  success: boolean
  message: string
  data?: T | Record<string, any>
  errors?: Record<string, any>
}

export interface Request<Q = Record<string, any>, P = Record<string, any>, B = Record<string, any>> extends JwtRequest {
  query: Q
  params: P
  body: B
}

export interface Handler extends ExpressHandler {
  (req: Request, res: Response<BaseResponse>, next: NextFunction): void
}

export type ChatRoomWithChannel = ChatRoom & { group: (ChannelGroup & { channel: Channel[] })[] }
