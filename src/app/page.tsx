import { Navbar } from "@/components/Navbar";
import {
  About, Entities, FinalCta, Footer, Guardians, Hero, Impact, Partnerships, Programs, Transformix, Vision2030, Workshop,
} from "@/components/Sections";
import { VideoGallery } from "@/components/VideoGallery";
import { Register } from "@/components/Register";

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
        <VideoGallery />
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
