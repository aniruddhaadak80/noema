export default function Loading() {
  return (
    <section className="flex min-h-[40vh] items-center justify-center px-5 pt-32 md:px-10">
      <span
        aria-hidden
        className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-bone"
      />
    </section>
  );
}
