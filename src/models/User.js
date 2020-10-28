import mongoose,{Schema} from 'mongoose'

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	password: {
		type: String,
		required: true,
	},

	register: {
		type: Date,
		default: Date.now()
	}


})

export default mongoose.model('User', UserSchema)