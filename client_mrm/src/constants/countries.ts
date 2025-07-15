export type CountryOption = {
  label: string;
  value: string;
};

export const countries: CountryOption[] = [
  { label: "India", value: "india" },
];
export const countryMap = Object.fromEntries(
  countries.map((country) => [country.value, country.label])
);