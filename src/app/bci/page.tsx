import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import BciDemo from "@/components/bci-demo";

export const metadata: Metadata = {
  title: "Brain–Computer Interface",
  description: "Simulated real-time EEG classification of imagined movement.",
};

export default function BciPage() {
  return (
    <main>
      <PageHeader
        over="register nine · emerging neurotechnology"
        title="Brain–Computer Interface"
        lede="A simulated EEG cap with ten channels and a classifier that follows imagined movement. The loop — sense, interpret, act — is real; the numbers here are illustrative."
        note="No signal leaves this page. Everything runs client-side and stays in your browser."
        stats={[
          ["10", "channels"],
          ["~60 Hz", "update rate"],
          ["simulated", "signal only"],
          ["client-side", "nothing stored"],
        ]}
        chips={["neurotechnology", "bci", "simulation"]}
        s="golgi"
      />

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <BciDemo />
        </div>
      </section>
    </main>
  );
}
