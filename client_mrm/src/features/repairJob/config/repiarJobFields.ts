import { type FieldConfig } from "@/lib/form-generator/types/field-types";
import { RepairJobStatus } from "@/constants/repairJobStatus";
import { RepairType } from "@/constants/repairType";
import { PAYMENT_STATUSES } from "@/constants/paymentStatus";
import { DEVICE_COMPONENTS } from "@/constants/deviceComponents";
import { SPARE_PART_SOURCE_TYPE } from "@/constants/sparePartSourceType";

export const repairJobFields: FieldConfig = [
  {
    section: "",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "repairStatus",
        label: "Repair Status",
        type: "select",
        defaultValue: "pending",
        options: RepairJobStatus,
        placeholder: "Select",
        required: true,
      },
      {
        id: "customer",
        label: "Customer",
        type: "lookup",
        module: "customer",
        displayField: "customerCode,fullName",
        placeholder: "Select Customer",
      },
      {
        id: "deviceModel",
        label: "Model",
        type: "text",
        placeholder: "Enter Model",
        required: true,
      },
      {
        id: "deviceIMEI",
        label: "IMEI",
        type: "text",
        placeholder: "Enter IMEI",
      },
      {
        id: "issueDescription",
        label: "Issue Description",
        type: "textarea",
        placeholder: "Enter Issue Description",
      },
      {
        id: "repairType",
        label: "Repair Type",
        type: "select",
        options: RepairType,
        placeholder: "Select",
      },
      {
        id: "technician",
        label: "Technician",
        type: "lookup",
        module: "users",
        displayField: "userCode,fullName",
        placeholder: "Select Technician",
      },
      {
        id: "deviceComponents",
        label: "Device Components",
        type: "multiselect",
        options: DEVICE_COMPONENTS,
        placeholder: "Select",
      },
      {
        id: "repairCost",
        label: "Repair Cost",
        type: "currency",
        placeholder: "0.00",
        min: 0,
      },
      {
        id: "discount",
        label: "Discount",
        type: "currency",
        placeholder: "0.00",
        min: 0,
      },
      {
        id: "notes",
        label: "Notes",
        type: "textarea",
        placeholder: "Notes",
      },
    ],
  },
  {
    section: "Spare Parts",
    sectionType: "basic",
    col: 1,
    fields: [
      {
        id: "sparePartEntries",
        label: "Spare Part Entries",
        type: "subform",
        module: "sparePart",
        displayFields: ["sparePartName", "unitCost", "supplier"],
        minRows: 1,
        maxRows: 10,
        fields: [
          {
            id: "sourceType",
            label: "Source Type",
            type: "select",
            options: SPARE_PART_SOURCE_TYPE
          },
          {
            id: "sparePart",
            label: "In-house Part",
            type: "lookup",
            module: "sparePart",
            displayField: "partCode,brand,model,partName,partType",
          },
          {
            id: "externalPartName",
            label: "External Part",
            type: "text",
          },
          {
            id: "unitCost",
            placeholder: "Unit Cost",
            label: "Unit Cost",
            type: "currency",
          },
          {
            id: "supplier",
            label: "Supplier",
            type: "lookup",
            module: "supplier",
            displayField: "supplierCode,fullName",
          },
        ],
      },
    ],
  },
  {
    section: "System Fields",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "totalSparePartsCost",
        label: "Total Spare Part Cost",
        type: "currency",
        placeholder: "0.00",
        readOnly: true,
      },
      {
        id: "totalReceivable",
        label: "Total Receivable",
        type: "currency",
        placeholder: "0.00",
        readOnly: true,
      },
      {
        id: "profit",
        label: "Profit",
        type: "currency",
        placeholder: "0.00",
        readOnly: true,
      },
      {
        id: "paymentStatus",
        label: "Payment Status",
        type: "select",
        options: PAYMENT_STATUSES,
        placeholder: "Select Payment Status",
      },
      {
        id: "amountReceived",
        label: "Amount Received",
        type: "currency",
        placeholder: "0.00",
        min: 0,
      },
      {
        id: "amountDue",
        label: "Amount Due",
        type: "currency",
        placeholder: "0.00",
        min: 0,
      },
      {
        id: "pickedAt",
        label: "Picked At",
        type: "datetime",
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
        showInTable: true,
        showInDetails: true,
        showInForm: false,
      },
      {
        id: "updatedAt",
        label: "Updated At",
        type: "datetime",
        showInTable: true,
        showInDetails: true,
        showInForm: false,
      },
    ],
  },
];
