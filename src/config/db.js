import mongoose from 'mongoose'


const connectDB = async url =>{
	console.log(`Connecting to ${url}`)
	try{
		await mongoose.connect(url,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		console.log('Database is connected')
	}
	catch(e){
		console.log(e)
		process.exit(1)
	}

}

export default connectDB