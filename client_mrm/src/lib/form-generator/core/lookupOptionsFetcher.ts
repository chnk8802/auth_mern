// Example: central fetcher for your form generator
export async function fetchLookupOptions(
  moduleName: string,
  displayFields: string[],
  criteria: Record<string, any> = {},
  search = "",
  extra?: { populate?: any; page?: number; limit?: number; sort?: string }
) {
  const params = new URLSearchParams({
    module: moduleName,
    displayFields: displayFields.join(","),
    criteria: JSON.stringify(criteria),
  });
  if (search) params.set("search", search);
  if (extra?.populate) params.set("populate", JSON.stringify(extra.populate));
  if (extra?.page) params.set("page", String(extra.page));
  if (extra?.limit) params.set("limit", String(extra.limit));
  if (extra?.sort) params.set("sort", extra.sort);

  const res = await fetch(`/api/lookup?${params.toString()}`);
  const json = await res.json();
  if (!json?.success) throw new Error(json?.message || "Lookup failed");
  return json;
}
