/* Renders the atlas SVG out of the live page so the diagram can be
 * eyeballed as a raster instead of trusted as a path string. */
const sharp = require("sharp");

(async () => {
  const base = process.env.BASE ?? "http://localhost:3000";
  const res = await fetch(`${base}/atlas`);
  const html = await res.text();

  const vb = html.indexOf('viewBox="40 56 940 730"');
  if (vb === -1) {
    require("fs").writeFileSync("atlas-dump.html", html);
    const svgs = [...html.matchAll(/<svg[^>]{0,90}/g)].map((m) => m[0]);
    console.log("no atlas svg. len", html.length);
    console.log("svg count", svgs.length);
    console.log(svgs.slice(-4).join("\n"));
    console.log("has 'Interoception':", html.includes("Interoception"));
    console.log("has 'Lateral view':", html.includes("Lateral view"));
    throw new Error("atlas svg not found — dumped atlas-dump.html");
  }
  const start = html.lastIndexOf("<svg", vb);
  const end = html.indexOf("</svg>", vb) + 6;
  let svg = html.slice(start, end);

  // Tailwind utility classes mean nothing outside the document.
  svg = svg.replace(/class="[^"]*"/g, "");
  svg = svg.replace("<svg ", '<svg width="1500" height="1165" ');
  svg = svg.replace(/(<svg[^>]*>)/, '$1<rect x="40" y="56" width="940" height="730" fill="#0b0d14"/>');

  await sharp(Buffer.from(svg)).png().toFile("brain-check.png");
  console.log("wrote brain-check.png");
})();
