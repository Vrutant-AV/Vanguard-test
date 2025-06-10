/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg"
          alt="Vanguard Apparel team"
          fill
          className="object-cover object-center"
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Our Story
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className={`container ${styles.section}`}>
        <div className={styles.storyHeader}>
          <h2 className={styles.storyTitle}>
            Redefining Contemporary Fashion
          </h2>
          <p className={styles.storySubtitle}>
            Founded in 2022, Vanguard Apparel emerged from a shared vision to create clothing that balances timeless elegance with contemporary edge.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.contentImage}>
            <Image
              src="https://images.pexels.com/photos/5384430/pexels-photo-5384430.jpeg"
              alt="Vanguard founders"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className={styles.contentText}>
            <h3 className={styles.contentTitle}>Our Beginning</h3>
            <p className={styles.contentParagraph}>
              Vanguard was born from the creative partnership of designers Alex Chen and Maya Rodriguez, who met while studying at Central Saint Martins in London. Their complementary aesthetics—Alex's architectural precision and Maya's fluid draping—created a unique design language that quickly gained attention.
            </p>
            <p className={styles.contentParagraph}>
              The duo launched their first collection in spring 2022, featuring just twelve meticulously crafted pieces. The collection sold out within weeks, establishing Vanguard's reputation for refined minimalism with unexpected details.
            </p>
          </div>

          <div className={`${styles.contentText} md:order-3`}>
            <h3 className={styles.contentTitle}>Our Philosophy</h3>
            <p className={styles.contentParagraph}>
              At Vanguard, we believe clothing should empower its wearer through a perfect balance of comfort and confidence. Each garment is designed to be a foundation piece with distinctive character—versatile enough for everyday wear yet unique enough to stand out.
            </p>
            <p className={styles.contentParagraph}>
              We embrace slow fashion principles, creating pieces meant to transcend seasons and trends. Our collections build upon one another rather than replacing what came before, encouraging a more thoughtful approach to personal style.
            </p>
          </div>
          <div className={`${styles.contentImage} md:order-4`}>
            <Image
              src="https://images.pexels.com/photos/5384420/pexels-photo-5384420.jpeg"
              alt="Vanguard workshop"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className={styles.contentImage}>
            <Image
              src="https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg"
              alt="Vanguard materials"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className={styles.contentText}>
            <h3 className={styles.contentTitle}>Our Commitment</h3>
            <p className={styles.contentParagraph}>
              Sustainability is fundamental to our ethos. We work with mills and factories that prioritize environmental responsibility, using organic and recycled materials whenever possible. Each supplier is carefully selected based on their ethical practices and quality standards.
            </p>
            <p className={styles.contentParagraph}>
              We're committed to transparency throughout our production process, continuously improving our methods to reduce our environmental impact while creating clothing that's made to last.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.sectionMuted}>
        <div className={`container ${styles.teamSection}`}>
          <h2 className={styles.teamTitle}>
            Our Team
          </h2>
          <div className={styles.teamGrid}>
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
              <div key={person.name} className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className={styles.memberName}>{person.name}</h3>
                <p className={styles.memberRole}>{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
