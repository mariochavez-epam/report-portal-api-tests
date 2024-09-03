import { WidgetsResponseBody } from "../widgets/response"

export type DashboardDescriptionResponseBody = {
    description?: string
    id: string
    name: string
    owner: string
    widget: WidgetsResponseBody
}