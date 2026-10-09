import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import RevealObserver from "@/components/reveal-observer";
import Footer from "@/components/footer";

/* Bodoni Moda is the display face because the anatomical atlases it
   descends from were set in Didone — Vesalius and Gray engraved and
   lettered plates long before anything was printed photographically.
   Familjen Grotesk carries the interface, and the two are far enough
   apart that a heading never reads as body copy. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://noema-atlas.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Noema — an atlas of the mind",
    template: "%s · Noema",
  },
  description:
    "An interactive atlas of the human brain and mind: 31 cortical and subcortical regions, 12 neurotransmitters, 7 brain networks, 14 landmark experiments, 24 positions on the philosophy of mind, and an honest comparison against artificial intelligence.",
  keywords: [
    "neuroscience",
    "neuroanatomy",
    "brain atlas",
    "psychology",
    "philosophy of mind",
    "consciousness",
    "cognitive bias",
    "AI",
  ],
  authors: [{ name: "Noema" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "Noema — an atlas of the mind",
    description:
      "From the axon up to the argument, and back down to the machine. An interactive atlas of neuroscience, psychology and the philosophy of mind.",
    siteName: "Noema",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noema — an atlas of the mind",
    description:
      "An interactive atlas of the human brain and mind, built from the literature.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodoni.variable} ${familjen.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="hemisphere-wash" aria-hidden />
        <div className="grain" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <RevealObserver />
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
