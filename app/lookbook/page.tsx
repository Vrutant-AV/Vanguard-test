import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="relative aspect-[21/9] max-h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/2566025/pexels-photo-2566025.jpeg"
          alt="Vanguard Lookbook"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-4xl font-light tracking-tight text-white md:text-6xl">
            Lookbook
          </h1>
        </div>
      </section>

      {/* Collections Tabs */}
      <section className="container py-16 md:py-24">
        <Tabs defaultValue="summer2025" className="w-full">
          <div className="mb-12">
            <TabsList className="mx-auto flex w-full max-w-md justify-center space-x-4 rounded-none border-b bg-transparent p-0">
              {["Summer 2025", "Spring 2025", "Winter 2024", "Fall 2024"].map((season) => (
                <TabsTrigger
                  key={season}
                  value={season.toLowerCase().replace(" ", "")}
                  className="rounded-none border-b-2 border-transparent pb-2 pt-1 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {season}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Summer 2025 Collection */}
          <TabsContent value="summer2025" className="mt-0">
            <div className="mb-10 max-w-3xl">
              <h2 className="mb-4 font-serif text-3xl font-light">Coastal Modernism</h2>
              <p className="text-muted-foreground">
                Our Summer 2025 collection draws inspiration from the meeting point of architecture and coastline. Clean lines and structured silhouettes are softened by lightweight fabrics and a palette of sand, sea foam, and terracotta that evokes Mediterranean summers.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/shop?collection=summer2025" className="flex items-center">
                    Shop the Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-4">
                {[
                  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
                  "https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg",
                ].map((src, index) => (
                  <div key={index} className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                    <Image
                      src={src}
                      alt={`Summer 2025 lookbook image ${index + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
              <div className="grid gap-4">
                {[
                  "https://images.pexels.com/photos/2778144/pexels-photo-2778144.jpeg",
                  "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
                ].map((src, index) => (
                  <div key={index} className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                    <Image
                      src={src}
                      alt={`Summer 2025 lookbook image ${index + 3}`}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
              <div className="hidden lg:grid lg:gap-4">
                {[
                  "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
                  "https://images.pexels.com/photos/1726496/pexels-photo-1726496.jpeg",
                ].map((src, index) => (
                  <div key={index} className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                    <Image
                      src={src}
                      alt={`Summer 2025 lookbook image ${index + 5}`}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Other collections would follow the same pattern */}
          <TabsContent value="spring2025">
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Spring 2025 collection coming soon.</p>
            </div>
          </TabsContent>
          <TabsContent value="winter2024">
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Winter 2024 collection coming soon.</p>
            </div>
          </TabsContent>
          <TabsContent value="fall2024">
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Fall 2024 collection coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Behind the Scenes */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-light md:text-4xl">
            Behind the Scenes
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
              <Image
                src="https://images.pexels.com/photos/2451259/pexels-photo-2451259.jpeg"
                alt="Behind the scenes - photoshoot"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 font-serif text-2xl font-light">Summer 2025 Campaign</h3>
              <p className="mb-4 text-muted-foreground">
                Shot on location in Santorini, Greece, our Summer 2025 campaign captures the essence of Mediterranean architecture against the iconic blue and white landscape. We collaborated with renowned photographer Elena Mayer to bring our vision to life.
              </p>
              <p className="text-muted-foreground">
                The campaign features models from diverse backgrounds, each bringing their unique energy to showcase the versatility and inclusivity of our designs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// import styles from "./page.module.css";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function LookbookPage() {
//   return (
//     <main className={styles.main}>
//       {/* Hero Section */}
//       <section className={styles.heroSection}>
//         <Image
//           src="https://images.pexels.com/photos/2566025/pexels-photo-2566025.jpeg"
//           alt="Vanguard Lookbook"
//           fill
//           className={styles.heroImage}
//           priority
//         />
//         <div className={styles.overlay} />
//         <div className={styles.heroTextContainer}>
//           <h1 className={styles.heroTitle}>
//             Lookbook
//           </h1>
//         </div>
//       </section>

//       {/* Collections Tabs */}
//       <section className={styles.tabsSection}>
//         <Tabs defaultValue="summer2025" className="w-full">
//           <div className={styles.tabsHeader}>
//             <TabsList className={styles.tabsList}>
//               {["Summer 2025", "Spring 2025", "Winter 2024", "Fall 2024"].map((season) => (
//                 <TabsTrigger
//                   key={season}
//                   value={season.toLowerCase().replace(" ", "")}
//                   className={styles.tabsTrigger}
//                 >
//                   {season}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </div>

//           {/* Summer 2025 Collection */}
//           <TabsContent value="summer2025" className="mt-0">
//             <div className={styles.collectionIntro}>
//               <h2 className={styles.collectionTitle}>Coastal Modernism</h2>
//               <p className="text-muted-foreground">
//                 Our Summer 2025 collection draws inspiration from the meeting point of architecture and coastline. Clean lines and structured silhouettes are softened by lightweight fabrics and a palette of sand, sea foam, and terracotta that evokes Mediterranean summers.
//               </p>
//               <div className="mt-6">
//                 <Button asChild variant="outline">
//                   <Link href="/shop?collection=summer2025" className="flex items-center">
//                     Shop the Collection
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             <div className={styles.gridWrapper}>
//               <div className={styles.gridColumn}>
//                 {[
//                   "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
//                   "https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg",
//                 ].map((src, index) => (
//                   <div key={index} className={styles.imageCard}>
//                     <Image
//                       src={src}
//                       alt={`Summer 2025 lookbook image ${index + 1}`}
//                       fill
//                       className={styles.gridImage}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className={styles.gridColumn}>
//                 {[
//                   "https://images.pexels.com/photos/2778144/pexels-photo-2778144.jpeg",
//                   "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
//                 ].map((src, index) => (
//                   <div key={index} className={styles.imageCard}>
//                     <Image
//                       src={src}
//                       alt={`Summer 2025 lookbook image ${index + 3}`}
//                       fill
//                       className={styles.gridImage}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className={styles.gridColumn}>
//                 {[
//                   "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
//                   "https://images.pexels.com/photos/1726496/pexels-photo-1726496.jpeg",
//                 ].map((src, index) => (
//                   <div key={index} className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
//                     <Image
//                       src={src}
//                       alt={`Summer 2025 lookbook image ${index + 5}`}
//                       fill
//                       className={styles.gridImage}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>
          
//           {/* Other collections would follow the same pattern */}
//           <TabsContent value="spring2025">
//             <div className={styles.emptyCollection}>
//               <p className="text-muted-foreground">Spring 2025 collection coming soon.</p>
//             </div>
//           </TabsContent>
//           <TabsContent value="winter2024">
//             <div className={styles.emptyCollection}>
//               <p className="text-muted-foreground">Winter 2024 collection coming soon.</p>
//             </div>
//           </TabsContent>
//           <TabsContent value="fall2024">
//             <div className={styles.emptyCollection}>
//               <p className="text-muted-foreground">Fall 2024 collection coming soon.</p>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </section>
      
//       {/* Behind the Scenes */}
//       <section className={styles.btsSection}>
//         <div className="container">
//           <h2 className={styles.btsTitle}>
//             Behind the Scenes
//           </h2>
//           <div className={styles.btsGrid}>
//             <div className={styles.btsImageWrapper}>
//               <Image
//                 src="https://images.pexels.com/photos/2451259/pexels-photo-2451259.jpeg"
//                 alt="Behind the scenes - photoshoot"
//                 fill
//                 className={styles.gridImage}
//               />
//             </div>
//             <div className={styles.btsText}>
//               <h3 className={styles.btsSubheading}>Summer 2025 Campaign</h3>
//               <p className="mb-4 text-muted-foreground">
//                 Shot on location in Santorini, Greece, our Summer 2025 campaign captures the essence of Mediterranean architecture against the iconic blue and white landscape. We collaborated with renowned photographer Elena Mayer to bring our vision to life.
//               </p>
//               <p className="text-muted-foreground">
//                 The campaign features models from diverse backgrounds, each bringing their unique energy to showcase the versatility and inclusivity of our designs.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }