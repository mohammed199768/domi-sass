type Props = { count: number; isAr: boolean };

export default function WhyChangeProgressSpine({ count, isAr }: Props) {
  return (
    <aside className="why-progress" aria-label={isAr ? "تقدم القصة" : "Story progress"}>
      <span className="why-progress__label">{isAr ? "المشهد" : "SCENE"}</span>
      <div className="why-progress__track"><i data-progress-fill /></div>
      <span className="why-progress__count"><b data-progress-number>01</b> / {String(count).padStart(2, "0")}</span>
    </aside>
  );
}

