interface Step {
  step: string;
  title: string;
  desc: string;
}

interface StepListProps {
  steps: Step[];
}

export default function StepList({ steps }: StepListProps) {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {steps.map(({ step, title, desc }) => (
        <div key={step}>
          <p className="text-3xl font-bold mb-4 text-aso-blue">{step}</p>
          <h3 className="text-base font-semibold mb-2 text-aso-navy">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}
