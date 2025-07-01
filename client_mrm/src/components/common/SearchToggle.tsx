import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export const SearchToggle = ({ globalFilter, setGlobalFilter }: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className={``}>
      {searchOpen ? (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
            autoFocus
          />
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
            <X />
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="icon" onClick={() => setSearchOpen(true)}>
          <Search />
        </Button>
      )}
    </div>
  );
};
