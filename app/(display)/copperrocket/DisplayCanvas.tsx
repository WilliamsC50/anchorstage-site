"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import SignupDisplay from "./SignupDisplay";
import NoticePanel from "./NoticePanel";
import CarouselPanel from "./CarouselPanel";

// ─── Canvas geometry ──────────────────────────────────────────────────────────

const CANVAS_W = 1920;
const CANVAS_H = 1080;
const SAFE = 64;
const LEFT_W = 720;
const COL_GAP = 48;

// ─── Types ────────────────────────────────────────────────────────────────────

type ScreenConfig = {
  display_name: string;
  website_url: string | null;
  tip_url: string | null;
  background_image_url: string | null;
  attribution_text: string | null;
  default_notice: string | null;
  default_subnotice: string | null;
  logo_url: string | null;
  accent_color: string | null;
  secondary_color: string | null;
};

const EMPTY_CONFIG: ScreenConfig = {
  display_name: "",
  website_url: null,
  tip_url: null,
  background_image_url: null,
  attribution_text: null,
  default_notice: null,
  default_subnotice: null,
  logo_url: null,
  accent_color: null,
  secondary_color: null,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DisplayCanvas({
  screenSlug = "copperrocket",
  screenType = "OPEN_MIC",
  screenConfig = EMPTY_CONFIG,
  sessionGraphicUrl = null,
}: {
  screenSlug?: string;
  screenType?: string;
  screenConfig?: ScreenConfig;
  sessionGraphicUrl?: string | null;
}) {
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  const hasQueue = screenType === "OPEN_MIC";

  const rightX = hasQueue ? SAFE + LEFT_W + COL_GAP : SAFE;
  const rightW = CANVAS_W - rightX - SAFE;

  // Per-screen overrides from signage_screen; null preserves the built-in ASO palette.
  const accentColor = screenConfig.accent_color ?? "var(--aso-orange)";
  const secondaryColor = screenConfig.secondary_color ?? "var(--aso-blue-light)";

  useEffect(() => {
    function update() {
      const s = Math.min(
        window.innerWidth / CANVAS_W,
        window.innerHeight / CANVAS_H
      );
      setScale(s);
      setTx((window.innerWidth - CANVAS_W * s) / 2);
      setTy((window.innerHeight - CANVAS_H * s) / 2);
      setReady(true);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // session graphic_url overrides screen background; screen background overrides plain gradient
  const bgUrl = sessionGraphicUrl || screenConfig.background_image_url || null;
  const backgroundImage = bgUrl
    ? `linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.26) 100%), url('${bgUrl}')`
    : `linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.26) 100%)`;

  const hasCta = !!(
    screenConfig.website_url ||
    screenConfig.tip_url ||
    screenConfig.logo_url ||
    screenConfig.attribution_text
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: CANVAS_W,
          height: CANVAS_H,
          transformOrigin: "top left",
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          opacity: ready ? 1 : 0,
          backgroundColor: "#0F2F4F",
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* ── Left: live signup queue (OPEN_MIC only) ──────────────────────── */}
        {hasQueue && (
          <div
            style={{
              position: "absolute",
              left: SAFE,
              top: SAFE,
              width: LEFT_W,
              bottom: SAFE,
              borderRadius: 12,
              backgroundColor: "rgba(0, 0, 0, 0.20)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: `1.5px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
              overflow: "hidden",
            }}
          >
            <SignupDisplay
              screenSlug={screenSlug}
              accentColor={accentColor}
              secondaryColor={secondaryColor}
            />
          </div>
        )}

        {/* ── Right: notice → carousel → CTA ──────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: rightX,
            top: SAFE,
            width: rightW,
            bottom: SAFE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >

          {/* 1. Notice panel */}
          <NoticePanel
            screenSlug={screenSlug}
            defaultNotice={screenConfig.default_notice}
            defaultSubnotice={screenConfig.default_subnotice}
            accentColor={accentColor}
          />

          {/* 2. Carousel */}
          <CarouselPanel
            screenSlug={screenSlug}
            displayName={screenConfig.display_name}
            accentColor={accentColor}
          />

          {/* 3. CTA row — hidden when no config is set */}
          {hasCta && (
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.20)",
                border: `1px solid color-mix(in srgb, ${accentColor} 10%, transparent)`,
                borderRadius: 14,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                padding: "20px 28px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {/* Website QR */}
              {screenConfig.website_url && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 8, lineHeight: 0 }}>
                    <QRCodeSVG
                      value={screenConfig.website_url}
                      size={156}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                    />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em", textAlign: "center", margin: 0 }}>
                    Visit our website
                  </p>
                </div>
              )}

              {/* Center: logo + attribution */}
              {(screenConfig.logo_url || screenConfig.attribution_text) && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    padding: "0 40px",
                    borderLeft: "1px solid rgba(255,255,255,0.12)",
                    borderRight: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {screenConfig.logo_url && (
                    <Image
                      src={screenConfig.logo_url}
                      alt="Logo"
                      width={260}
                      height={260}
                      style={{ objectFit: "contain", position: "relative", top: 48 }}
                    />
                  )}
                  <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.40)", letterSpacing: "0.05em", textAlign: "center", margin: 0, whiteSpace: "nowrap" }}>
                    Presented by Central Florida AV Solutions • Hosted by AnchorStage Operations
                  </p>
                </div>
              )}

              {/* Tip QR */}
              {screenConfig.tip_url && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 8, lineHeight: 0 }}>
                    <QRCodeSVG
                      value={screenConfig.tip_url}
                      size={156}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                    />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em", textAlign: "center", margin: 0 }}>
                    Scan to tip the crew
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
