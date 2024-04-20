export type todoType = {
    id: string
    title?: string | null
    isCompleted: boolean
    createdAt?: Date
    indentation?: number
    order?: number
    hidden?: boolean
}