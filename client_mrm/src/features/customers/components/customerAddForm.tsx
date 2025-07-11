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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Customer } from "../types";
import { Combobox } from "@/components/common/Combobox";
import { indianStates } from "@/constants/indianStates";
import { countries } from "@/constants/countries";
import { useState } from "react";
import { cleanObject } from "@/lib/utils";
import { toast } from "sonner";
import {
  AnimatedSection,
  Section,
} from "@/components/layout/sectionLayouts/sections";
import { ColumnGrid } from "@/components/layout/sectionLayouts/grids";

type AddCustomerFormProps = {
  onSubmit: (data: Customer) => void;
};

export function AddCustomerForm({ onSubmit }: AddCustomerFormProps) {
  const form = useForm<Customer>({});
  const [saveAndNew, setSaveAndNew] = useState(false);

  const handleSubmit = (data: Customer) => {
    const cleanedData = cleanObject(data);
    if (Object.keys(cleanedData).length === 0) {
      toast.error("No valid data to submit");
      form.reset();
      return;
    }

    onSubmit(cleanedData);
    if (saveAndNew) {
      form.reset();
    }
    setSaveAndNew(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <AnimatedSection title="General">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="phone" placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBulkCustomer"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormLabel>Is Bulk Customer</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={!!field.value} // Ensure it's boolean
                      onCheckedChange={(checked) => field.onChange(!!checked)} // Coerce to boolean
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </AnimatedSection>

        <AnimatedSection title="Address">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      options={indianStates}
                      placeholder="Select state"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      options={countries}
                      placeholder="Select Country"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </AnimatedSection>

        <Section>
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
