import WhyUsTrustFrame from "./WhyUsTrustFrame";
import type { WhyUsStory } from "./whyUsContent";

type Props = {
  section: WhyUsStory;
  index: number;
  isAr: boolean;
};

export default function WhyUsStorySection({ section, index, isAr }: Props) {
  const locale = isAr ? "ar" : "en";
  const visualFirst = index % 2 === 1;

  return (
    <article
      className="why-us-story-section"
      data-why-us-reveal
      data-visual-first={visualFirst ? "true" : "false"}
      data-story-id={section.id}
    >
      <div className="why-us-story-section__copy">
        <div className="why-us-story-section__marker" aria-hidden="true">
          <span>{section.number}</span>
          <i />
        </div>
        <h2>{section.title[locale]}</h2>
        <div className="why-us-story-section__body">
          {section.body[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      <div className="why-us-story-section__visual">
        <WhyUsTrustFrame
          src={section.asset}
          label={section.assetLabel[locale]}
          alt=""
          compact={section.id === "consulting" || section.id === "future"}
        />
      </div>
    </article>
  );
}

