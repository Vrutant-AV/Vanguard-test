"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8 md:py-12">
        <h1 className="font-serif text-3xl font-light md:text-4xl">Contact Us</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Have questions or feedback? We`d love to hear from you.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-12 xl:gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-6 font-serif text-2xl font-light">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium">Visit Our Store</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Fashion Avenue<br />
                      SoHo, New York, NY 10012<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium">Call Us</h3>
                    <p className="text-sm text-muted-foreground">
                      +1 (212) 555-0123<br />
                      Monday - Friday, 9am - 6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium">Email Us</h3>
                    <p className="text-sm text-muted-foreground">
                      info@vanguardapparel.com<br />
                      support@vanguardapparel.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 font-medium">Store Hours</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>11:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00 PM - 6:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-6 font-serif text-2xl font-light">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="rounded-md bg-primary/10 p-6 text-center">
                  <h3 className="mb-2 text-lg font-medium">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Your message has been sent successfully. We`ll get back to you as soon as possible.
                  </p>
                  <Button 
                    className="mt-4"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="order">Order Status</SelectItem>
                          <SelectItem value="products">Product Information</SelectItem>
                          <SelectItem value="returns">Returns & Exchanges</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted">
            <div className="relative h-full w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.7382585275357!2d-73.9995779!3d40.723884799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598c5c51ad6f%3A0x8bbe06c8c8f1247!2sSoHo%2C%20New%20York%2C%20NY%2010012!5e0!3m2!1sen!2sus!4v1694458793010!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}