import express from "express"
import bodyParser from 'body-parser'
import usersRoutes from "./routes/users"
import projectsRoutes from "./routes/projects"
import tasksRoutes from "./routes/tasks"
import loginRoutes from "./routes/login"

import cors from 'cors'

//Settings

const app = express()

app.use(cors())
app.set('port', process.env.PORT || 4000)
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", usersRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/projects", projectsRoutes)
app.use("/api/tasks", tasksRoutes)

const server = async () => {

	try {
		await app.listen(app.get("port"));
		console.log(`server running on port ${app.get("port")}`)

	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

export default server