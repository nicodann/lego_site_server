import express, { Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config'
import pg from 'pg'
import dbParams from './lib/db'
import setsDb from './db/setsDb'
import setsRoutes from './routes/setsRoutes'
import getImageHrefs from "./lib/getImageHrefs";

const app = express();
const { Pool } = pg
const pool = new Pool(dbParams)
pool.connect()
const dbSets = setsDb(pool)
// const router = express.Router()

app.use(cors());
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/sets", setsRoutes(dbSets))

app.get("/", (_req, res) => {
  res.status(200).json("connected")
})

app.get('/images', async (req,res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({ error: 'URL parameter is required.' })
  }

  if (typeof url === 'string') {
    try {
      const imageHrefs = await getImageHrefs(url);
      res.json({ images: imageHrefs});
  
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  } else {
    console.error('The queried URL is not a string.')
  }

})

// app.get("/api/v1/users", (req,res) => {
//   const users = [
//     {id:1, name: "John Doe" },
//     {id: 2, name: "Jane Doe" },
//   ];

//   return res.status(200).json({ users });
// });

app.listen(5001, () => {
  console.log("App listening on port 5001!");
})