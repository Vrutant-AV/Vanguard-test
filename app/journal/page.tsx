import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Sample journal posts (in a real app, this would come from a CMS/database)
const featuredPost = {
  id: 1,
  title: "The Art of Sustainable Fashion",
  excerpt: "Exploring how Vanguard is redefining sustainable practices in the fashion industry without compromising on style or quality.",
  date: "April 15, 2025",
  image: "https://images.pexels.com/photos/6567735/pexels-photo-6567735.jpeg",
  category: "Sustainability",
};

const posts = [
  {
    id: 2,
    title: "Behind the Scenes: Summer Collection",
    excerpt: "Get an exclusive look at the inspiration and creation process of our newest summer collection, from concept to runway.",
    date: "April 8, 2025",
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Collections",
  },
  {
    id: 3,
    title: "Style Guide: Minimalist Wardrobe",
    excerpt: "Curating a timeless wardrobe with versatile pieces that transition effortlessly between seasons and occasions.",
    date: "March 24, 2025",
    image: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg",
    category: "Style",
  },
  {
    id: 4,
    title: "The Future of Fashion Retail",
    excerpt: "How technology is transforming the retail experience and creating new ways for customers to engage with fashion brands.",
    date: "March 17, 2025",
    image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
    category: "Industry",
  },
  {
    id: 5,
    title: "Designer Interview: Alex Chen",
    excerpt: "A conversation with our co-founder and creative director on his design philosophy and vision for Vanguard Apparel.",
    date: "March 5, 2025",
    image: "https://images.pexels.com/photos/7172089/pexels-photo-7172089.jpeg",
    category: "Interviews",
  },
  {
    id: 6,
    title: "Material Spotlight: Organic Linen",
    excerpt: "Exploring the environmental benefits and luxurious feel of the organic linen featured in our latest collection.",
    date: "February 28, 2025",
    image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg",
    category: "Materials",
  },
  {
    id: 7,
    title: "Fashion Week Highlights",
    excerpt: "Recap of the most inspiring moments and trends from this season's international fashion weeks.",
    date: "February 15, 2025",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
    category: "Events",
  },
];

const categories = [
  "All",
  "Collections",
  "Style",
  "Sustainability",
  "Industry",
  "Interviews",
  "Materials",
  "Events",
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8 md:py-12">
        <h1 className="font-serif text-3xl font-light md:text-4xl">Journal</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Insights, stories, and updates from the world of Vanguard Apparel.
        </p>

        {/* Categories */}
        <div className="my-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-lg md:aspect-[3/1]">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="mb-2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                {featuredPost.category}
              </span>
            </div>
            <h2 className="mb-2 font-serif text-2xl font-light text-white md:text-3xl lg:text-4xl">
              {featuredPost.title}
            </h2>
            <p className="mb-4 max-w-2xl text-white/80 md:text-lg">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm text-white/70">{featuredPost.date}</p>
              <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
                <Link href={`/journal/${featuredPost.id}`}>
                  Read Article
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Journal Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group flex flex-col"
            >
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mb-2 flex">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {post.category}
                </span>
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-3 text-muted-foreground">{post.excerpt}</p>
              <p className="mt-auto text-sm text-muted-foreground">{post.date}</p>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled>
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
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous page</span>
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon">
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
                className="h-4 w-4"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
              <span className="sr-only">Next page</span>
            </Button>
          </nav>
        </div>
      </div>
    </main>
  );
}