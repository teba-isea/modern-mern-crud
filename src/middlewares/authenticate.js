import {verifyToken} from '../helpers/user.js'
import { validationResult as validation } from 'express-validator'


const authenticate = async (req,res,next)=>{
	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })
	
	try{
		const token = req.header('x-auth-token')
		
		const encryptUser = verifyToken(token)
		
		if(!encryptUser){
			return res.status(401).json({msg: "invalid token, please sign in"})
		}

		req.user = encryptUser.user

		next()
	}

	catch(e){
		console.log(e)
		res.status(500).json({ msg: 'houston, We have a problem' })
	}
}

export default authenticate