import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact | Rucira Collections",
  description: "Get in touch with Rucira Collections — questions about an order, a saree, or working with us.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <div className="lg:col-span-2">
          <ContactInfo />
        </div>
      </div>
    </>
  );
}
