import Image from "next/image";
import WhyChangeDataChart from "./WhyChangeDataChart";
import type { WhyChangeScene } from "./whyChangeScenes";

type Props = { scene: WhyChangeScene; isAr: boolean; index: number };

export default function WhyChangeSceneFrame({ scene, isAr, index }: Props) {
  const local = (copy: { en: string; ar: string }) => copy[isAr ? "ar" : "en"];

  return (
    <article
      className="why-scene"
      data-why-scene
      data-scene-id={scene.id}
      data-layout={scene.layout}
      aria-labelledby={`why-title-${scene.id}`}
    >
      <div className="why-scene__copy">
        <div className="why-scene__index" aria-hidden="true">
          <span>{scene.number}</span><i />
        </div>
        <p className="why-scene__eyebrow">{local(scene.eyebrow)}</p>
        <h2 id={`why-title-${scene.id}`}>{local(scene.title)}</h2>
        <p className="why-scene__body">{local(scene.body)}</p>
        {scene.stat && (
          <div className="why-scene__stat" data-stat>
            <strong>{local(scene.stat)}</strong>
            {scene.statDetail && <span>{local(scene.statDetail)}</span>}
          </div>
        )}
        {scene.bullets && (
          <ul className="why-scene__bullets">
            {scene.bullets.map((bullet) => <li key={bullet.en}>{local(bullet)}</li>)}
          </ul>
        )}
      </div>

      <div className="why-scene__visual" aria-label={isAr ? "مشهد بصري وبيانات" : "Visual scene and data"}>
        <svg className="why-scene__guide" viewBox="0 0 640 430" aria-hidden="true">
          <path data-scene-guide pathLength="1" d="M18 332 C112 250 132 92 268 82 S454 162 614 36" />
          <path data-anime-arrow className="why-scene__guide-arrow" d="M600 28l16 8-8 16" />
        </svg>
        <div className="why-scene__frame" aria-hidden="true">
          <span className="why-frame-corner why-frame-corner--a" />
          <span className="why-frame-corner why-frame-corner--b" />
          <span className="why-frame-scanline" />
          {scene.asset && (
            <Image
              src={scene.asset}
              alt=""
              width={580}
              height={360}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="why-scene__asset"
            />
          )}
          {!scene.asset && (
            <div className="why-frame-statement">
              <span>{isAr ? "الانتباه" : "ATTENTION"}</span>
              <i aria-hidden="true" />
              <strong>{isAr ? "ليس النتيجة" : "IS NOT THE OUTCOME"}</strong>
            </div>
          )}
          <div className="why-frame-meta"><span>DOMINASE / {scene.number}</span><span>{scene.id.toUpperCase()}</span></div>
        </div>
        <div className="why-scene__chart" data-chart>
          <WhyChangeDataChart type={scene.chart} isAr={isAr} />
        </div>
      </div>
    </article>
  );
}
