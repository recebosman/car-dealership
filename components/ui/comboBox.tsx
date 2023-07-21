"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxProps = {
  data: {
    value: string;
    label: string;
  }[];
  command: string;
  setVehicleType?: (value: string) => void;
};

export function ComboboxDemo({ data, command, setVehicleType }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (value) {
      setVehicleType?.(value);
    }
  }, [value, setVehicleType]);

  const handleSelectItem = (currentValue: any) => {
    if (currentValue === "all") {
      setValue("");
      setVehicleType?.("");
    } else {
      setValue(currentValue);
      setVehicleType?.(currentValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[225px] justify-between"
        >
          {value ? data.find((item) => item.value === value)?.label : command}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={command} />
          <CommandEmpty>
            Nothing found for <strong>{command}</strong>
          </CommandEmpty>

          <CommandGroup>
            <CommandItem key="all" onSelect={() => handleSelectItem("all")}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === "" ? "opacity-100" : "opacity-0"
                )}
              />
              All Vehicles
            </CommandItem>

            {data?.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => handleSelectItem(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
