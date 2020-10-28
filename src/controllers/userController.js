import User from '../models/User'
import {hashPassword,comparePasswords,generateToken} from '../helpers/user'
import {validationResult as validation} from 'express-validator'

export const createUser = async (req,res) => {

	const errors = validation(req)

	if( !errors.isEmpty() ){
		return res.status(400).json({errors: errors.array()})
	}
	
	try{

		const {name,email,password} = req.body

		let user = await User.findOne({email})

		if(user)
			return res.status(400).json({msg: 'user is already register'})
    	
    	const newUser = new User({ name, email });

    	newUser.password = await hashPassword(password)
    	await newUser.save();

    	const payload = {
			user:{
				id: newUser.id
			}}

    	const userToken = generateToken(payload)
    	res.status(200).json(userToken)

    await newUser.save();

	}catch(e){
		console.log(e)
		res.status(500).json({msg: "houston, we have a problem"})
	}
}