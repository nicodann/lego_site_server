type DbParams = {
  user: string;
  database: string;
  connectionString: string;
}

let dbParams: any = {}
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

export default dbParams;