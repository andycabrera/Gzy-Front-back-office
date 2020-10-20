/* eslint-disable */
import api from './apiClient'
import { CategoryStats, TypeStats } from '~/interfaces/stats'

export default class StatsService {
    static async getCategoriesStats(): Promise<CategoryStats[]> {
        const { data } = await api.get<CategoryStats[]>('/stats/categories')

        return data
    }

    static async getTypesStats(): Promise<TypeStats[]> {
        const { data } = await api.get<TypeStats[]>('/stats/types')

        return data
    }
}
