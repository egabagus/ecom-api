import express from 'express';
import pool from './config/database.js';
const app = express();
const PORT = 3330;
app.get("/", async (_, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS now");
        res.json({ times: rows[0].now });
    }
    catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ error: "Database connection failed" });
    }
});
// Middleware
app.use(express.json());
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map