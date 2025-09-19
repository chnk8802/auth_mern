export type RepairJobStatusOption = {
label: string,
value: string
}

export const REPAIR_JOB_STATUS: RepairJobStatusOption[] = [
    {label: "Pending", value: "pending"},
    {label: "In-Progess", value: "in_progress"},
    {label: "Complete", value: "complete"},
    {label: "Incomplete", value: "incomplete"},
    {label: "Picked", value: "picked"},
]

export type RepairTypesOption = {
label: string,
value: string
}

export const REPAIR_TYPE: RepairTypesOption[] = [
    {label: "Hardware", value: "hardware"},
    {label: "Software", value: "software"},
    {label: "Both", value: "both"}
]

export type DeviceComponentsOption = {
label: string,
value: string
}

export const DEVICE_COMPONENTS: DeviceComponentsOption[] = [
    {label: "Sim Tray", value: "sim_tray"},
    {label: "Battery", value: "battery"},
    {label: "Screen", value: "screen"},
    {label: "Front Camera", value: "front_camera"},
    {label: "Back Camera", value: "back_camera"},
]