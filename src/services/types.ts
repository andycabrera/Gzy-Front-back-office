import { Type } from '~/interfaces/type'
import CrudFactory from './crudFactory'

const TypesService = new CrudFactory<Type>('/types')

export default TypesService
