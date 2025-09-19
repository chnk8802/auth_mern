export type SparePartTypesOption = {
label: string,
value: string
}

export const SPARE_PART_TYPES: SparePartTypesOption[] = [
    {label: "Display", value: "display"},
    {label: "Battery", value: "battery"},
    {label: "Processor", value: "processor"},
    {label: "Camera", value: "camera"},
    {label: "Storage", value: "storage"},
    {label: "IC", value: "ic"},
    {label: "Other", value: "other"},
]

export type SparePartSourceTypeOption = {
label: string,
value: string
}

export const SPARE_PART_SOURCE_TYPE: SparePartSourceTypeOption[] = [
    {label: "External", value: "external"},
    {label: "In-House", value: "in_house"},
]