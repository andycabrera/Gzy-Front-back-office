import { Request } from 'express'

export function removeRequestPrefix(req: Request, prefix = '/api'): string {
    return req.originalUrl.replace(prefix, '')
}
