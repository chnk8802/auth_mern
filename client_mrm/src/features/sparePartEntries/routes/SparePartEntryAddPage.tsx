import { toast } from "sonner";
import { createSparePartEntry } from "../api/sparePartEntryApi";
import { SparePartEntryAddForm } from "@/features/sparePartEntries/components/SparePartEntryAddForm";
import type { SparePartEntry } from "@/features/sparePartEntries/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";

export function SparePartEntryAddPage() {
  const navigate = useNavigate();

  const handleSave = (sparePartData: Omit<SparePartEntry, "_id">) => {
    const payload = { data: [sparePartData] };

    const submitAdd = async () => {
      try {
        const result = await createSparePartEntry(payload);
        toast.success("Spare Part Entry added successfully");
        navigate(ROUTES.SPARE_PART_ENTRIES.DETAILS(result.data[0]._id));
      } catch (error: any) {
        toast.error(
          `Unable to add spare part entry ${error?.response?.data?.message}`
        );
      }
    };

    submitAdd();
  };

  return (
    <>
      <SparePartEntryAddForm onSubmit={handleSave} />
    </>
  );
}
