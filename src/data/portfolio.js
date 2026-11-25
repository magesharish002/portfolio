/* ------------------------------------------------------------------
   EDIT EVERYTHING HERE.
   This is the only content file you need to touch for text, links,
   projects, skills, boards and the terminal log.
   Anything marked "your-..." / "Your ..." is a placeholder.
------------------------------------------------------------------- */

export const profile = {
  name: "M. Harish",
  displayName: "HARISH",
  initial: "M.",
  initials: "MH",
  roles: ["Frontend Developer", "Embedded Enthusiast", "AI Explorer"],
  tagline:
    "I build fast, expressive interfaces — and make hardware blink on the side.",
  heroCopy:
    "Final-year Computer Science student crafting responsive web experiences with React and GSAP, with a soft spot for sensors, firmware and things that light up.",
  availability: "Open to internships & entry-level roles",
  location: "India",
  email: "magesharish002@gmail.com",
  phone: "+91 90251 74963",
  phoneHref: "tel:+919025174963",
  resumeUrl: "resume.pdf",
  socials: [
    {
      label: "GitHub",
      handle: "@magesharish002",
      href: "https://github.com/magesharish002",
    },
    {
      label: "LinkedIn",
      handle: "in/your-username",
      href: "https://www.linkedin.com/in/your-username",
    },
    {
      label: "Email",
      handle: "magesharish002@gmail.com",
      href: "mailto:magesharish002@gmail.com",
    },
  ],
};

export const heroMeta = {
  based: "India",
  focus: "Frontend × Embedded",
  year: "2026",
};

export const about = {
  statement:
    "I'm **M. Harish**, a final-year Computer Science student who builds responsive, motion-led interfaces with **React** — and spends the rest of the time wiring **sensors, boards and firmware**. I like work where design meets engineering: something you can see, feel, and occasionally debug with a multimeter.",
  status: "Open to internships",
  currently: [
    { label: "Status", value: "Open to internships" },
    { label: "Focus", value: "Frontend + embedded" },
    { label: "Learning", value: "FreeRTOS · STM32" },
    { label: "Based in", value: "India" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Projects built" },
    { value: 3, suffix: "", label: "Internships" },
    { value: 5, suffix: "", label: "Boards explored" },
    { value: 12, suffix: "+", label: "Tools in the kit" },
  ],
  education: {
    period: "2022 — 2026",
    type: "Education",
    title: "B.E. Computer Science & Engineering",
    org: "Your College Name",
    description:
      "Final-year student. Coursework across data structures, operating systems, computer networks and embedded systems — with most of the real learning happening in side projects.",
    tags: ["CSE", "Final year", "2026"],
  },
};

export const skills = {
  intro:
    "A rough map of where I'm at. The percentages are self-assessed, not a certificate — the projects are the real proof.",
  core: [
    { name: "React", level: 85, note: "interfaces & state" },
    { name: "JavaScript", level: 85, note: "ES6+, DOM, APIs" },
    { name: "HTML & CSS", level: 90, note: "responsive, accessible" },
    { name: "GSAP", level: 80, note: "timelines & scroll" },
    { name: "Python", level: 88, note: "data & AI experiments" },
    { name: "Java", level: 85, note: "OOP fundamentals" },
  ],
  learning: ["FreeRTOS", "STM32 registers", "Motion design"],
  toolbox: [
    {
      label: "Languages",
      items: ["JavaScript", "Python", "Java", "C", "Embedded C"],
    },
    {
      label: "Frontend",
      items: ["React", "Vite", "GSAP", "HTML", "CSS", "REST APIs"],
    },
    {
      label: "AI / Data",
      items: ["NLP", "Pandas", "NumPy", "scikit-learn", "Matplotlib"],
    },
    {
      label: "Workflow",
      items: ["Git", "GitHub", "VS Code", "Figma", "PlatformIO"],
    },
  ],
  marquee: [
    "React",
    "GSAP",
    "JavaScript",
    "Python",
    "Embedded C",
    "HTML",
    "CSS",
    "Vite",
    "Git",
    "Figma",
    "MQTT",
    "UART",
  ],
};

export const embedded = {
  intro:
    "The other half of the desk: a breadboard, a few dev boards and a serial monitor that never stays quiet. I'm interested in the layer where software meets the physical world.",
  signalChain: ["Sense", "Condition", "Process", "Transmit", "Act"],
  stack: [
    { name: "C", learning: false },
    { name: "Embedded C", learning: false },
    { name: "Arduino", learning: false },
    { name: "ESP32", learning: false },
    { name: "PlatformIO", learning: false },
    { name: "UART", learning: false },
    { name: "I2C", learning: false },
    { name: "SPI", learning: false },
    { name: "MQTT", learning: false },
    { name: "FreeRTOS", learning: true },
    { name: "KiCad", learning: true },
    { name: "Linux", learning: false },
  ],
  boards: [
    {
      name: "ESP32",
      chip: "Xtensa LX6",
      status: "Comfortable",
      level: 4,
      blurb:
        "Wi-Fi + BLE firmware for sensor nodes, MQTT telemetry and small local dashboards.",
      tags: ["Arduino core", "MQTT", "Deep sleep"],
    },
    {
      name: "Arduino Uno",
      chip: "ATmega328P",
      status: "Comfortable",
      level: 4,
      blurb:
        "Fast prototyping with sensors, displays and actuators — usually the first board on the bench.",
      tags: ["Sensors", "LCD", "Servo"],
    },
    {
      name: "STM32",
      chip: "ARM Cortex-M",
      status: "Exploring",
      level: 3,
      blurb:
        "Bare-metal experiments with GPIO, timers and interrupts; currently getting comfortable with the HAL.",
      tags: ["Bare metal", "Timers", "HAL"],
    },
    {
      name: "8051",
      chip: "AT89S52",
      status: "Learning",
      level: 2,
      blurb:
        "Register-level fundamentals: ports, timers and serial communication from the ground up.",
      tags: ["Assembly basics", "Timers", "UART"],
    },
    {
      name: "Raspberry Pi",
      chip: "Linux SBC",
      status: "Comfortable",
      level: 3,
      blurb:
        "Python scripts, GPIO tinkering and lightweight local servers for connected projects.",
      tags: ["Python", "GPIO", "Linux"],
    },
  ],
  terminal: {
    title: "minicom — /dev/ttyUSB0 — 115200",
    lines: [
      { t: "00:00.1", kind: "boot", text: "boot: esp32-devkit-v1 · 240 MHz" },
      { t: "00:00.3", kind: "info", text: "flash: 4 MB · free heap 284 KB" },
      { t: "00:00.7", kind: "ok", text: "wifi: connected · rssi -54 dBm" },
      { t: "00:00.9", kind: "ok", text: "mqtt: broker.lan:1883 · subscribed" },
      { t: "00:01.4", kind: "info", text: "dht22: 27.4 °C · 61 % RH" },
      { t: "00:01.6", kind: "info", text: "mpu6050: gyro calibrated" },
      { t: "00:02.1", kind: "warn", text: "ldr: 42 lx · dimming oled" },
      { t: "00:02.4", kind: "ok", text: "publish → home/lab/telemetry" },
    ],
    prompt: "harish@lab:~$",
    live: 'dht22.read() → {"temp":27.4,"rh":61}',
  },
  marquee: ["ESP32", "I2C", "MQTT", "UART", "Firmware", "GPIO", "Sensors", "C"],
};

export const projectFilters = ["All", "Web", "AI", "Embedded"];

export const projects = [
  {
    id: "portfolio",
    index: "01",
    title: "This Portfolio",
    category: "Web",
    year: "2026",
    description:
      "A fully custom portfolio built from scratch: a GSAP-driven intro, scroll choreography, a filterable work grid and an embedded lab — no templates.",
    tags: ["React", "GSAP", "Vite", "CSS"],
    link: "https://github.com/your-username",
    linkLabel: "View source",
    featured: true,
    visual: { from: "#3ff0dd", to: "#8b7bff", glyph: "{ }" },
  },
  {
    id: "doubtbot",
    index: "02",
    title: "Doubt-Solving Chatbot",
    category: "AI",
    year: "2025",
    description:
      "An NLP-powered assistant that answers student questions in natural language, with a clean chat interface and a Python backend.",
    tags: ["Python", "NLP", "Flask", "JavaScript"],
    link: "https://github.com/your-username",
    linkLabel: "View project",
    featured: false,
    visual: { from: "#8b7bff", to: "#ff6ec7", glyph: "⌁" },
  },
  {
    id: "ai-lab",
    index: "03",
    title: "AI for Real-World Problems",
    category: "AI",
    year: "2025",
    description:
      "An applied machine-learning build for a real-world problem — from dataset cleaning to a working prediction flow and a simple interface.",
    tags: ["Python", "scikit-learn", "Pandas", "Machine Learning"],
    link: "https://github.com/your-username",
    linkLabel: "View project",
    featured: false,
    visual: { from: "#62d0ff", to: "#3ff0dd", glyph: "∿" },
  },
  {
    id: "room-monitor",
    index: "04",
    title: "Smart Room Monitor",
    category: "Embedded",
    year: "2025",
    description:
      "An ESP32 node that reads temperature, humidity and motion, pushes telemetry over MQTT and shows live values on an OLED.",
    tags: ["ESP32", "DHT22", "MQTT", "OLED"],
    link: "https://github.com/your-username",
    linkLabel: "View build",
    featured: false,
    visual: { from: "#7cf7a0", to: "#3ff0dd", glyph: "▤" },
  },
  {
    id: "rfid-attendance",
    index: "05",
    title: "RFID Attendance Desk",
    category: "Embedded",
    year: "2024",
    description:
      "A tap-to-mark attendance unit built on Arduino with an RFID reader, LCD feedback and a simple serial log of every check-in.",
    tags: ["Arduino", "RFID", "C++", "LCD"],
    link: "https://github.com/your-username",
    linkLabel: "View build",
    featured: false,
    visual: { from: "#ffb86b", to: "#ff6ec7", glyph: "◉" },
  },
];

export const experience = [
  {
    period: "2025",
    type: "Internship",
    title: "Full Stack Development",
    org: "",
    description:
      "Built and connected small front-end and back-end features, and learned how a real product moves from ticket to deploy.",
    tags: ["React", "Node", "REST APIs", "Git"],
  },
  {
    period: "2025",
    type: "Internship",
    title: "Python for Data Science",
    org: "",
    description:
      "Explored data cleaning, analysis and visualisation with Python — turning messy CSV files into charts that tell a story.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    period: "2024",
    type: "Internship",
    title: "Web Designing",
    org: "",
    description:
      "Designed and coded responsive page layouts, focusing on typography, spacing and mobile-first behaviour.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
  },
];

export const contact = {
  kicker: "Available for work",
  titleLines: ["Let's build", "something that"],
  titleAccent: "moves.",
  copy:
    "I'm looking for internships, entry-level frontend roles and embedded side quests. If you have something interesting — or just want to compare notes on GSAP and GPIO — my inbox is open.",
  response: "Usually replies within a day",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Lab", href: "#lab" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
