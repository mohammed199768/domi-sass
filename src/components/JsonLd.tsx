/**
 * JsonLd — reusable server component for structured data.
 *
 * Renders a `<script type="application/ld+json">` tag with safely
 * serialised JSON. Accepts any Schema.org-compliant data object.
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type JsonLdProps = {
  data: Record<string, any> | Record<string, any>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
