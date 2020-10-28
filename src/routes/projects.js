import {Router} from 'express'
import {check,header} from 'express-validator'
import {createProject,obtainProjects,updateProject,deleteProject} from '../controllers/projectController'
import authenticate from '../middlewares/authenticate'


const route = Router()

route.post('/',
	[
		header('x-auth-token','you need sign in first').not().isEmpty(),
		check('name','Project name is required').not().isEmpty()
	],
	authenticate,
	createProject
)

route.get('/',
	[header('x-auth-token','you need sign in first').not().isEmpty()],
	authenticate,
	obtainProjects)

route.put('/:id',
	[
		header('x-auth-token','you need sign in first').not().isEmpty(),
		check('name','Project name is required').not().isEmpty()
	],
	authenticate,
	updateProject
)

route.delete('/:id',
	[
		header('x-auth-token','you need sign in first').not().isEmpty()
	],
	authenticate,
	deleteProject
)

export default route