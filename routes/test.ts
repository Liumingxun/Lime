import { Router } from 'express'
import * as testValidator from '../validator/test'

const router = Router()

router.get('/:id', testValidator.test, (req, res) => {
  res.send(req.params.id)
})

export default router
