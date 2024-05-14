import express from "express";
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

  return router
}