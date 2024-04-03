import express from "express";
const router = express.Router();

export default (dbSets) => {
  // GET SETS
  router.get('/', (req,res) => {
    const limit = 10;

    dbSets.getSets()
      .then(sets => res.send( sets ))
      .catch(err => res.status(500).json({ error: err.message }))
  })
}