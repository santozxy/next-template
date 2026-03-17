"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchProps {
  placeholder?: string;
  delay?: number;
  onSearch: (value: string) => void;
}

export function Search({
  placeholder = "Buscar...",
  delay = 500,
  onSearch,
}: SearchProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  function handleClear() {
    setValue("");
  }

  return (
    <div className="relative w-full max-w-sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        icon={<SearchIcon size={16} />}
        iconPosition="left"
        className="pr-9"
      />

      {value && (
        <button
          onClick={handleClear}
          type="button"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
