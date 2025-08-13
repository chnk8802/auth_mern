import { type FieldConfig } from "@/lib/form-generator/types/field-types";
import { RepairJobStatus } from "@/constants/repairJobStatus";
import { RepairType } from "@/constants/repairType";
import { PAYMENT_STATUSES } from "@/constants/paymentStatus";
import { DEVICE_COMPONENTS } from "@/constants/deviceComponents";

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
        module: "customers",
        displayField: "name",
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
        displayField: "fullName",
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
        type: "number",
        placeholder: "0.00",
        min: 0,
      },
      {
        id: "discount",
        label: "Discount",
        type: "number",
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
        id: "spareParts",
        label: "Spare Parts",
        type: "subform",
        minRows: 1,
        maxRows: 10,
        fields: [
          {
            id: "Spare Part",
            label: "sparePart",
            type: "lookup",
            module: "sparePart",
            displayField: "sparePart",
          },
          {
            id: "cost",
            placeholder: "Cost",
            label: "Cost",
            type: "text",
          },{
            id: "cost2",
            placeholder: "Cost2",
            label: "Cost2",
            type: "text",
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
        type: "number",
        placeholder: "0.00",
        readOnly: true,
      },
      {
        id: "totalReceivable",
        label: "Total Receivable",
        type: "number",
        placeholder: "0.00",
        readOnly: true,
      },
      {
        id: "profit",
        label: "Profit",
        type: "number",
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
        type: "number",
        placeholder: "0.00",
        min: 0,
      },
      {
        id: "amountDue",
        label: "Amount Due",
        type: "number",
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
