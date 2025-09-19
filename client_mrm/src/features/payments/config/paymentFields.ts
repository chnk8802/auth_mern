import { PAYMENT_METHODS, PAYMENT_STATUSES, PAYMENT_TYPE } from "@/constants/payment.constants";
import { type FieldConfig } from "@/lib/form-generator/types/field-types";

export const paymentFields: FieldConfig = [
  {
    section: "",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "paymentCode",
        label: "Payment Code",
        type: "text",
        readOnly: true,
        placeholder: "Auto-generated",
      },
      {
        id: "paymentType",
        label: "Payment Type",
        type: "select",
        options: PAYMENT_TYPE,
        placeholder: "Select Payment Type",
        required: true,
      },
      {
        id: "sourceModule",
        label: "Source Module",
        type: "select",
        options: [
          { label: "Repair Job", value: "RepairJob" },
          { label: "Customer", value: "Customer" },
          { label: "Spare Part", value: "SparePartEntry" },
          { label: "Supplier", value: "Supplier" },
        ],
        placeholder: "Select Source",
        required: true,
      },
      // {
      //   id: "sourceId",
      //   label: "Source Record",
      //   type: "lookup",
      //   moduleResolver: (values) => {
      //     if (values.sourceModule === "RepairJob") return "repairJob";
      //     if (values.sourceModule === "Customer") return "customer";
      //     if (values.sourceModule === "SparePartEntry") return "sparePartEntry";
      //     if (values.sourceModule === "Supplier") return "supplier";
      //     return "";
      //   },
      //   module: 
      //   displayField: "displayName", // Adjust per module
      //   placeholder: "Select Source Record",
      //   required: true,
      // },
      {
        id: "amountDue",
        label: "Amount Due",
        type: "currency",
        readOnly: true,
        placeholder: "Auto-populated",
      },
      {
        id: "paymentAmount",
        label: "Payment Amount",
        type: "currency",
        placeholder: "0.00",
        required: true,
        min: 0,
      },
      {
        id: "balanceAfter",
        label: "Balance After",
        type: "currency",
        readOnly: true,
        placeholder: "Auto-calculated",
      },
      {
        id: "status",
        label: "Payment Status",
        type: "select",
        options: PAYMENT_STATUSES,
        readOnly: true,
      },
      {
        id: "paymentMethod",
        label: "Payment Method",
        type: "select",
        options: PAYMENT_METHODS,
        placeholder: "Select Method",
        required: true,
      },
      {
        id: "notes",
        label: "Notes",
        type: "textarea",
        placeholder: "Optional notes",
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



// import { PAYMENT_METHODS, PAYMENT_STATUSES, PAYMENT_TYPE } from "@/constants/payment.constants";
// import { type FieldConfig } from "@/lib/form-generator/types/field-types";

// export const paymentFields: FieldConfig = [
//   {
//     section: "",
//     sectionType: "basic",
//     col: 2,
//     fields: [
//       {
//         id: "paymentCode",
//         label: "Payment Code",
//         type: "text",
//         readOnly: true,
//         placeholder: "Auto-generated",
//       },
//       {
//         id: "paymentType",
//         label: "Payment Type",
//         type: "select",
//         options: PAYMENT_TYPE,
//         placeholder: "Select Type",
//         required: true,
//       },
//       {
//         id: "customer",
//         label: "Customer",
//         type: "lookup",
//         module: "customer",
//         displayField: "customerCode,fullName",
//         placeholder: "Select Customer",
//       },
//       {
//         id: "supplier",
//         label: "Supplier",
//         type: "lookup",
//         module: "supplier",
//         displayField: "supplierCode,fullName",
//         placeholder: "Select Supplier",
//       },
//       {
//         id: "paymentMethod",
//         label: "Payment Method",
//         type: "select",
//         options: PAYMENT_METHODS,
//         placeholder: "Select Method",
//         required: true,
//       },
//       {
//         id: "totalAmount",
//         label: "Total Amount",
//         type: "currency",
//         placeholder: "0.00",
//         readOnly: true, // auto-calculated from entries
//       },
//     ],
//   },
//   {
//     section: "Payment Entries",
//     sectionType: "basic",
//     col: 1,
//     fields: [
//       {
//         id: "paymentEntries",
//         label: "Payment Entries",
//         type: "subform",
//         layout: "grid",
//         module: "paymentEntry",
//         displayFields: ["amount", "status", "reference"],
//         minRows: 1,
//         fields: [
//           {
//             id: "amount",
//             label: "Amount",
//             type: "currency",
//             placeholder: "0.00",
//             required: true,
//           },
//           {
//             id: "status",
//             label: "Status",
//             type: "select",
//             options: PAYMENT_STATUSES,
//             defaultValue: "pending",
//           },
//           {
//             id: "reference",
//             label: "Reference / Notes",
//             type: "text",
//             placeholder: "Optional reference",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section: "System Fields",
//     sectionType: "basic",
//     col: 2,
//     fields: [
//       {
//         id: "createdAt",
//         label: "Created At",
//         type: "datetime",
//         showInDetails: true,
//         showInForm: false,
//       },
//       {
//         id: "updatedAt",
//         label: "Updated At",
//         type: "datetime",
//         showInDetails: true,
//         showInForm: false,
//       },
//     ],
//   },
// ];
