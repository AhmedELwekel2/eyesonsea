import { Navbar } from "@/components/Navbar";
import {
  About, Entities, FinalCta, Footer, Guardians, Hero, Impact, Partnerships, Programs, Register, Transformix, Vision2030, Workshop,
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
        <Register />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
