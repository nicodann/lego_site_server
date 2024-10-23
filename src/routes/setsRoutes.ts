import express from "express";
import setsDb from "../db/setsDb";
import { Set, SetNoIdType } from "../types/Set";
import { Pool } from "pg";
const router = express.Router();

type DbSets = {
  getSets: (limit: number) => Promise<void | any[]>;
  getSet: (id: string) => Promise<any>;
  editSet: (Set: Set) => Promise<any>;
  // editSet: (
  //   id?: number,
  //   number?: number, 
  //   name?: string, 
  //   url?: string, 
  //   category?: string, 
  //   image_url?: string, 
  // ) => Promise<any>;
  postSet: (setNoId: SetNoIdType) => Promise<any>;
}

export default function(dbSets: DbSets) {
  // GET SETS
  router.get('/', (_req,res) => {
    const limit = 10;

    dbSets.getSets(limit)
      .then(sets => res.send( sets ))
      .catch((err: Error) => res.status(500).json({ error: err.message }))
  });

  // GET SET  
  router.get('/:id', (req,res) => {
    const { id } = req.params;
    let set: Set;
    dbSets.getSet(id)
      .then(result => set = result)
      .then(() => res.json({ set }))
      .catch(err => res.status(500).json({ error:err }))
  })

  //EDIT SET
  router.put('/:id', (req, res) => {
    const { id } = req.params
    // const { number, name, url, category, image_url } = req.body

    const idNumber = Number(id)

    const updatedSet: Set = {
      id: idNumber,
      ...req.body
    }

    dbSets.editSet(updatedSet)
      .then((set: Set) => res.json({ set }))
      .catch((err: Error) => res.status(500).json({ error: err.message }))
  })

  return router
}