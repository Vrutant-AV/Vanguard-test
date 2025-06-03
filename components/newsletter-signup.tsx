import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-light md:text-4xl">
            Join Our Community
          </h2>
          <p className="mb-8 text-primary-foreground/90">
            Subscribe to our newsletter to receive updates on new collections,
            exclusive offers, and styling inspiration.
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="h-12 flex-1 rounded-md border border-primary-foreground/20 bg-transparent px-4 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground/50 focus:outline-none"
              required
            />
            <Button className="h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-primary-foreground/70">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}