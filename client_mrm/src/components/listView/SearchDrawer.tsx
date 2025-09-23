"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Label } from "../ui/label";

export const SearchDrawer = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleClear = () => {
    setGlobalFilter("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Search />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search & Filter</DialogTitle>
        </DialogHeader>

        <div
          className="overflow-y-auto grid gap-4"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          <div className="grid gap-2 p-1">
            <Label className="text-sm font-medium text-gray-500">Search</Label>
            <Input
              id="search"
              placeholder={`Type to search ...`}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className=""
            />
          </div>
        </div>

        <DialogFooter className="">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="default">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
