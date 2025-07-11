export type RepairJobStatusOption = {
label: string,
value: string
}

export const RepairJobStatus: RepairJobStatusOption[] = [
    {label: "Pending", value: "pending"},
    {label: "In-Progess", value: "in_progress"},
    {label: "Complete", value: "complete"},
    {label: "In-Complete", value: "in_Complete"},
    {label: "Picked", value: "picked"},
]