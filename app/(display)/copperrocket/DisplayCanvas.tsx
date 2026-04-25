"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import SignupDisplay from "./SignupDisplay";
import NoticePanel from "./NoticePanel";
import CarouselPanel from "./CarouselPanel";

// ─── Canvas geometry ──────────────────────────────────────────────────────────

// Logical display resolution — all layout values are in these coordinates.
const CANVAS_W = 1920;
const CANVAS_H = 1080;

// Safe area inset (px). Keeps content clear of TV overscan on all edges.
const SAFE = 64;

// Left panel (signup queue) width — only rendered for OPEN_MIC screens.
const LEFT_W = 720;

// Gap between left panel and right column
const COL_GAP = 48;

// ─── Background ───────────────────────────────────────────────────────────────

// Set to a URL once a background graphic is ready; empty string uses the fallback.
const GRAPHIC_URL = "";

// ─── Component ────────────────────────────────────────────────────────────────

export default function DisplayCanvas({
  screenSlug = "copperrocket",
  screenType = "OPEN_MIC",
}: {
  screenSlug?: string;
  screenType?: string;
}) {
  // tx/ty: pixel offsets that centre the canvas in the viewport
  // scale: uniform factor so the whole canvas fits the available viewport
  // ready: suppresses the initial flash before JS computes the correct transform
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  const hasQueue = screenType === "OPEN_MIC";

  // Right column geometry: expand to full safe width when there is no queue panel.
  const rightX = hasQueue ? SAFE + LEFT_W + COL_GAP : SAFE;
  const rightW = CANVAS_W - rightX - SAFE;

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

  // Background: use the venue-specific fallback image only for Copper Rocket;
  // other screens get the plain gradient until they configure their own graphic.
  const backgroundImage = GRAPHIC_URL
    ? `linear-gradient(to right, rgba(5,10,20,0.9) 0%, rgba(10,20,30,0.75) 50%, rgba(10,20,30,0.65) 100%), url('${GRAPHIC_URL}')`
    : screenSlug === "copperrocket"
    ? `linear-gradient(to right, rgba(5,10,20,0.85) 0%, rgba(10,20,30,0.70) 45%, rgba(10,20,30,0.58) 100%), url('/logos/CROM_BG.png')`
    : `linear-gradient(to right, rgba(5,10,20,0.85) 0%, rgba(10,20,30,0.70) 45%, rgba(10,20,30,0.58) 100%)`;

  return (
    // Viewport shell — fills the browser window; black bars fill any letterbox areas
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      {/* Fixed 1920×1080 canvas — positioned at (tx, ty) and scaled uniformly */}
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
              backgroundColor: "rgba(5, 15, 28, 0.82)",
              border: "1.5px solid rgba(255,122,26,0.45)",
              overflow: "hidden",
            }}
          >
            <SignupDisplay screenSlug={screenSlug} />
          </div>
        )}

        {/* ── Right: notice → carousel → sponsors ─────────────────────────── */}
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
          <NoticePanel screenSlug={screenSlug} />

          {/* 2. Event identity or carousel */}
          <CarouselPanel screenSlug={screenSlug} />

          {/* 3. CTA row — Website QR | Logo | Tip QR */}
          <div
            style={{
              backgroundColor: "rgba(5, 15, 28, 0.65)",
              border: "1px solid rgba(255,122,26,0.25)",
              borderRadius: 14,
              backdropFilter: "blur(8px)",
              padding: "20px 28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {/* Website QR */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 8, lineHeight: 0 }}>
                <QRCodeSVG
                  value="https://anchorstageops.com"
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

            {/* Center: ASO logo + subtext */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <Image
                src="/logos/aso-logo-white.png"
                alt="AnchorStage Operations"
                width={210}
                height={210}
                style={{ objectFit: "contain" }}
              />
              <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.40)", letterSpacing: "0.05em", textAlign: "center", margin: 0 }}>
                Brought to you by CFAV + AnchorStage Operations
              </p>
            </div>

            {/* Tip QR */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 8, lineHeight: 0 }}>
                <QRCodeSVG
                  value="https://intake.anchorstageops.com/pay?type=tip"
                  size={156}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em", textAlign: "center", margin: 0 }}>
                Scan to tip the crew
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.40)", letterSpacing: "0.04em", textAlign: "center", margin: 0 }}>
                100% goes to the crew
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
