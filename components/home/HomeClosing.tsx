import Button from "@/components/Button";
import FreeBadge from "@/components/FreeBadge";
import GatewayMonument from "./GatewayMonument";
import HomeScene from "./HomeScene";

interface CtaAction {
  label: string;
  href: string;
  /** Registration actions carry the shared FREE badge (lib/registration.ts). */
  freeBadge?: boolean;
}

interface HomeClosingProps {
  eyebrow: string;
  heading: string;
  body: string;
  primary: CtaAction;
}

/**
 * Scene 6, the gateway: the homepage's closing invitation, in front of the
 * AnchorStage Ops anchor rising as a monument from the horizon
 * (GatewayMonument). One action only.
 *
 * Desktop (lg, landscape): copy on the left, the monument dominant on the
 * right. Otherwise (phones, tablets, tall portrait screens) the copy leads
 * and the monument stands in the room left below it (.gw-room), so it never
 * sits behind the text.
 */
export default function HomeClosing({ eyebrow, heading, body, primary }: HomeClosingProps) {
  return (
    <HomeScene tone="deep" seed={61} rings={false} backdrop={<GatewayMonument />} className="home-gateway">
      <div className="gw-copy max-w-xl">
        <div className="flex items-center gap-3 mb-6">
          <span aria-hidden="true" className="h-px w-8 bg-aso-orange" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aso-orange">{eyebrow}</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6">
          {heading}
        </h2>
        <p className="text-lg md:text-xl home-copy leading-relaxed mb-10 max-w-lg">{body}</p>
        <Button href={primary.href} variant="primary" className="home-cta">
          {primary.label}
          {primary.freeBadge && <FreeBadge />}
        </Button>
      </div>
      <div aria-hidden="true" className="gw-room" />
    </HomeScene>
  );
}
