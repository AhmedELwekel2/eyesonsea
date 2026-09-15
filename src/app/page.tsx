import { Navbar } from "@/components/Navbar";
import {
  About, FinalCta, Footer, Guardians, Hero, Impact, Learning, Partners, Partnerships, Programs, Transformix, Vision2030, Workshop,
} from "@/components/Sections";
import { VideoGallery } from "@/components/VideoGallery";
import { Register } from "@/components/Register";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Partners />
        <About />
        <Learning />
        <Vision2030 />
        <Workshop />
        <VideoGallery />
        <Guardians />
        <Programs />
        <Transformix />
        <Partnerships />
        <Register />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
