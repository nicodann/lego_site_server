import fs from 'fs'
import pg from 'pg'
import dbparams from '../lib/db.js'
import

const { Client } = pg
const db = new Client(dbparams)

const runSchemaFiles = async () => {
  console.log('--> Loading Schema Files ...');
}