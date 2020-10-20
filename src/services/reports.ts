import { Report } from '~/interfaces/report'
import CrudFactory from './crudFactory'

const ReportsService = new CrudFactory<Report>('/reports')

export default ReportsService
