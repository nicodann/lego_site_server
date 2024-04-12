import express from "express";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config'
import pg from 'pg'
import dbParams from "../lib/db.js";
import setsDb from "../db/setsDb.js";
import setsRoutes from "../routes/setsRoutes.js"

const app = express();
const { Pool } = pg
const pool = new Pool(dbParams)
pool.connect()
const dbSets = setsDb(pool)
const router = express.Router()

app.use(cors());
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/sets", setsRoutes(dbSets))

app.get("/", (req,res) => {
  return res.status(200).json("connected")
})

app.get("/api/v1/users", (req,res) => {
  const users = [
    {id:1, name: "John Doe" },
    {id: 2, name: "Jane Doe" },
  ];

  return res.status(200).json({ users });
});

app.listen(5001, () => {
  console.log("App listening on port 5001!");
})