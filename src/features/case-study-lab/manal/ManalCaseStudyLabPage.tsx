import BeforeAfterStickyScene from "./BeforeAfterStickyScene";
import ChaosToPlatformSvgScene from "./ChaosToPlatformSvgScene";
import FeatureSystemScene from "./FeatureSystemScene";
import ManalHeroScene from "./ManalHeroScene";
import ResultStatementScene from "./ResultStatementScene";

export default function ManalCaseStudyLabPage() {
  return (
    <main lang="ar" dir="rtl" className="min-h-screen overflow-clip bg-[#f3f0e9] font-arabic text-[#102f2b] selection:bg-[#d39c62]/35">
      <ManalHeroScene />
      <ChaosToPlatformSvgScene />
      <BeforeAfterStickyScene />
      <FeatureSystemScene />
      <ResultStatementScene />
    </main>
  );
}
