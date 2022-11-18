import { PrismaClient } from '@prisma/client'
import express from 'express'

import { userRouter } from '../routes'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use('/user', userRouter)

app.use('/', (req, res) => {
    res.send({
        code: 0,
        msg: 'success',
        data: {}
    })
})

const port = Number(process.env.PORT) || 21380

app.listen(port, '0.0.0.0', () => {
    console.log(`server is running at: http://localhost:${port}`)
})

export { prisma }