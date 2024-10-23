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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (pool) => {
    // GET SETS
    const getSets = (limit) => __awaiter(void 0, void 0, void 0, function* () {
        const queryString = limit
            ? `
      SELECT sets.*
      FROM sets
      ORDER BY sets.id DESC
      LIMIT $1
    `
            : `
    SELECT sets.*
    FROM sets
    ORDER BY sets.id DESC
  `;
        const queryParams = limit ? [limit] : [];
        return pool
            .query(queryString, queryParams)
            .then(data => {
            console.log("DATA:", data.rows);
            return data.rows;
        })
            .catch(error => console.error(error.message));
    });
    // GET SET BY ID
    const getSet = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const queryString = `
    SELECT sets.*
    FROM sets
    WHERE sets.id = $1
    `;
        const queryParams = [id];
        return pool
            .query(queryString, queryParams)
            .then(data => data.rows[0])
            .catch(error => console.error(error.message));
    });
    // POST SET
    // interface SetNoId extends Omit<Set, 'id'> {}
    const postSet = (setNoId) => __awaiter(void 0, void 0, void 0, function* () {
        const { number, name, url, category, image_url } = setNoId;
        const queryString = `
      INSERT INTO sets
      (number, name, url, category, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const queryParams = [number, name, url, category, image_url];
        return pool
            .query(queryString, queryParams)
            .then(data => data.rows[0])
            .catch(error => console.error(error.message));
    });
    // EDIT/UPDATE SET
    const editSet = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, number, name, url, category, image_url }) {
        let queryString = `UPDATE sets `;
        const queryParams = [];
        if (number) {
            queryParams.push(number);
            queryString += `SET number = $${queryParams.length}`;
        }
        if (name) {
            if (queryParams.length === 1) {
                queryString += `, `;
            }
            else {
                queryString += `SET`;
            }
            queryParams.push(name);
            queryString += `name = $${queryParams.length}`;
        }
        if (url) {
            if (queryParams.length === 1) {
                queryString += `, `;
            }
            else {
                queryString += `SET`;
            }
            queryParams.push(url);
            queryString += `url = $${queryParams.length}`;
        }
        if (category) {
            if (queryParams.length === 1) {
                queryString += `, `;
            }
            else {
                queryString += `SET`;
            }
            queryParams.push(category);
            queryString += `category = $${queryParams.length}`;
        }
        if (image_url) {
            if (queryParams.length === 1) {
                queryString += `, `;
            }
            else {
                queryString += `SET`;
            }
            queryParams.push(image_url);
            queryString += `image_url = $${queryParams.length}`;
        }
        queryString += `WHERE id = ${id};`;
        return pool
            .query(queryString, queryParams)
            .then(data => data.rows[0])
            .catch(error => console.error(error.message));
    });
    return {
        getSets,
        getSet,
        editSet,
        postSet
    };
};
