import express from "express"
import { addRole, getRole } from "../controllers/roleController.js";

const router = express.Router();

router.get('/data', getRole);
router.post('/add', addRole);

export const roleRoute = router;