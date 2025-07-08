import request from "supertest"
import { getUser } from "../controllers/userController.js"

it('can list users', () => {
    const res = await request(index).get
})