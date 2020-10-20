interface EventData {
    name: string
}

export interface Event {
    _id?: string
    en: EventData
    es: EventData
    availableSince?: Date
    availableUntil?: Date
    availableFor?: string[]
    isActive?: boolean
    report: string
}
