import { Category } from '~/interfaces/category'
import CrudFactory from './crudFactory'

const CategoriesService = new CrudFactory<Category>('/categories')

export default CategoriesService
