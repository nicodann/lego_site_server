"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const pg_1 = __importDefault(require("pg"));
const db_1 = __importDefault(require("./lib/db"));
const setsDb_1 = __importDefault(require("./db/setsDb"));
const setsRoutes_1 = __importDefault(require("./routes/setsRoutes"));
const getImageHrefs_1 = __importDefault(require("./lib/getImageHrefs"));
const app = (0, express_1.default)();
const { Pool } = pg_1.default;
const pool = new Pool(db_1.default);
pool.connect();
const dbSets = (0, setsDb_1.default)(pool);
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api/sets", (0, setsRoutes_1.default)(dbSets));
app.get("/", (_req, res) => {
    res.status(200).json("connected");
});
app.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: 'URL parameter is required.' });
    }
    if (typeof url === 'string') {
        try {
            const imageHrefs = yield (0, getImageHrefs_1.default)(url);
            res.json({ images: imageHrefs });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }
    else {
        console.error('The queried URL is not a string.');
    }
}));
// app.get("/api/v1/users", (req,res) => {
//   const users = [
//     {id:1, name: "John Doe" },
//     {id: 2, name: "Jane Doe" },
//   ];
//   return res.status(200).json({ users });
// });
app.listen(5001, () => {
    console.log("App listening on port 5001!");
});
