import express from "express"
import { getUser, login, logout, signup, update } from "../controllers/user.js";
import {authentication} from "../middlewares/auth.js"

const router = express.Router()


router.post('/update-user',authentication,update)
router.get('/user',authentication,getUser)


router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

export default router;