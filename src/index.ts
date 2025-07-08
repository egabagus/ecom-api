import express from 'express';
import { userRoute } from './routes/userRoute.js';
import { profileRoute } from './routes/profileRoute.js';
import { authRoute } from './routes/authRoute.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { roleRoute } from './routes/roleRoute.js';

const app = express();
const PORT = 3330;

app.use(express.json());
app.use("/api/user", authMiddleware, userRoute);
app.use("/api/profile", authMiddleware, profileRoute);
app.use("/api/role", authMiddleware, roleRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});