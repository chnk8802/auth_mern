import {
  SPARE_PART_SOURCE_TYPE
} from "@/constants/sparePart.constants";
import {
  type FieldConfig
} from "@/lib/form-generator/types/field-types";

export const sparePartEntryFields: FieldConfig = [{
  section: "Spare Part Entry",
  sectionType: "basic",
  col: 2,
  fields: [{
    id: "sparePartEntryCode",
    label: "Entry Code",
    type: "text",
    placeholder: "Auto-generated",
    readOnly: true,
  },
  {
    id: "sourceType",
    label: "Source Type",
    type: "select",
    options: SPARE_PART_SOURCE_TYPE,
    required: true,
  },
  {
    id: "sparePart",
    label: "Spare Part",
    type: "lookup",
    module: "sparePart",
    displayField: "partCode,partName",
    required: false,
  },
  {
    id: "supplier",
    label: "Supplier",
    type: "lookup",
    module: "supplier",
    displayField: "supplierCode,fullName",
  },

  {
    id: "externalPartName",
    label: "External Part Name",
    type: "text",
    placeholder: "Enter external part name",
  },
  {
    id: "unitCost",
    label: "Unit Cost",
    type: "currency",
    currencyCode: "INR",
    placeholder: "Enter unit cost",
    required: true,
  },
  {
    id: "isPaid",
    label: "Paid?",
    type: "checkbox",
  },
  ],
},];