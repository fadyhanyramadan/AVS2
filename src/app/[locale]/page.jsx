import { Suspense } from "react";
import HeroSection from "../components/heroSection";
import ServicesSection from "../components/servicesSection";
import AboutSection from "../components/aboutSection";
import Blogs from "../components/blogsSection";
import Partner from "../components/partner";
import Brands from "../components/brands";
import Projects from "../components/projectsSection";
import ProductsSection from "../components/productsSection";
import CounterContainer from "../components/counterContainer";

function ProductsSkeleton() {
  return (
    <div className="container py-12 lg:py-20">
      <div className="mx-auto max-w-[90%] md:max-w-full space-y-8">
        <div className="h-8 w-48 bg-light-black rounded animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="basis-3/4 md:basis-1/2 lg:basis-1/4 shrink-0 h-80 bg-light-black rounded-3xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="  space-y-12">
      <HeroSection />
      <CounterContainer />
      <AboutSection />
      <Partner />
      <ServicesSection />
      <Projects />
      <Brands />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsSection />
      </Suspense>
      <Blogs />
    </div>
  );
}
