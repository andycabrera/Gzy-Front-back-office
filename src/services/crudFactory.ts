import { AxiosResponse } from 'axios'
import { FetchResponse } from '~/interfaces/api'
import api from './apiClient'

class CrudFactory<Resource = unknown> {
    apiBase: string

    constructor(apiBase: string) {
        this.apiBase = apiBase
        this.fetch = this.fetch.bind(this)
        this.fetchOne = this.fetchOne.bind(this)
        this.save = this.save.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async fetch(
        key: string,
        page = 0,
        limit = 0,
        orderBy = '',
        orderDirection = '',
        filters = {}
    ): Promise<FetchResponse<Resource>> {
        const res = await api.get<FetchResponse<Resource>>(`${this.apiBase}`, {
            params: {
                page,
                limit,
                orderBy,
                orderDirection,
                ...filters,
            },
        })

        return res.data
    }

    async save(body: unknown): Promise<Resource> {
        const res = await api.post(`${this.apiBase}`, body)

        return res.data
    }

    async fetchOne(key: string, id: string): Promise<Resource> {
        const res = await api.get(`${this.apiBase}/${id}`)

        return res.data
    }

    async update({ _id, ...body }): Promise<Resource> {
        const res = await api.put(`${this.apiBase}/${_id}`, body)

        return res.data
    }

    async delete(id: string): Promise<AxiosResponse<void>> {
        return api.delete(`${this.apiBase}/${id}`)
    }
}

export default CrudFactory
