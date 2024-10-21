import 'dotenv/config'
import fs from 'fs'
import chalk from 'chalk'
import pg from 'pg'
import dbParams from '../lib/db.js'

const { Client } = pg
const db = new Client(dbParams)

const runSchemafiles = async () => {
  console.log(chalk.cyan(`--> Loading Schema Files ...`))
  const schemaFilenames = fs.readdirSync("./db/schema")

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, "utf8")
    console.log(`\t-> Running ${chalk.green(fn)}`)
    await db.query(sql)
  }
}

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`))
  const schemaFilenames = fs.readdirSync("./db/seeds")

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8")
    console.log(`\t-> Running ${chalk.green(fn)}`)
    await db.query(sql)
  }
}

const runResetDB = async () => {
  try {
    dbParams.host &&
      console.log(`-> Connecting to PG on ${dbParams.host} as ${dbParams.user}...`)
    dbParams.connectionString &&
      console.log(`-> Connecting to PG with ${dbParams.connectionString}...`)
    await db.connect()
    await runSchemafiles()
    await runSeedFiles()
    db.end()
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`))
    db.end()
  }
}

runResetDB()
