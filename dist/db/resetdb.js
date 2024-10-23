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
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const pg_1 = __importDefault(require("pg"));
const db_js_1 = __importDefault(require("../lib/db.js"));
const { Client } = pg_1.default;
const db = new Client(db_js_1.default);
const runSchemafiles = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.cyan(`--> Loading Schema Files ...`));
    const schemaFilenames = fs_1.default.readdirSync("./db/schema");
    for (const fn of schemaFilenames) {
        const sql = fs_1.default.readFileSync(`./db/schema/${fn}`, "utf8");
        console.log(`\t-> Running ${chalk_1.default.green(fn)}`);
        yield db.query(sql);
    }
});
const runSeedFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.cyan(`-> Loading Seeds ...`));
    const schemaFilenames = fs_1.default.readdirSync("./db/seeds");
    for (const fn of schemaFilenames) {
        const sql = fs_1.default.readFileSync(`./db/seeds/${fn}`, "utf8");
        console.log(`\t-> Running ${chalk_1.default.green(fn)}`);
        yield db.query(sql);
    }
});
const runResetDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_js_1.default.host &&
            console.log(`-> Connecting to PG on ${db_js_1.default.host} as ${db_js_1.default.user}...`);
        db_js_1.default.connectionString &&
            console.log(`-> Connecting to PG with ${db_js_1.default.connectionString}...`);
        yield db.connect();
        yield runSchemafiles();
        yield runSeedFiles();
        db.end();
    }
    catch (err) {
        console.error(chalk_1.default.red(`Failed due to error: ${err}`));
        db.end();
    }
});
runResetDB();
