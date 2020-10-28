import User from '../models/User'
import {comparePasswords,generateToken} from '../helpers/user'
import {validationResult as validation} from 'express-validator'


export const authenticateUser = async (req,res) =>{

	const {email, password} = req.body

	const errors = validation(req)

	if( !errors.isEmpty() ){
		return res.status(400).json({errors: errors.array()})
	}
	
	try{

		const user = await User.findOne({email})

		if(!user){
			return res.status(404).json({msg : "user not found"})
		}

		const isCorrectPassword = await comparePasswords(password,user.password)

		if(!isCorrectPassword){
			return res.status(401).json({msg : "incorrect password"})
		}

		const payload = {
			user:{
				id: user.id
			}
		}

		const token = generateToken(payload)

		res.status(200).json(token)
	}

	catch(e){
		console.log(e)
	}
}

export const sendUser = async (req,res) =>{
	const errors = validation(req)


	if( !errors.isEmpty() ){
		return res.status(400).json({errors: errors.array()})
	}

	try{
		const user = await User.findOne({ _id: req.user.id}).lean()
		await res.status(200).json(user)

	}catch(e){
		console.log(e)
		res.status(500).json({msg: "houston, we have a problem"})
	}

}