import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeActionGateway from "@/features/home/components/HomeActionGateway";
import HomeAboutMotion from "@/features/home/components/HomeAboutMotion";
import HomeHashScroll from "@/features/home/components/HomeHashScroll";
import HomeHero from "@/features/home/components/HomeHero";
import HomeMotionMarquee from "@/features/home/components/HomeMotionMarquee";
import HomeProjectsStack from "@/features/home/components/HomeProjectsStack";
import HomeServicesMotion from "@/features/home/components/HomeServicesMotion";
import HomeSkipLink from "@/features/home/components/HomeSkipLink";
import HomeTrust from "@/features/home/components/HomeTrust";
import "@/features/home/styles/home-current.css";
import "@/features/home/styles/home-redesign.css";
import "@/features/home/styles/home-motion-reference.css";

export default function Home() {
  return (
    <>
      <HomeSkipLink />
      <Header />
      <main
        id="main-content"
        className="home-editorial motion-home"
        tabIndex={-1}
      >
        <HomeHashScroll />
        <HomeHero />
        <HomeMotionMarquee />
        <HomeAboutMotion />
        <HomeServicesMotion />
        <HomeProjectsStack />
        <HomeTrust />
        <HomeActionGateway />
      </main>
      <Footer />
    </>
  );
}
