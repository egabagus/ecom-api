import express from "express"
import { addUser, destroyUser, findUserByEmail, getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/data', getUser);
router.get('/find-by-email/:email', findUserByEmail);
router.post('/add', addUser)
router.put('/update', updateUser)
router.put('/delete/:email', destroyUser);

export const userRoute = router;