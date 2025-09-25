"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";
import { type ModuleField } from "@/lib/form-generator/types/field-types";
import pluralize from "pluralize";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatLabel } from "@/lib/utils";
import { SubformRowAction } from "./SubformRowAction";

type Props = {
  field: Record<string, any>;
  value: any[];
  onChange: (val: any[]) => void;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
};

export function SubformInputUnified({
  field,
  value = [],
  onChange,
  disabled,
  minRows = 0,
  maxRows = Infinity,
}: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowDraft, setRowDraft] = useState<any>({});

  const removeRow = (index: number) => {
    if (value.length <= minRows) return;
    onChange(value.filter((_, i) => i !== index));
  };

  const openModal = (index: number | null) => {
    setRowDraft(index === null ? {} : { ...value[index] });
    setEditingIndex(index);
    setModalOpen(true);
  };

  const saveRow = () => {
    const updated = [...value];
    if (editingIndex === null) updated.push(rowDraft);
    else updated[editingIndex] = rowDraft;
    onChange(updated);
    setModalOpen(false);
  };

  return (
    <>
      <div className="space-y-4 overflow-x-auto border rounded-md">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background z-10"></TableHead>
              {field.fields.map((f: ModuleField) => (
                <TableHead key={f.id}>{f.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {value.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={field.fields.length + 1}
                  className="text-center text-muted-foreground"
                >
                  No {formatLabel(field.id)} added yet.
                </TableCell>
              </TableRow>
            )}
            {value.map((row, index) => (
              <TableRow key={index}>
                {!disabled && (
                  <TableCell className="sticky left-0 bg-background z-10">
                    <SubformRowAction
                      index={index}
                      openModal={openModal}
                      removeRow={removeRow}
                      disabled={disabled}
                    />
                  </TableCell>
                )}
                {field.fields.map((f: ModuleField) => (
                  <TableCell key={f.id}>
                    <FieldRenderer
                      field={f}
                      value={row[f.id]}
                      onChange={() => {}}
                      showLabel={false}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {!disabled && value.length < maxRows && (
        <Button type="button" onClick={() => openModal(null)}>
          <Plus className="w-4 h-4" /> Add{" "}
          {pluralize.singular(formatLabel(field.id))}
        </Button>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingIndex === null ? "Add " : "Edit "}{" "}
              {pluralize.singular(formatLabel(field.id))}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {field.fields.map((f: ModuleField) => (
              <FieldRenderer
                key={f.id}
                field={f}
                value={rowDraft?.[f.id]}
                onChange={(val) => setRowDraft({ ...rowDraft, [f.id]: val })}
                disabled={disabled}
              />
            ))}
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveRow}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
