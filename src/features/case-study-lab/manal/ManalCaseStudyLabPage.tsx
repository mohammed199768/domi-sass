import BeforeAfterStickyScene from "./BeforeAfterStickyScene";
import ChaosToPlatformSvgScene from "./ChaosToPlatformSvgScene";
import FeatureSystemScene from "./FeatureSystemScene";
import ManalHeroScene from "./ManalHeroScene";
import ResultStatementScene from "./ResultStatementScene";

export default function ManalCaseStudyLabPage() {
  return (
    <main lang="ar" dir="rtl" className="min-h-screen overflow-clip bg-manal-canvas font-arabic text-manal-ink selection:bg-manal-gold/35">
      <ManalHeroScene />
      <ChaosToPlatformSvgScene />
      <BeforeAfterStickyScene />
      <FeatureSystemScene />
      <ResultStatementScene />
    </main>
  );
}
