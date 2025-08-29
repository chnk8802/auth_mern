import api from "@/lib/axios";

interface FetchLookupOptionsParams {
  module: string;
  displayField?: string;
  criteria?: Record<string, any>;
  search?: string;
}

export async function fetchLookupOptions({
  module,
  displayField,
  criteria,
  search,
}: FetchLookupOptionsParams) {
  try {
    const res = await api.get("/lookup", {
      params: { module, displayField, criteria, search },
    });
    return res.data;
  } catch (err) {
    console.error("Lookup fetch error:", err);
    return [];
  }
}
