import ContactForm from "@/app/contact/components/ContactForm";
import ContactInfo from "@/app/contact/components/ContactInfo";
import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer"; 
import SocialBar from "../sections/SocialBar";
import Newsletter from "../sections/Newsletter";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactForm />
      <ContactInfo />
      <SocialBar />
      <Newsletter />
      <Footer />
    </main>
  );
}