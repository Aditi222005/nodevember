import express from 'express'
import { signup } from '../controller/user.controller.js'
import {login} from '../controller/user.controller.js'
const authRoutes = express.Router()

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)

export default authRoutes