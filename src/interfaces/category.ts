interface CategoryData {
    name: string
    description: string
}

export interface Category {
    _id?: string
    en: CategoryData
    es: CategoryData
}
