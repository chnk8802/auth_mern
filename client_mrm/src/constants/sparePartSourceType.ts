export type SparePartSourceTypeOption = {
label: string,
value: string
}

export const SPARE_PART_SOURCE_TYPE: SparePartSourceTypeOption[] = [
    {label: "External", value: "external"},
    {label: "In-House", value: "in_house"},
]