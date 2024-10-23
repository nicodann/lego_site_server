"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function default_1(dbSets) {
    // GET SETS
    router.get('/', (_req, res) => {
        const limit = 10;
        dbSets.getSets(limit)
            .then(sets => res.send(sets))
            .catch((err) => res.status(500).json({ error: err.message }));
    });
    // GET SET  
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        let set;
        dbSets.getSet(id)
            .then(result => set = result)
            .then(() => res.json({ set }))
            .catch(err => res.status(500).json({ error: err }));
    });
    //EDIT SET
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        // const { number, name, url, category, image_url } = req.body
        const idNumber = Number(id);
        const updatedSet = Object.assign({ id: idNumber }, req.body);
        dbSets.editSet(updatedSet)
            .then((set) => res.json({ set }))
            .catch((err) => res.status(500).json({ error: err.message }));
    });
    return router;
}
