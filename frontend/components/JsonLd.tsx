// Renders a <script type="application/ld+json"> tag. Kept as a single tiny
// component rather than inlining this everywhere a page needs structured
// data, so every usage is guaranteed well-formed and consistently escaped.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
