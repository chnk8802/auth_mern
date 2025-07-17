import type { ModuleField } from "@/lib/form-generator/types/field-types";
import { normalizeFields } from "@/lib/form-generator/utils/normalizeFields";

export const fields: ModuleField[] = [{
    id: "userCode",
    label: "User Code",
    type: "text",
    required: true,
}, {
    id: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter Full Name",
}, {
    id: "email",
    label: "Email",
    type: "email",
}, {
    id: "role",
    label: "Role",
    type: "select",
    options: []
}, {
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
    id: "createdAt",
    label: "Created At",
    type: "datetime",
    showInTable: true
},
{
    id: "updatedAt",
    label: "Updated At",
    type: "datetime",
    showInTable: true
}]

export const userFields = normalizeFields(fields)