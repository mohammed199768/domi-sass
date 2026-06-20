import type { WhyUsProcessStep } from "./whyUsContent";

export default function WhyUsProcessRail({ steps, isAr }: { steps: WhyUsProcessStep[]; isAr: boolean }) {
  const locale = isAr ? "ar" : "en";

  return (
    <div className="why-us-process-rail">
      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          data-process-path
          pathLength="1"
          d="M35 60 C155 20 205 100 340 60 S535 20 660 60 825 100 965 60"
        />
        {steps.map((step, index) => (
          <circle
            key={step.title.en}
            data-process-node
            cx={35 + index * 186}
            cy={index % 2 === 0 ? 60 : 53}
            r="7"
          />
        ))}
      </svg>

      <ol>
        {steps.map((step, index) => (
          <li key={step.title.en} data-process-step data-why-us-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title[locale]}</h3>
            <p>{step.body[locale]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

