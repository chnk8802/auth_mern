"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { RepairJob } from "@/features/repairJob/types";
import { motion } from "framer-motion";
import { Combobox } from "@/components/common/Combobox";
import { useState } from "react";
import { cleanObject } from "@/lib/utils/utils";
import { toast } from "sonner";
import { RepairJobStatus } from "@/constants/repairJobStatus";
import { DetailViewSection } from "@/components/detailView/DetailViewComponents";
import { Input } from "@/components/ui/input";

type AddRepairJobFormProps = {
  onSubmit: (data: RepairJob) => void;
};

export function AddRepairJobForm({ onSubmit }: AddRepairJobFormProps) {
  const form = useForm<RepairJob>({});
  const [saveAndNew, setSaveAndNew] = useState(false);

  const handleSubmit = (data: RepairJob) => {
    const cleanedData = cleanObject(data);
    if (Object.keys(cleanedData).length === 0) {
      toast.error("No valid data to submit");
      form.reset();
      return;
    }

    console.log("Form data submitted no undefined:", cleanedData);
    onSubmit(cleanedData);
    if (saveAndNew) {
      form.reset();
    }
    setSaveAndNew(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-4xl space-y-6"
      >
          <DetailViewSection title="">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <FormField
              control={form.control}
              name="repairStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repair Status</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      options={RepairJobStatus}
                      placeholder="Select"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </motion.div>
          </DetailViewSection>
      </form>
    </Form>
  );
}
