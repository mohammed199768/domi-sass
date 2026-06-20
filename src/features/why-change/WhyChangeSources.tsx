const sources = [
  { label: "DataReportal — Global Digital Overview", href: "https://datareportal.com/reports/digital-2026-global-overview-report" },
  { label: "DataReportal — Social Media Statistics", href: "https://datareportal.com/social-media-users" },
  { label: "Pew Research Center — Teens, Social Media and Technology", href: "https://www.pewresearch.org/internet/2022/08/10/teens-social-media-and-technology-2022/" },
  { label: "Google — Mobile page-speed benchmarks", href: "https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/" },
  { label: "Baymard Institute — Cart Abandonment Rate", href: "https://baymard.com/lists/cart-abandonment-rate" },
];

export default function WhyChangeSources({ isAr }: { isAr: boolean }) {
  return (
    <section className="why-sources" aria-labelledby="why-sources-title">
      <p className="why-kicker">{isAr ? "المراجع" : "References"}</p>
      <h2 id="why-sources-title">{isAr ? "مصادر البيانات" : "Data sources"}</h2>
      <p>{isAr ? "هذه الأرقام مؤشرات سياقية من مصادر منشورة، وليست ضمانًا لنتائج كل مشروع." : "These figures are context from published research, not a guarantee of results for every business."}</p>
      <ol>
        {sources.map((source) => <li key={source.href}>
          <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true"> ↗</span></a>
        </li>)}
      </ol>
    </section>
  );
}

