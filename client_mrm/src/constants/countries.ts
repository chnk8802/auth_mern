export type CountryOption = {
  label: string;
  value: string;
};

export const COUNTRY: CountryOption[] = [
  { label: "India", value: "india" },
];
export const COUNTRY_MAP = Object.fromEntries(
  COUNTRY.map((country) => [country.value, country.label])
);