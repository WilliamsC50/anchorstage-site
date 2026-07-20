import { isValidElement, type ReactNode } from "react";
import Button from "./Button";
import Section from "./Section";

interface CtaAction {
  label: string;
  href: string;
}

interface ClosingCtaProps {
  heading: string;
  body: string;
  primary: CtaAction;
  /** A link action (label + href) or a custom trigger, e.g. the About
   *  contact dialog button. */
  secondary: CtaAction | ReactNode;
}

function isAction(value: CtaAction | ReactNode): value is CtaAction {
  return (
    typeof value === "object" &&
    value !== null &&
    !isValidElement(value) &&
    "href" in value &&
    "label" in value
  );
}

/**
 * The shared closing section that sits immediately before the footer on every
 * marketing page: solid white surface, navy heading, and a two-action button
 * row that stacks on narrow mobile and sits inline from sm up.
 */
export default function ClosingCta({ heading, body, primary, secondary }: ClosingCtaProps) {
  return (
    <Section background="white">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-aso-navy tracking-tight mb-6">
          {heading}
        </h2>
        <p className="text-lg text-gray-500 leading-relaxed mb-10">{body}</p>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {isAction(secondary) ? (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          ) : (
            secondary
          )}
        </div>
      </div>
    </Section>
  );
}
