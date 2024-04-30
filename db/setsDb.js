export default (pool) => {
  // GET SETS
  const getSets = (limit) => {
    const queryString = limit 
    ? `
      SELECT sets.*
      FROM sets
      ORDER BY sets.id DESC
      LIMIT $1
    `
    :  `
    SELECT sets.*
    FROM sets
    ORDER BY sets.id DESC
  `
    const queryParams = limit ? [limit] : []
    return pool
      .query(queryString, queryParams)
      .then(data => {
        console.log("DATA:",data.rows)
        return data.rows
      })
      .catch(error => console.error(error.message))
  }

  // GET SET BY ID
  const getSet = (id) => {
    const queryString = `
    SELECT sets.*
    FROM sets
    WHERE sets.id = $1
    `;
    const queryParams = [id];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message))
  }

  // POST SET
  const postSet = (number, name, url, category, image_url) => {
    const queryString = `
      INSERT INTO sets
      (number, name, url, category, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `
    const queryParams = [number, name, url, category, image_url];
    return pool
      .query(queryString, queryParams)
      .then(data => data.rows[0])
      .catch(error => console.error(error.message));
  }

  // EDIT/UPDATE SET
  const editSet = (number, name, url, category, image_url, id) => {
    let queryString = `UPDATE sets `
    let queryParams = []

    if (number) {
      queryParams.push(number)
      queryString += `SET number = $${quaeryParams.length}`
    }
    if (name) {}
  }

  return {
    getSets,
    getSet
  }

}


