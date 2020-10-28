import mongoose,{Schema} from 'mongoose'

const TaskSchema = Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},

	status: {
		type: Boolean,
		default: false
	},

	project: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Project'
	},

	created: {
		type: Date,
		default: Date.now()
	}
})

export default mongoose.model('Task',TaskSchema)