import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import RegionCompare from "@/components/region-compare";

export const metadata: Metadata = {
  title: "Compare regions",
  description:
    "Put any two of the 31 regions side by side: division, hemisphere, functions, lesion profile, and shared vocabulary.",
};

export default function ComparePage() {
  return (
    <main>
      <PageHeader
        over="tool"
        title="Compare regions"
        lede="Put any two of the 31 regions side by side — division, hemisphere, the functions each is credited with, the lesion profile, and the words their descriptions share."
        note="The pair lives in the URL, so any comparison can be linked and shared."
        stats={[
          ["31", "regions"],
          ["465", "possible pairs"],
          ["4", "attributes diffed"],
          ["client-side", "no state sent"],
        ]}
        chips={["comparison", "atlas", "tool"]}
        s="gfp"
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <RegionCompare />
        </div>
      </section>
    </main>
  );
}