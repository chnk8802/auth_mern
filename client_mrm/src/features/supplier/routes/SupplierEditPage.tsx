import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes.constants";
import { getSupplierById, updateSupplier } from "../api/supplierApi";
import type { Supplier } from "../types";
import { SupplierEditForm } from "../components/supplierEditForm";
import { Loading } from "@/components/common/Loading";

export function SupplierEditPage() {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supplierId) return;

    const fetchSupplier = async () => {
      try {
        const res = await getSupplierById(supplierId);
        setSupplier(res.data[0]);
      } catch (err) {
        toast.error("Failed to fetch supplier");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleEdit = (data: Supplier) => {
    if (!supplierId || !supplier) {
      toast.error("Supplier ID or original data is missing");
      return;
    }

    const changedFields = getChangedFields(data, supplier);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }

    const payload = { data: [{ ...changedFields }] };

    const submitUpdate = async () => {
      try {
        const result = await updateSupplier(supplierId, payload);
        toast.success("Supplier details updated");
        navigate(ROUTES.SUPPLIERS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        toast.error(
          `Unable to update supplier: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <Loading fullscreen={true} />;

  if (!supplier)
    return <div className="p-2 text-center">Supplier not found</div>;

  return <SupplierEditForm supplier={supplier} onSubmit={handleEdit} />;
}
