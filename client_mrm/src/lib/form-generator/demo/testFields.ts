import { type FormField } from "@/lib/form-generator/types/field-types";

export const testFields: FormField[] = [
  {
    id: "first_name",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
  },
  {
    id: "bio",
    label: "Bio",
    type: "textarea",
    rows: 3,
    placeholder: "Short bio",
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    min: 0,
    max: 120,
    step: 1,
    suffix: "years",
  },
  {
    id: "dob",
    label: "Date of Birth",
    type: "date",
  },
  {
    id: "appointment_time",
    label: "Appointment Time",
    type: "time",
  },
  {
    id: "event_timestamp",
    label: "Event Timestamp",
    type: "datetime",
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    id: "hobbies",
    label: "Hobbies",
    type: "multiselect",
    options: [
      { label: "Reading", value: "reading" },
      { label: "Traveling", value: "traveling" },
      { label: "Gaming", value: "gaming" },
    ],
  },
  {
    id: "assigned_to",
    label: "Assigned To",
    type: "lookup",
    module: "users",
    displayField: "fullName",
  },
  {
    id: "preferred_contact",
    label: "Preferred Contact Method",
    type: "radio",
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "WhatsApp", value: "whatsapp" },
    ],
  },
  {
    id: "subscribe_newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
  },
  {
    id: "interests",
    label: "Topics of Interest",
    type: "checkbox",
    options: [
      { label: "Tech", value: "tech" },
      { label: "Health", value: "health" },
      { label: "Finance", value: "finance" },
    ],
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "example@example.com",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "phone",
    placeholder: "Enter phone number",
    countryCode: {
      enabled: true,
      default: "IN",
      allowed: ["IN", "US"],
    },
    format: "international",
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
  },
  {
    id: "resume",
    label: "Resume Upload",
    type: "file",
    accept: [".pdf", ".docx"],
    maxSizeMB: 5,
  },
  {
    id: "work_experience",
    label: "Work Experience",
    type: "subform",
    minRows: 1,
    maxRows: 5,
    fields: [
      {
        id: "company",
        label: "Company",
        type: "text",
      } as FormField,
      {
        id: "years",
        label: "Years",
        type: "number",
        min: 0,
      } as FormField,
    ],
  },
  {
    id: "signature",
    label: "Signature",
    type: "signature",
  },
  {
    id: "location",
    label: "Your Location",
    type: "map",
    showCoordinates: true,
  },
];
