/** Section title + lead paragraph. `dark` switches the pair to the treatment
 *  used on navy sections. */
export default function SectionHeader({
  title,
  lead,
  dark = false,
}: {
  title: string;
  lead: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl mb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-aso-navy"}`}
      >
        {title}
      </h2>
      <p className={`leading-relaxed ${dark ? "text-white/60" : "text-gray-500"}`}>{lead}</p>
    </div>
  );
}
