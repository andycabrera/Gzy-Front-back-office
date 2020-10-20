import { Category } from './category'
import { Type } from './type'

export interface CategoryStats {
    category: Category
    reportsCount: number
    downloadsCount: number
}

export interface TypeStats {
    type: Type
    reportsCount: number
    downloadsCount: number
}
