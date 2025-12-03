import express from 'express'
import { groupController } from '../controllers/group.controller.js'

const router = express.Router()

router.get('/', groupController.getAll)
router.post('/', groupController.create)
router.patch('/:id', groupController.update)
router.delete('/:id', groupController.delete)

export default router