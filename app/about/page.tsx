import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="relative aspect-[21/9] max-h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg"
          alt="Vanguard Apparel team"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-serif text-4xl font-light tracking-tight text-white md:text-6xl">
            Our Story
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-light md:text-4xl">
            Redefining Contemporary Fashion
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Founded in 2022, Vanguard Apparel emerged from a shared vision to create clothing that balances timeless elegance with contemporary edge.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
              src="https://images.pexels.com/photos/5384430/pexels-photo-5384430.jpeg"
              alt="Vanguard founders"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 font-serif text-2xl font-light">Our Beginning</h3>
            <p className="mb-4 text-muted-foreground">
              Vanguard was born from the creative partnership of designers Alex Chen and Maya Rodriguez, who met while studying at Central Saint Martins in London. Their complementary aesthetics—Alex's architectural precision and Maya's fluid draping—created a unique design language that quickly gained attention.
            </p>
            <p className="text-muted-foreground">
              The duo launched their first collection in spring 2022, featuring just twelve meticulously crafted pieces. The collection sold out within weeks, establishing Vanguard's reputation for refined minimalism with unexpected details.
            </p>
          </div>

          <div className="flex flex-col justify-center md:order-3">
            <h3 className="mb-4 font-serif text-2xl font-light">Our Philosophy</h3>
            <p className="mb-4 text-muted-foreground">
              At Vanguard, we believe clothing should empower its wearer through a perfect balance of comfort and confidence. Each garment is designed to be a foundation piece with distinctive character—versatile enough for everyday wear yet unique enough to stand out.
            </p>
            <p className="text-muted-foreground">
              We embrace slow fashion principles, creating pieces meant to transcend seasons and trends. Our collections build upon one another rather than replacing what came before, encouraging a more thoughtful approach to personal style.
            </p>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-md md:order-4">
            <Image
              src="https://images.pexels.com/photos/5384420/pexels-photo-5384420.jpeg"
              alt="Vanguard workshop"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
              src="https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg"
              alt="Vanguard materials"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 font-serif text-2xl font-light">Our Commitment</h3>
            <p className="mb-4 text-muted-foreground">
              Sustainability is fundamental to our ethos. We work with mills and factories that prioritize environmental responsibility, using organic and recycled materials whenever possible. Each supplier is carefully selected based on their ethical practices and quality standards.
            </p>
            <p className="text-muted-foreground">
              We're committed to transparency throughout our production process, continuously improving our methods to reduce our environmental impact while creating clothing that's made to last.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-light md:text-4xl">
            Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Chen",
                role: "Co-Founder & Creative Director",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
              },
              {
                name: "Maya Rodriguez",
                role: "Co-Founder & Design Director",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
              },
              {
                name: "David Kim",
                role: "Head of Production",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
              },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="relative mx-auto mb-4 aspect-square w-40 overflow-hidden rounded-full md:w-48">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="mb-1 text-lg font-medium">{person.name}</h3>
                <p className="text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}