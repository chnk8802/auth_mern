"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { testFields } from "@/lib/form-generator/demo/testFields"
import testDatajson from "@/lib/form-generator/demo/testData.json";
import type { TestData } from "./testData.type";

export function TestListPage() {
  const navigate = useNavigate();
  const [testData, setTestData] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleRowEdit = (test: Record<string, any>) => {
    navigate(`/dashboard/test/${test._id}/edit`);
  };

  const handleRowDelete = async (test: Record<string, any>) => {
    // try {
    //   const result = await deleteCustomer(customer._id);
    //   if (result.data.length === 0) {
    //     toast.error("Customer not found");
    //     return;
    //   }
    //   toast.success(`${result.data[0].customerCode} Customer deleted`);
    //   fetchCustomers();
    // } catch (err) {
    //   toast.error("Failed to delete customer");
    // }
  };

  const columns = ColumnGenerator<TestData>({
    fieldConfig: testFields,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    // copyField: "customerCode",
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={testDatajson as TestData[]}
        moduleName={"Test"}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
    </>
  );
}
