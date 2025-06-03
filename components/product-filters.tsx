"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface FilterGroup {
  name: string;
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
}

const filterGroups: FilterGroup[] = [
  {
    name: "Category",
    options: [
      { value: "men", label: "Men", count: 15 },
      { value: "women", label: "Women", count: 23 },
      { value: "accessories", label: "Accessories", count: 9 },
    ],
  },
  {
    name: "Collection",
    options: [
      { value: "summer-2025", label: "Summer 2025", count: 12 },
      { value: "spring-2025", label: "Spring 2025", count: 8 },
      { value: "winter-2024", label: "Winter 2024", count: 16 },
      { value: "fall-2024", label: "Fall 2024", count: 12 },
    ],
  },
  {
    name: "Size",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
    ],
  },
  {
    name: "Color",
    options: [
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "navy", label: "Navy" },
      { value: "green", label: "Green" },
      { value: "stone", label: "Stone" },
    ],
  },
  {
    name: "Price",
    options: [
      { value: "0-100", label: "Under $100" },
      { value: "100-200", label: "From $100 to $200" },
      { value: "200-300", label: "From $200 to $300" },
      { value: "300+", label: "Over $300" },
    ],
  },
];

export default function ProductFilters() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Category: true,
    Collection: true,
    Size: true,
    Color: true,
    Price: true,
  });

  const toggleExpand = (groupName: string) => {
    setExpanded((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button variant="link" className="h-auto p-0 text-sm">Clear All</Button>
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <div key={group.name}>
            <div
              className="flex cursor-pointer items-center justify-between pb-2 pt-1"
              onClick={() => toggleExpand(group.name)}
            >
              <h4 className="font-medium">{group.name}</h4>
              <button className="text-muted-foreground hover:text-foreground">
                {expanded[group.name] ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
              </button>
            </div>
            
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                expanded[group.name] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 pb-2 pt-1">
                  {group.options.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox id={`filter-${option.value}`} />
                      <label
                        htmlFor={`filter-${option.value}`}
                        className="flex flex-1 cursor-pointer items-center justify-between text-sm"
                      >
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                          <span className="text-xs text-muted-foreground">{option.count}</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}