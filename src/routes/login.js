import {Router} from 'express'
import {check,header} from 'express-validator'
import {authenticateUser,sendUser} from '../controllers/loginController'
import authenticate from '../middlewares/authenticate'

const route = Router()

route.post('/',
	[
		check('email','email is invalid').isEmail(),
		check('password','password length must be greater than 8 ').not().isEmpty()
	]
, authenticateUser)

route.get('/',
	[header('x-auth-token','You need sign in first').not().isEmpty()],
	authenticate,
	sendUser)

export default route