import { Group } from "next/dist/shared/lib/router/utils/route-regex"

export type groupType = {
    id: string
    name?: string | null
    createdAt?: Date
    selected?: boolean
}