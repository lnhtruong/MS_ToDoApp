import express from 'express'
import { todoController } from '../controllers/todo.controller.js'

const router = express.Router()

router.get('/', todoController.getAll)
router.get('/:id', todoController.getById)
router.post('/', todoController.create)
router.patch('/:id', todoController.update)
router.patch('/:id/status', todoController.toggleStatus)
router.delete('/:id', todoController.delete)
router.patch('/reorder', todoController.reorder);

export default router