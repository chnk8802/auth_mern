import { CUSTOMER_TYPES } from "@/constants/customerTypes";
import { type FieldConfig } from "@/lib/form-generator/types/field-types";

export const customerFields: FieldConfig = [
  {
    section: "General Details",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "customerCode",
        label: "Customer Code",
        type: "text",
        required: false,
        readOnly: true, // auto-generated
        placeholder: "Auto-generated",
      },
      {
        id: "customerType",
        label: "Customer Type",
        type: "select",
        options: CUSTOMER_TYPES,
        defaultValue: "individual",
        required: true,
        placeholder: "Select customer type",
        section: "General",
      },
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter Full Name",
        section: "General",
      },
      {
        id: "phone",
        label: "Phone",
        type: "phone",
        required: true,
        placeholder: "9876543210",
        format: "international",
        section: "General",
      }
    ],
  }, {
    section: "Address",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "address",
        label: "Address",
        type: "address",
        components: {
          street: { id: "street", label: "Street", type: "text" },
          city: { id: "city", label: "City", type: "text" },
          state: {
            id: "state",
            label: "State",
            type: "select",
            options: [
              { label: "Tamil Nadu", value: "tn" },
              { label: "Kerala", value: "kl" },
            ],
          },
          country: {
            id: "country",
            label: "Country",
            type: "select",
            options: [
              { label: "India", value: "in" },
              { label: "USA", value: "us" },
            ],
          },
          zip: { id: "zip", label: "Zip", type: "text" },
        },
        section: "General",
      }
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
        showInForm: false
      },
      {
        id: "updatedAt",
        label: "Updated At",
        type: "datetime",
        showInForm: false
      },
    ],
  },
];
