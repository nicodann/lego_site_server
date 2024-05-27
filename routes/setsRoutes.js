import express from "express";
import setsDb from "../db/setsDb";
const router = express.Router();

export default (dbSets) => {
  // GET SETS
  router.get('/', (req,res) => {
    const limit = 10;

    dbSets.getSets()
      .then(sets => res.send( sets ))
      .catch(err => res.status(500).json({ error: err.message }))
  });

  // GET SET  
  router.get('/:id', (req,res) => {
    const { id } = req.params;
    let set;
    dbSets.getSet(id)
      .then(result => set = result)
      .then(() => res.json({ set }))
      .catch(err => res.status(500).json({ error:err }))
  })

  //EDIT SET
  router.put('/:id', (req, res) => {
    const { id } = req.params
    const { number, name, url, category, image_url } = req.body

    setsDb.editSet(number, name, url, category, image_url, id)
      .then(set => res.json({ set }))
      .catch(err => res.status(500).json({ error: err.message }))
  })

  return router
}