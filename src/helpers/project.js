export const isOwner = (user,project)=>{
	const result = project.owner.toString() === user.id?true:false
	return result
}