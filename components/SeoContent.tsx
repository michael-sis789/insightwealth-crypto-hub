export function SeoContent({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="prose-finance mt-12 max-w-4xl">
      <h2>{title}</h2>
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </section>
  );
}
