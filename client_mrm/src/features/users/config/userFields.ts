import { roles } from "@/constants/roles";
import type { FieldConfig } from "@/lib/form-generator/types/field-types";

export const userFields: FieldConfig = [
  {
    section: "General",
    sectionType: "animated",
    col: 2,
    fields: [{
      id: "userCode",
      label: "User Code",
      type: "text",
      required: true,
    },
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter Full Name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
    },
    {
      id: "role",
      label: "Role",
      type: "select",
      options: roles,
    }]
  },
  {
    section: "Address",
    sectionType: "animated",
    col: 2,
    fields: [{
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
    },]

  },
  {
    section: "Audit Trail",
    sectionType: "basic",
    col: 2,
    fields: [{
      id: "createdAt",
      label: "Created At",
      type: "datetime",
      showInTable: true,
      showInDetails: true,
    },
    {
      id: "updatedAt",
      label: "Updated At",
      type: "datetime",
      showInTable: true,
      showInDetails: true,
    },]
  }
];
