import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Timeline from "@/components/timeline";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key moments that built modern neuroscience",
};

export default function TimelinePage() {
  return (
    <main>
      <PageHeader
        over="register nine · History of the field"
        title="Timeline"
        lede="Sixteen landmarks from Galen to the present — how the picture came together."
        note="Ideas rarely arrive cleanly. Most were resisted before becoming obvious."
        stats={[
          ["16", "landmarks"],
          ["~1800", "years span"],
          ["empirical", "shift over time"],
          ["still", "unfolding"],
        ]}
        chips={["history", "methods", "paradigms"]}
        s="golgi"
      />
      <section className="px-5 py-16 md:px-10 md:py-24">
        <Timeline />
      </section>
    </main>
  );
}
