export interface FetchResponse<Resource = unknown> {
    count: number
    items: Resource[]
}
