import { CustomerTypes } from "@/constants/customerTypes";
import { type FormField } from "@/lib/form-generator/types/field-types";

export const customerFields: FormField[] = [
  {
    id: "customerType",
    label: "Customer Type",
    type: "select",
    options: CustomerTypes,
    defaultValue : "individual",
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
    placeholder: "example@domain.com",
    section: "General",
  },
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
      postalCode: { id: "postal_code", label: "Postal Code", type: "text" },
    },
    section: "General",
  },
];
