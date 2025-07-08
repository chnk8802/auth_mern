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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Search />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search & Filter</DialogTitle>
        </DialogHeader>

        <div
          className="overflow-y-auto grid gap-3"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          <div className="grid gap-2">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-500"
            >
              Search
            </label>
            <Input
              id="search"
              placeholder={`Type to search ...`}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
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
