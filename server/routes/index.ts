import { Router } from 'express'
import proxy from 'express-http-proxy'
import dotenv from 'dotenv'

import { RequestOptions } from 'https'
import { removeRequestPrefix } from '../utils/removeRequestPrefix'
import authRoutes from './auth'

dotenv.config()

const { REPORTS_API_BASE_URL } = process.env

const router = Router()

router.use('/auth', authRoutes)

// Proxies

const reportsProxy = proxy(REPORTS_API_BASE_URL, {
    proxyReqPathResolver: removeRequestPrefix,
    limit: '50mb',
    proxyReqOptDecorator: (proxyReqOpt): RequestOptions => {
        return {
            ...proxyReqOpt,
            rejectUnauthorized: false,
        }
    },
})

router.use('/reports', reportsProxy)
router.use('/categories', reportsProxy)
router.use('/types', reportsProxy)
router.use('/stats', reportsProxy)

export default router
