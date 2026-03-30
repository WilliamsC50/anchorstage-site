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

// Left panel (signup queue) width
const LEFT_W = 720;

// Gap between left panel and right column
const COL_GAP = 48;

// Derived: right column origin and width
const RIGHT_X = SAFE + LEFT_W + COL_GAP; // 832
const RIGHT_W = CANVAS_W - RIGHT_X - SAFE; // 1024

// ─── Background ───────────────────────────────────────────────────────────────

// Set to a URL once a background graphic is ready; empty string uses the fallback.
const GRAPHIC_URL = "";

// ─── Component ────────────────────────────────────────────────────────────────

export default function DisplayCanvas() {
  // tx/ty: pixel offsets that centre the canvas in the viewport
  // scale: uniform factor so the whole canvas fits the available viewport
  // ready: suppresses the initial flash before JS computes the correct transform
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

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
          backgroundImage: GRAPHIC_URL
            ? `linear-gradient(to right, rgba(5,10,20,0.9) 0%, rgba(10,20,30,0.75) 50%, rgba(10,20,30,0.65) 100%), url('${GRAPHIC_URL}')`
            : `linear-gradient(to right, rgba(5,10,20,0.85) 0%, rgba(10,20,30,0.70) 45%, rgba(10,20,30,0.58) 100%), url('/logos/CROM_BG.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* ── Left: live signup queue ──────────────────────────────────────── */}
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
          <SignupDisplay />
        </div>

        {/* ── Right: notice → carousel → sponsors ─────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: RIGHT_X,
            top: SAFE,
            width: RIGHT_W,
            bottom: SAFE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >

          {/* 1. Notice panel */}
          <NoticePanel />

          {/* 2. Event identity or carousel */}
          <CarouselPanel />

          {/* 3. CTA row — Logo + QR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p
              className="font-semibold text-white"
              style={{ fontSize: 15, letterSpacing: "0.06em", opacity: 0.60, textAlign: "center" }}
            >
              Scan the QR below to visit AnchorStageOps.com!
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              {/* ASO logo */}
              <Image
                src="/logos/aso-logo-white.png"
                alt="AnchorStage Operations"
                width={178}
                height={178}
                style={{ objectFit: "contain" }}
              />

              {/* QR code */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: 12,
                  borderRadius: 8,
                  lineHeight: 0,
                }}
              >
                <QRCodeSVG
                  value="https://anchorstageops.com"
                  size={198}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
