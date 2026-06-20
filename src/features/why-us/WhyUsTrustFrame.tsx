import Image from "next/image";

type Props = {
  src: string;
  label: string;
  alt: string;
  priority?: boolean;
  compact?: boolean;
};

export default function WhyUsTrustFrame({ src, label, alt, priority = false, compact = false }: Props) {
  return (
    <figure className={compact ? "why-us-frame why-us-frame--compact" : "why-us-frame"} data-why-us-frame>
      <span className="why-us-frame__corner why-us-frame__corner--a" aria-hidden="true" />
      <span className="why-us-frame__corner why-us-frame__corner--b" aria-hidden="true" />
      <span className="why-us-frame__signal" aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        width={720}
        height={560}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="why-us-frame__image"
      />
      <figcaption>
        <span>DOMINASE / GUIDE</span>
        <strong>{label}</strong>
      </figcaption>
    </figure>
  );
}

