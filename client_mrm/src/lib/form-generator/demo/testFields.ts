import { type FormField } from "@/lib/form-generator/types/field-types";

export const testFields: FormField[] = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    section: "Basic Info",
    required: true,
    placeholder: "John Doe",
    helpText: "Your full legal name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    section: "Basic Info",
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    section: "Other Details",
    sectionType: "basic",
    min: 1,
    max: 120,
  },
  {
    id: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    col: 1,
    section: "Other Details",
    sectionType: "basic",
  },
  {
    id: "bio",
    label: "Bio",
    type: "textarea",
    section: "Other Details",
    sectionType: "basic",
  },
  {
    id: "hobbies",
    label: "Hobbies",
    type: "multiselect",
    options: [
      { label: "Reading", value: "reading" },
      { label: "Gaming", value: "gaming" },
    ],
    section: "Preferences",
    sectionType: "animated",
  },
  {
    id: "country",
    label: "Country",
    type: "select",
    options: [
      { label: "India", value: "IN" },
      { label: "USA", value: "US" },
    ],
    section: "Preferences",
  },
  {
    id: "resume",
    label: "Upload Resume",
    type: "file",
    multiple: false,
    accept: [".pdf"],
    section: "Documents",
  },
  {
    id: "location",
    label: "Office Location",
    type: "map",
    section: "Geo",
  },
];
