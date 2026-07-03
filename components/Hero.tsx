import Image from "next/image";
import type { ReactNode } from "react";
import Button from "./Button";
import type { NavItem } from "@/lib/content-types";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: NavItem;
  secondaryCta?: NavItem;
  variant?: "image" | "split";
  backgroundImage?: string;
  media?: ReactNode;
  logo?: string;
}

export default function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "image",
  backgroundImage,
  media,
  logo,
}: HeroProps) {
  if (variant === "split") {
    return (
      <section className="relative overflow-hidden bg-gray-950">
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 720px 520px at 82% -8%, rgba(145, 205, 255, 0.20) 0%, rgba(70, 135, 200, 0.12) 28%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {eyebrow && (
                <p className="text-xs font-semibold tracking-widest uppercase mb-5 text-aso-blue-light/80">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-white">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-white/70 mb-10 leading-relaxed">{description}</p>
              )}
              <div className="flex flex-wrap gap-4">
                {primaryCta && (
                  <Button href={primaryCta.href} variant="primary">
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="outline">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>

            <div
              className="relative rounded-2xl overflow-hidden bg-aso-navy"
              style={{ aspectRatio: "16 / 9" }}
            >
              {media}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
      style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.52) 100%)",
        }}
      />
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 text-center">
          {logo && (
            <div className="flex justify-center mb-10">
              <Image
                src={logo}
                alt="AnchorStage Operations"
                width={220}
                height={194}
                className="w-[110px] md:w-[150px] lg:w-[220px] h-auto object-contain opacity-90"
              />
            </div>
          )}
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase mb-5 text-white/60">
              {eyebrow}
            </p>
          )}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white max-w-3xl mx-auto">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
