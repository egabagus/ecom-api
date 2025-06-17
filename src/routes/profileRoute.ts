import express from "express"
import { addProfile, getProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post('/add', addProfile)
router.get('/:user_id/get', getProfile)

export const profileRoute = router;