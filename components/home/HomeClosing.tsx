import Button from "@/components/Button";
import HomeScene from "./HomeScene";

interface CtaAction {
  label: string;
  href: string;
}

interface HomeClosingProps {
  heading: string;
  body: string;
  primary: CtaAction;
  secondary: CtaAction;
}

/**
 * The homepage's closing call to action, on the dark scene ground.
 *
 * Same structure, copy slots, and actions as the shared ClosingCta, which
 * stays unchanged for every other page. The secondary action uses the
 * navy-surface outline variant because this ground is dark.
 */
export default function HomeClosing({ heading, body, primary, secondary }: HomeClosingProps) {
  return (
    <HomeScene tone="deep" seed={61}>
      <div className="max-w-2xl home-reveal">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
          {heading}
        </h2>
        <p className="text-lg home-copy leading-relaxed mb-10">{body}</p>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href={primary.href} variant="primary" className="home-cta">
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="outline" className="home-ghost">
            {secondary.label}
          </Button>
        </div>
      </div>
    </HomeScene>
  );
}
