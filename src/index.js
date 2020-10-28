import "@babel/polyfill";

require('dotenv').config({path: "./variables.env"})

import server from "./server";
import database from './config/db.js'

async function main() {
  server()

  database(process.env.DB_MONGO)

}

main();