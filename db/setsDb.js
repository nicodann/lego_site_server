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

  return {
    getSets,
    getSet
  }

}


