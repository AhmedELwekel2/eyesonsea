import { Navbar } from "@/components/Navbar";
import {
  Footer,
  Gallery,
  Hero,
  Journey,
  Partners,
  Program,
  RegisterCta,
  Safety,
  Stats,
  Teams,
  Threats,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Journey />
        <Teams />
        <Program />
        <Threats />
        <Gallery />
        <Safety />
        <Partners />
        <RegisterCta />
      </main>
      <Footer />
    </>
  );
}
