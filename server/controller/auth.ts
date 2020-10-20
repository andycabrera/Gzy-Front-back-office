import { Request, Response } from 'express'

class AuthController {
    static login(req: Request, res: Response): void {
        res.json({ ok: true })
    }
}

export default AuthController
