"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";
import { type ModuleField } from "@/lib/form-generator/types/field-types";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import pluralize from "pluralize";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

type Props = {
  field: Record<string, any>;
  value: any[];
  onChange: (val: any[]) => void;
  disabled?: boolean;
};

export function SubformInputModal({
  field,
  value = [],
  onChange,
  disabled,
}: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowDraft, setRowDraft] = useState<any>({});

  const openModal = (index: number | null) => {
    if (index === null) setRowDraft({});
    else setRowDraft({ ...value[index] });

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

  const removeRow = (index: number) => {
    if (value.length <= field.minRows) return;
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <>
      {/* Table */}
      <div className="space-y-4 overflow-x-auto border rounded-md">
        <Table className="w-full">
          
          <TableHeader>
            <TableRow>
              {/* Sticky Actions Column  */}
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
                {/* Sticky Actions Column with Dropdown */}
                <TableCell className="sticky left-0 bg-background z-10">
                  {!disabled && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => openModal(index)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="py-0"
                          variant="destructive"
                        >
                          <DeleteConfirmDialog
                            onConfirm={() => removeRow(index)}
                          >
                            <Button
                              variant={"ghost"}
                              className="flex justify-start w-full p-0 text-destructive hover:text-destructive hover:bg-transparent"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              Delete
                            </Button>
                          </DeleteConfirmDialog>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>

                {field.fields.map((f: ModuleField) => (
                  // <TableCell key={f.id}>{String(row[f.id] ?? "")}</TableCell>
                  <TableCell key={f.id}>
                    <FieldRenderer
                      field={f}
                      value={row[f.id]}
                      onChange={() => {}}
                      disabled
                      showLabel={false}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Add Row Button */}
      {!disabled && value.length < field.maxRows && (
        <Button type="button" onClick={() => openModal(null)}>
          <Plus className="w-4 h-4" />
          Add {pluralize.singular(formatLabel(field.id))}
        </Button>
      )}

      {/* Modal */}
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
