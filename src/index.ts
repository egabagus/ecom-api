import express from 'express';
import { RowDataPacket } from 'mysql2';
import pool from './config/database.js';
import { findUserByEmail, getUser } from './controllers/userController.js';
import { userRoute } from './routes/userRoute.js';
import { profileRoute } from './routes/profileRoute.js';

const app = express();
const PORT = 3330;

interface TimeRow extends RowDataPacket {
  now: Date;
}

app.get("/", async (_, res) => {
  try {
    const [rows] = await pool.query<TimeRow[]>("SELECT NOW() AS now");
    res.json({ times: rows[0].now });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/profile", profileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});