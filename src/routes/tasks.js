import {Router} from 'express'
import {check,header,oneOf} from 'express-validator'
import {createTask,obtainTasks,updateTask,deleteTask} from '../controllers/taskController'
import authenticate from '../middlewares/authenticate'

const route = Router()

route.post('/',
	[
		header('x-auth-token','You need sign in first').not().isEmpty(),
		check('name','Task name is required').not().isEmpty(),
		check('project','Project owner is required').not().isEmpty()
	],
	authenticate,
	createTask)

route.get('/:id',
	[header('x-auth-token','You need sign in first').not().isEmpty()],
	authenticate,
	obtainTasks)

route.put('/:id',[
	header('x-auth-token','You need sign in first').not().isEmpty(),
	oneOf([
		check('name'),
		check('status')
	],'You need send al least one modification')],
	authenticate,
	updateTask)

route.delete('/:id',
	[header('x-auth-token','You need sign in first').not().isEmpty()],
	authenticate,
	deleteTask)

export default route