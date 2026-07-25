import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeActionGateway from "@/features/home/components/HomeActionGateway";
import HomeHashScroll from "@/features/home/components/HomeHashScroll";
import HomeHero from "@/features/home/components/HomeHero";
import HomeMethod from "@/features/home/components/HomeMethod";
import HomeStudioProfile from "@/features/home/components/HomeStudioProfile";
import HomeSelectedWork from "@/features/home/components/HomeSelectedWork";
import HomeSkipLink from "@/features/home/components/HomeSkipLink";
import HomeTrust from "@/features/home/components/HomeTrust";
import "@/features/home/styles/home-editorial-cinema.css";

export default function Home() {
  return (
    <>
      <HomeSkipLink />
      <Header />
      <main id="main-content" className="home-editorial" tabIndex={-1}>
        <HomeHashScroll />
        <div className="home-hero-work-transition">
          <HomeHero />
          <HomeSelectedWork />
        </div>
        <HomeMethod />
        <HomeStudioProfile />
        <HomeTrust />
        <HomeActionGateway />
      </main>
      <Footer />
    </>
  );
}
