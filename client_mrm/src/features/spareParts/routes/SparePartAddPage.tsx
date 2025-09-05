import { toast } from "sonner";
import { createSparePart } from "../api/sparePartApi";
import type { SparePart } from "@/features/spareParts/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { SparePartAddForm } from "@/features/spareParts/components/sparePartAddForm";

export function SparePartAddPage() {
  const navigate = useNavigate();
   const handleSave = (sparePartData: Omit<SparePart, "_id">) => {
    const payload = { data: [sparePartData] };

    const submitAdd = async () => {
      try {
        const result = await createSparePart(payload);
        toast.success("Spare part added successfully");
        navigate(ROUTES.SPARE_PARTS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        console.error("Unable to add spare part", error);
        toast.error(`Unable to add spare part ${error?.response?.data?.message}`);
      }
    };

    submitAdd();
  };
  return (
    <>
      <SparePartAddForm onSubmit={handleSave} />
    </>
  );
}
