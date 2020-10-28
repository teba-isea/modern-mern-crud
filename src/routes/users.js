import {Router} from 'express'
import {createUser} from '../controllers/userController'
import {check} from 'express-validator'
const route = Router()

route.post('/',
	[
		check('name','name is required').not().isEmpty(),
		check('email','email is invalid').isEmail(),
		check('password','password length must be greater than 8 ').isLength({min: 8})
	]
	, createUser)

export default route