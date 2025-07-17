// src/constants/indianStates.ts
export type StateOption = {
  label: string;
  value: string;
};

export const INDIAN_STATES: StateOption[] = [
  { label: "Andhra Pradesh", value: "andhra_pradesh" },
  { label: "Arunachal Pradesh", value: "arunachal_pradesh" },
  { label: "Assam", value: "assam" },
  { label: "Bihar", value: "bihar" },
  { label: "Chhattisgarh", value: "chhattisgarh" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal_pradesh" },
  { label: "Jharkhand", value: "jharkhand" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya_pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Manipur", value: "manipur" },
  { label: "Meghalaya", value: "meghalaya" },
  { label: "Mizoram", value: "mizoram" },
  { label: "Nagaland", value: "nagaland" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Sikkim", value: "sikkim" },
  { label: "Tamil Nadu", value: "tamil_nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Tripura", value: "tripura" },
  { label: "Uttar Pradesh", value: "uttar_pradesh" },
  { label: "Uttarakhand", value: "uttarakhand" },
  { label: "West Bengal", value: "west_bengal" },
  { label: "Andaman and Nicobar Islands", value: "andaman_and_nicobar_islands" },
  { label: "Chandigarh", value: "chandigarh" },
  { label: "Dadra and Nagar Haveli and Daman and Diu", value: "dadra_and_nagar_haveli_and_daman_and_diu" },
  { label: "Delhi", value: "delhi" },
  { label: "Jammu and Kashmir", value: "jammu_and_kashmir" },
  { label: "Ladakh", value: "ladakh" },
  { label: "Lakshadweep", value: "lakshadweep" },
  { label: "Puducherry", value: "puducherry" },
];
export const indianStateMap = Object.fromEntries(
  INDIAN_STATES.map((state) => [state.value, state.label])
);
