import fs from 'fs'
import pg from 'pg'
import dbparams from '../lib/db.js'
import dbParams from '../lib/db.js'
import chalk from 'chalk'

const { Client } = pg
const db = new Client(dbparams)

const runSchemaFiles = async () => {
  console.log(chalk.cyan('--> Loading Schema Files ...'));
  const schemaFilenames = fs.readdirSync("db/schema");
  

  for (const filename of schemaFilenames) {
    const sql = fs.readFileSync(`db/schema/${filename}`, "utf8");
    console.log(`\t-> running ${chalk.green(filename)}`);
    await db.query(sql)
  }
}

const runSeedFiles = async () => {
  console.log(chalk.cyan('--> Loading Seed Files ...'));
  const seedFilenames = fs.readdirSync("db/seeds");

  for (const filename of seedFilenames) {
    const sql = fs.readFileSync(`db/seeds/${filename}`, "utf8");
    console.log(`\t-> running ${chalk.green(filename)}`);
    await db.query(sql)
  }
}

const runResetDB = async () => {
  try {
    dbParams.host &&
      console.log(`--> Connecting to PG on ${dbParams.host} as ${dbParams.user}...`);
    dbParams.connectionString && 
      console.log(`--> Connecting to PG with ${dbParams.connectionString}...`);
    await db.connect();
    await runSchemaFiles();
    await runSeedFiles();
    db.end();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    db.end();
  }
}

runResetDB();