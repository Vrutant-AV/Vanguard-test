import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

// Sample categories
const categories = [
  {
    id: 1,
    name: "Men",
    image: "https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg",
  },
  {
    id: 2,
    name: "Women",
    image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
  },
];

export default function CategoryShowcase() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.name.toLowerCase()}`}
          className={cn(
            "group relative flex aspect-[3/4] w-full items-end overflow-hidden rounded-md bg-muted",
            index === 0 && "sm:col-span-2 lg:col-span-1"
          )}
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 w-full p-6 text-white">
            <h3 className="mb-2 font-serif text-2xl font-light">
              {category.name}
            </h3>
            <p className="inline-flex items-center text-sm">
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}