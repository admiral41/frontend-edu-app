import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/sections/HeroSlider";
import StatsBar from "@/components/sections/StatsBar";
import Courses from "@/components/sections/Courses";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import InquiryForm from "@/components/sections/InquiryForm";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSlider />
        <StatsBar />
        <Courses />
        <WhyChooseUs />
        <Testimonials />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  );
}
