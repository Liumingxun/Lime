import express from 'express'
import { prisma } from '../src'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('success')
})

export default router