import { configDotenv } from "dotenv";
import mysql from "mysql2/promise";
configDotenv();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
});
export default pool;
//# sourceMappingURL=database.js.map