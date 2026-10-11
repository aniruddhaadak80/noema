import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import Quiz from "@/components/quiz";

export const metadata: Metadata = {
  title: "Recall",
  description:
    "Test yourself on the atlas: regions, transmitters, networks, biases, experiments and positions, with distractors drawn from the same category and every answer linked back to its entry.",
};

export default function RecallPage() {
  return (
    <>
      <PageHeader
        over="A tool, not a register"
        s="melanin"
        title={
          <>
            Read it,
            <br />
            <span className="italic text-melanin">then prove it</span>
          </>
        }
        lede="Retrieval practice beats re-exposure for long-term retention — that is the testing effect, and it is on the mind page. This is the atlas applying its own advice: every question is generated from the entries themselves, the wrong answers are always plausible, and each explanation links back to where the fact lives."
        stats={[
          ["8", "questions per round"],
          ["5", "modes"],
          ["130+", "questions in the bank"],
          ["4", "options each, keys 1–4"],
          ["1", "device keeps your best"],
          ["0", "accounts, tracking, fuss"],
        ]}
        note="Best scores are stored in this browser only, per mode. Nothing leaves the device."
        chips={["Atlas", "Circuits", "Mind", "Questions", "Mixed"]}
      />

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Quiz />
        </div>
      </section>
    </>
  );
}
