import Features01Page from "@/components/features-01/features-01";
import Hero01 from "@/components/hero-01/hero-01";
import Testimonial01 from "@/components/testimonial-01/testimonial-01";

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-0">
      <Hero01 />
      <Features01Page />
      <Testimonial01 />
    </div>
  );
}
