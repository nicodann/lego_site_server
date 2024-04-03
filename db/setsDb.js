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
      .then(data => data.rows)
      .catch(error => console.error(error.message))
  }

  return {
    getSets
  }

}


