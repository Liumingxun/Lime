import { PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'
import { expressjwt } from 'express-jwt'
import router from './routes'
import { errorHandle } from './middleware/errorHandle'

const prisma = new PrismaClient()
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(expressjwt({
  algorithms: ['HS256'],
  secret: process.env.HS256_SECRET!,
}).unless({
  path: ['/api/user/login', '/api/user/register', {
    url: /^\/api\/user\/sendmail/,
  }],
  useOriginalUrl: true,
}))

app.use('/api', router)

app.use(errorHandle)

const port = Number(process.env.PORT) || 21380

app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`) // eslint-disable-line no-console
})

export { prisma }
