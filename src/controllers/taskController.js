import { validationResult as validation } from 'express-validator'
import Task from '../models/Task'
import Project from '../models/Project'


export const createTask = async (req, res) => {
	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try {
		const project = await Project.findOne({ _id: req.body.project })

		if (!project)
			return res.status(404).json({ msg: "Project not found" })

		if (project.owner.toString() !== req.user.id)
			return res.status(401).json({ msg: "Don't have enough permissions" })


		const task = new Task(req.body)
		await task.save()
		res.status(200).json({ msg: "Task created successfully" })

	} catch (e) {
		console.log(e)
		res.status(500).json('houston,we have a problem')
	}
}

export const obtainTasks = async (req, res) => {
	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try {

		const projectOwner = await Project.findOne({ _id: req.params.id })

		if (!projectOwner)
			return res.status(404).json({ msg: "Project not found" })

		const tasks = await Task.find({ project: projectOwner._id }).sort({created: -1 })

		res.status(200).json(tasks)

	} catch (e) {
		console.log(e)
		res.status(500).json({ msg: "houston, we have a problem" })
	}
}

export const updateTask = async (req,res) => {

	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try {
		const { project, name, status } = req.body

		let ifTask = await Task.findOne({ _id: req.params.id })

		if (!ifTask) return res.status(404).json({ msg: "Task not exist" })

		const ifProject = await Project.findOne({ _id: project })

		if (!ifProject) return res.status(404).json({ msg: "Project not exist" })

		if (ifProject.owner.toString() !== req.user.id) return res.status(401).json({ msg: "Don't have enough permissions" })

		const newTask = {}

		name ? newTask.name = name : null

		if(status !== undefined && status !== ifTask.status) newTask.status = status  

		ifTask = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true })

		res.status(200).json(ifTask)

	} catch (e) {
		console.log(e)
		res.status(500).json({ msg: 'houston, We have a problem' })
	}
}

export const deleteTask = async (req,res) =>{
	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try{
		const {project} = req.query

		const ifTask = await Task.findOne({ _id: req.params.id })

		if (!ifTask) return res.status(404).json({ msg: "Task not exist" })

		const ifProject = await Project.findOne({ _id: project })

		if (!ifProject) return res.status(404).json({ msg: "Project not exist" })

		if (ifProject.owner.toString() !== req.user.id) 
			return res.status(401).json({ msg: "Don't have enough permissions" })

		await Task.findOneAndDelete({ _id: ifTask.id})

		res.json({msg: "Task deleted successfully"})


	}catch(e){
		console.log(e)
		res.status(500).json({ msg: 'houston, We have a problem' })
	}
}