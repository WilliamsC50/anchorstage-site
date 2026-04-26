import type { Metadata } from "next";
import DisplayCanvas from "./DisplayCanvas";

export const metadata: Metadata = {
  title: "Copper Rocket Open Mic - AnchorStage",
  description: "Live open mic signup display.",
};

export default function CopperRocketPage() {
  return <DisplayCanvas />;
}
