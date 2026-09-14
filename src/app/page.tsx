import { Navbar } from "@/components/Navbar";
import {
  About, Entities, FinalCta, Footer, Guardians, Hero, Impact, Partnerships, Programs, Transformix, Vision2030, Workshop,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Entities />
        <About />
        <Vision2030 />
        <Workshop />
        <Guardians />
        <Programs />
        <Impact />
        <Transformix />
        <Partnerships />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
