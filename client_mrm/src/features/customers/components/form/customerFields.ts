import { type FormField } from "@/lib/form-generator/types/field-types";

export const customerFields: FormField[] = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter full name",
    sectionType: "basic",
    section: "General",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "example@domain.com",
    sectionType: "basic",
    section: "General",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "phone",
    required: true,
    placeholder: "Enter phone number",
    section: "Others",
  },
  {
    id: "customerType",
    label: "Customer Type",
    type: "select",
    options: [
      { label: "Individual", value: "individual" },
      { label: "Business", value: "business" },
    ],
    required: true,
    placeholder: "Select customer type",
    section: "Others",
  },
  {
    id: "activeJobs",
    label: "Active Repair Jobs",
    type: "number",
    placeholder: "e.g., 3",
  },
  {
    id: "priority",
    label: "Priority",
    type: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    placeholder: "Select priority",
    required: true,
    visible: true,
    section: "General",
    sectionType: "basic"
  },
];
