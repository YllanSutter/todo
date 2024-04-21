import { Group } from "next/dist/shared/lib/router/utils/route-regex"

export type todoType = {
    id: string
    title?: string | null
    isCompleted: boolean
    createdAt?: Date
    indentation?: number
    order?: number
    hidden?: boolean
    hiddenchild?: boolean
    groupId?: string | null
}