import { validationResult as validation } from 'express-validator'
import Project from '../models/Project'
import {isOwner} from '../helpers/project'

export const createProject = async (req, res) => {

	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try {
		const { name, user } = req.body

		const project = new Project({ name })
		project.owner = req.user.id
		await project.save()

		res.json(project)

	} catch (e) {
		console.log(e)
		res.status(500).json({ msg: 'houston, We have a problem' })
	}

}

export const obtainProjects = async (req, res) => {

	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try {
		const projects = await Project.find({ owner: req.user.id }).sort({ created: -1 })
		res.status(200).json(projects)
	} catch (e) {
		console.log(e)
		res.status(500).json({ msg: 'houston, We have a problem' })
	}
}

export const updateProject = async (req, res) => {
	const { name } = req.body

	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	const newProject = {}

	if (name) newProject.name = name

	try {
		let project = await Project.findById(req.params.id)

		if(project.owner.toString() !== req.user.id){
			return res.status(401).json({msg: "Don't have enough permissions"})
		}

		project = await Project.findOneAndUpdate({_id: req.params.id},{$set: {name: newProject.name}},{new:true })

		res.status(200).json(project)

	} catch (e) {
		console.log(e)
		res.status(500).json({ msg: 'houston, We have a problem' })
	}
}

export const deleteProject = async (req,res) =>{
	
	const errors = validation(req)

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() })

	try{

		let project = await Project.findById({ _id: req.params.id})

		if(!project)
			return res.status(400).json({ msg: "Project isn't exist" })

		
		if(project.owner.toString() !== req.user.id)
			return res.status(401).json({ msg: "Don't have enough permissions" })

		await Project.findOneAndDelete({ _id: req.params.id})
		
		res.status(200).json({msg: "project deleted"})
	}

	catch(e){
		console.log(e)
		res.status.json({msg: "houston, we have a problem"})
	}
}