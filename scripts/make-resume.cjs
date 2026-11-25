// Generates a clean one-page placeholder resume PDF into public/resume.pdf
// Usage: node scripts/make-resume.js
const fs = require("fs");
const path = require("path");

const W = 595.28;
const H = 841.89;
const M = 56;

const esc = (s) =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const out = [];
let y = 792;

function text(str, { size = 9.5, bold = false, color = null, gap = 13, x = M } = {}) {
  if (color) out.push(`${color} rg`);
  out.push(
    `BT /${bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${x} ${y.toFixed(2)} Tm (${esc(str)}) Tj ET`,
  );
  if (color) out.push("0 0 0 rg");
  y -= gap;
}

function rule({ gap = 14, color = "0.75 0.78 0.85" } = {}) {
  out.push(`${color} RG 0.7 w ${M} ${y.toFixed(2)} m ${(W - M).toFixed(2)} ${y.toFixed(2)} l S`);
  y -= gap;
}

function section(label) {
  y -= 6;
  text(label.toUpperCase(), { size: 8.5, bold: true, color: "0.12 0.45 0.42", gap: 12 });
  rule({ gap: 12, color: "0.80 0.83 0.88" });
}

// Draw a label in the left column and wrapped text in the right column,
// keeping both on the same baseline and advancing once.
function row(label, value, { labelWidth = 80, size = 9 } = {}) {
  const baseline = y;
  text(label, { size, bold: true, gap: 0 });
  y = baseline;
  text(value, { size, gap: 13, x: M + labelWidth });
}

// ---- header ----
text("M. HARISH", { size: 26, bold: true, gap: 16 });
text("Frontend Developer  ·  Embedded Systems Enthusiast", {
  size: 11,
  color: "0.18 0.42 0.40",
  gap: 12,
});
text(
  "magesharish002@gmail.com   ·   github.com/magesharish002   ·   linkedin.com/in/your-username   ·   India",
  { size: 8.5, gap: 14 },
);
rule({ gap: 18 });

// ---- profile ----
section("Profile");
[
  "Final-year Computer Science student building responsive, motion-led interfaces with React, GSAP",
  "and Vite. Also works with microcontrollers, sensors and serial protocols, and enjoys projects where",
  "software meets the physical world. Looking for internships or entry-level frontend roles.",
].forEach((line) => text(line, { gap: 12.5 }));

// ---- education ----
section("Education");
text("B.E. Computer Science & Engineering", { size: 10.5, bold: true, gap: 12 });
text("Your College Name  ·  2022 - 2026 (expected)", { size: 9, gap: 12 });
text("Coursework: data structures, operating systems, computer networks, embedded systems.", {
  size: 9,
  gap: 12,
});

// ---- skills ----
section("Technical Skills");
[
  ["Frontend", "React, JavaScript (ES6+), HTML, CSS, GSAP, Vite, responsive UI"],
  ["Languages", "JavaScript, Python, Java, C, Embedded C"],
  ["Embedded", "ESP32, Arduino, STM32, 8051, Raspberry Pi, UART, I2C, SPI, MQTT"],
  ["AI / Data", "Pandas, NumPy, scikit-learn, NLP basics, Matplotlib"],
  ["Tools", "Git, GitHub, VS Code, Figma, PlatformIO"],
].forEach(([label, value]) => row(label, value));

// ---- projects ----
section("Selected Projects");
[
  ["This Portfolio", "React + GSAP portfolio with scroll choreography and an embedded lab."],
  ["Doubt-Solving Chatbot", "NLP assistant with a Python backend and a clean chat interface."],
  ["Smart Room Monitor", "ESP32 sensor node publishing temperature, humidity and motion over MQTT."],
  ["RFID Attendance Desk", "Arduino tap-to-mark attendance unit with LCD feedback and serial logging."],
].forEach(([label, value]) => row(label, value, { labelWidth: 132 }));

// ---- internships ----
section("Internships");
[
  ["Full Stack Development", "2025", "Built and connected small front-end and back-end features."],
  ["Python for Data Science", "2025", "Data cleaning, analysis and visualisation with Pandas and Matplotlib."],
  ["Web Designing", "2024", "Responsive page layouts with a focus on type, spacing and mobile behaviour."],
].forEach(([label, year, value]) => {
  const baseline = y;
  text(label, { size: 9, bold: true, gap: 0 });
  y = baseline;
  text(year, { size: 9, gap: 0, x: W - M - 32 });
  y = baseline;
  text(value, { size: 9, gap: 13, x: M + 132 });
});

// ---- footer ----
y -= 8;
rule({ gap: 14 });
text(
  "Placeholder résumé — replace public/resume.pdf with your real PDF (same filename keeps links working).",
  { size: 8, color: "0.45 0.48 0.55", gap: 10 },
);

// ---- assemble PDF ----
const stream = out.join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];

objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

const target = path.join(__dirname, "..", "public", "resume.pdf");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, Buffer.from(pdf, "latin1"));
console.log(`wrote ${target} (${fs.statSync(target).size} bytes)`);
