export function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
