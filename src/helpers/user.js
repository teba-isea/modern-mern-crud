import {genSalt,hash,compare} from 'bcryptjs'
import {sign,verify} from 'jsonwebtoken'

export const hashPassword = async (password) =>{
  	const salt = await genSalt(5);
  	return hash(password, salt);
}

export const comparePasswords = async (password,hash) => {
	return await compare(password, hash)
}

export const generateToken = user => {
	return sign(user, process.env.PRIVATE_KEY, { expiresIn: "1d" });
}

export const verifyToken =  token =>{
	try{
		return	verify(token,process.env.PRIVATE_KEY)
	}catch(e){
		return false
	}
}