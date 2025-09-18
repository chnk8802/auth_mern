import { toast } from "sonner";
import { createSupplier } from "../api/supplierApi";
import type { Supplier } from "../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { SupplierAddForm } from "../components/SupplierAddForm";


export function SupplierAddPage() {
  const navigate = useNavigate();

  const handleSave = (supplierData: Omit<Supplier, "_id">) => {
    const payload = { data: [supplierData] };

    const submitAdd = async () => {
      try {
        const result = await createSupplier(payload);
        toast.success("Supplier added successfully");
        navigate(ROUTES.SUPPLIERS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        console.error("Unable to add supplier", error);
        toast.error(
          `Unable to add supplier ${error?.response?.data?.message || ""}`
        );
      }
    };

    submitAdd();
  };

  return <SupplierAddForm onSubmit={handleSave} />;
}
