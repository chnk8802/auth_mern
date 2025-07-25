import { type ModuleField } from "@/lib/form-generator/types/field-types";
import { RepairJobStatus } from "@/constants/repairJobStatus";
import { RepairType } from "@/constants/repairType";
import { PAYMENT_STATUSES } from "@/constants/paymentStatus";
import { normalizeFields } from "@/lib/form-generator/utils/normalizeFields";
import { DEVICE_COMPONENTS } from "@/constants/deviceComponents";

export const repairJobFields: ModuleField[] = [
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
  {
    section: "Spare Parts",
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
        id: "designation",
        placeholder: "Designation",
        label: "Designation",
        type: "text",
      },
    ],
  },
  {
    section: "System Fields",
    id: "totalSparePartsCost",
    label: "Total Spare Part Cost",
    type: "number",
    placeholder: "0.00",
    readOnly: true,
  },
  {
    section: "System Fields",
    id: "totalReceivable",
    label: "Total Receivable",
    type: "number",
    placeholder: "0.00",
    readOnly: true,
  },
  {
    section: "System Fields",
    id: "profit",
    label: "Profit",
    type: "number",
    placeholder: "0.00",
    readOnly: true,
  },
  {
    section: "System Fields",
    id: "paymentStatus",
    label: "Payment Status",
    type: "select",
    options: PAYMENT_STATUSES,
    placeholder: "Select Payment Status",
  },
  {
    section: "System Fields",
    id: "amountReceived",
    label: "Amount Received",
    type: "number",
    placeholder: "0.00",
    min: 0,
  },
  {
    section: "System Fields",
    id: "amountDue",
    label: "Amount Due",
    type: "number",
    placeholder: "0.00",
    min: 0,
  },
  {
    section: "System Fields",
    id: "pickedAt",
    label: "Picked At",
    type: "datetime",
  },
  {
    section: "Audit Trail",
    id: "createdAt",
    label: "Created At",
    type: "datetime",
    showInTable: true,
    showInDetails: true,
    showInForm: false,
  },
  {
    section: "Audit Trail",
    id: "updatedAt",
    label: "Updated At",
    type: "datetime",
    showInTable: true,
    showInDetails: true,
    showInForm: false,
  },
];

export const fields = normalizeFields(repairJobFields);
