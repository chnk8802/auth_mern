"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cleanObject } from "@/lib/utils";

import type { RepairJob } from "@/features/repairJob/types";

import { RepairJobStatus } from "@/constants/repairJobStatus";
import { RepairType } from "@/constants/repairType";
import { indianStates } from "@/constants/indianStates";
import { PaymentStatus } from "@/constants/paymentStatus";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/common/Combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelectCombobox } from "@/components/common/MultiselectCombobox";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/common/DateTimePicker";
import { Section } from "@/components/layout/sectionLayouts/Sections";
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Section title="Repair Job" col={2}>
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

          <FormField
            control={form.control}
            name="repairStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
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
          <FormField
            control={form.control}
            name="deviceModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model     <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Model" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deviceIMEI"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IMEI</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter IMEI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issueDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Issue Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repairType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repair Type</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={RepairType}
                    placeholder="Select"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repairStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technician</FormLabel>
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
          <FormField
            control={form.control}
            name="deviceComponents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device Components</FormLabel>
                <FormControl>
                  <MultiSelectCombobox
                    value={field.value || [""]}
                    onChange={field.onChange}
                    options={RepairJobStatus}
                    placeholder="Select"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
<FormField
            control={form.control}
            name="repairCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repair Cost</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </Section>
        <Section>
          <FormField
            control={form.control}
            name="spareParts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spare Parts</FormLabel>
                <FormControl>
                  <MultiSelectCombobox
                    value={field.value ?? []}
                    onChange={field.onChange}
                    options={indianStates}
                    placeholder="Select"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>
        <Section>
          <FormField
            control={form.control}
            name="totalSparePartsCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Spare Part Cost</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalReceivable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Receivable</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profit</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentDetails.paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value ?? ""}
                    options={PaymentStatus}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDetails.amountReceived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Received</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDetails.amountDue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Due</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder="0.00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picked At</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section col={8}>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mr-2"
            onClick={() => setSaveAndNew(false)}
          >
            {form.formState.isSubmitting ? "saving..." : "Save"}
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={form.formState.isSubmitting}
            onClick={() => setSaveAndNew(true)}
          >
            {form.formState.isSubmitting ? "saving..." : "Save and New"}
          </Button>
        </Section>
      </form>
    </Form>
  );
}
