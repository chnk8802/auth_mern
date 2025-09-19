import { SPARE_PART_TYPES } from "@/constants/sparePart.constants";
import { type FieldConfig } from "@/lib/form-generator/types/field-types";

export const sparePartConfig: FieldConfig = [
  {
    section: "General Details",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "partCode",
        label: "Part Code",
        type: "text",
        required: false,
        readOnly: true,
        placeholder: "Auto-generated",
      },
      {
        id: "brand",
        label: "Brand",
        type: "text",
        required: true,
        placeholder: "e.g. Samsung",
      },
      {
        id: "model",
        label: "Model",
        type: "text",
        required: true,
        placeholder: "e.g. Galaxy S21",
      },
      {
        id: "partName",
        label: "Part Name",
        type: "text",
        required: true,
        placeholder: "e.g. Screen",
      },
      {
        id: "partType",
        label: "Part Type",
        type: "select",
        options: SPARE_PART_TYPES,
        required: true,
        placeholder: "Select part type",
      },
      {
        id: "costPrice",
        label: "Cost Price",
        type: "number",
        required: true,
        placeholder: "Enter cost price",
        min: 0,
      },
      {
        id: "stockQty",
        label: "Stock Quantity",
        type: "number",
        required: true,
        defaultValue: 0,
        placeholder: "Enter stock quantity",
        min: 0,
      },
    ],
  },
  {
    section: "Audit Trail",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "createdAt",
        label: "Created At",
        type: "datetime",
        showInForm: false,
        readOnly: true,
      },
      {
        id: "updatedAt",
        label: "Updated At",
        type: "datetime",
        showInForm: false,
        readOnly: true,
      },
    ],
  },
];
