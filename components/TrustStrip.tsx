interface TrustItem {
  title: string;
  desc: string;
}

interface TrustStripProps {
  items: TrustItem[];
}

export default function TrustStrip({ items }: TrustStripProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
      {items.map(({ title, desc }) => (
        <div key={title}>
          <p className="text-sm font-semibold mb-1 text-aso-navy">{title}</p>
          <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}
