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