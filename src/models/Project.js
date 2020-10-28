import mongoose,{Schema} from 'mongoose'

const ProjectSchema = Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	owner:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'

	},

	created:{
		type: Date,
		default: Date.now()
	}
})

export default mongoose.model('Project',ProjectSchema)