import { COUNTRY, INDIAN_STATES } from "@/constants/address.constants";
import { type FieldConfig } from "@/lib/form-generator/types/field-types";

export const supplierConfig: FieldConfig = [
  {
    section: "General Details",
    sectionType: "basic",
    col: 2,
    fields: [
      {
        id: "supplierCode",
        label: "Supplier Code",
        type: "text",
        required: false,
        readOnly: true, // auto-generated
        placeholder: "Auto-generated",
      },
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter supplier full name",
      },
      {
        id: "phone",
        label: "Phone",
        type: "text",
        required: false,
        placeholder: "Enter 10-digit phone number",
      },
    ],
  },
  {
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
            options: INDIAN_STATES,
          },
          country: {
            id: "country",
            label: "Country",
            type: "select",
            options: COUNTRY,
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
