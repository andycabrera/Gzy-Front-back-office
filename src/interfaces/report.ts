export interface ReportData {
    title: string
    description?: string
}

export interface ReportFileData {
    content: string
    cta: string
    filename: string
}

export interface ReportFile {
    principal: boolean
    es: ReportFileData
    en: ReportFileData
}

export interface Report {
    _id?: string
    isActive?: boolean
    en: ReportData
    es: ReportData
    coverImage: string
    author?: string
    searchTags: string[]
    categories: string[]
    type: string
    availableSince?: Date
    availableUntil?: Date
    availableFor?: string[]
    files: ReportFile[]
}
