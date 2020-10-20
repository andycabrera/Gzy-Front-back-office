import { Router } from 'express'

import AuthController from '../controller/auth'

const auth = Router()

auth.post('/login', AuthController.login)

export default auth
