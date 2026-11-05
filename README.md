# EQUATION WATCH ⏱️📐
### *Haute Horlogerie Mathématique — An Unconventional Interactive Timepiece*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tests-6%20passed%20(100%25)-4E9F3D?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Coverage](https://img.shields.io/badge/Minute%20Coverage-720%2F720%20(100%25)-D4C49B)](https://github.com/TrishikSarkar/Equation-Watch)

> **"Traditional horology obsesses over making time as quick and effortless to read as possible. Equation Watch inverts this philosophy completely: Time is not displayed. Time is calculated."**

---

## 🏛️ The Concept

Inspired by the avant-garde horological concept by **Wraven Labs (@wravenlabs)**, **Equation Watch** is a luxury mechanical wristwatch simulation where traditional hands and conventional digital readouts are replaced by an active mathematical complication across the dial.

To know what time it is, the wearer solves a single-digit algebraic equation whose evaluated result equals the current time:

$$\huge \mathbf{(a \times b \times c + d) \times e + f = \text{Current Time}}$$

Where:
* $a, b, c, d, e, f \in \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$ (six independent single-digit variables).
* The evaluated result corresponds to the standard 12-hour format: $\text{Target} = \text{Hour} \times 100 + \text{Minute}$.
* *Example:* For **10:11**, the watch displays $(4 \times 5 \times 7 + 4) \times 7 + 3 = 1011$.

---

## ✨ Features & Horological Details

### 1. Procedural Grain d'Orge Guilloché Dial
* Generated in real-time via an HTML5 Retina Canvas using true **rose engine lathe mathematics**.
* Concentric sinusoidal ripples interwoven with phase offsets form an authentic, hypnotic barleycorn rosette pattern.
* Dual-pass rendering strokes (engraved shadow groove + metallic specular crest) replicate physical light grazing across engine-turned champagne dials (`#E9DDBD`, `#F8F0DA`, `#D4C49B`).

### 2. Snailing Subdials & Complications
* **Top Subdial (12 o'clock — AM/PM):**
  * Snailing concentric micro-grooves with refined horology typography.
  * Tapered blued/black steel needle automatically flips between `AM` (up) and `PM` (down) based on local time.
* **Bottom Subdial (6 o'clock — Small Seconds):**
  * Snailing finish with 60 graduation ticks (quarter-hour markers, 5-second indicators, fine individual seconds).
  * Lance-style needle seconds hand with circular tail counterweight smoothly sweeping at **60 fps** via `requestAnimationFrame`.

### 3. Mechanical Roller Digit Apertures
* The central equation sits in a beveled champagne cartouche window.
* Each digit ($a$ through $f$) is housed in an independent cutout aperture box.
* Subtle mechanical drum rolling animation when minutes advance, ensuring tactile, satisfying physical transitions without whole-screen flashing.

### 4. Interactive Simulation & Controls
* **Live System Time Sync:** Real-time synchronization with local system clock, including immediate resync on tab visibility change (`visibilitychange`).
* **Time Travel / Calibration Simulator:** Adjust interactive sliders for hours ($1\text{--}12$) and minutes ($0\text{--}59$) or trigger one-click curated presets (including the reference photograph time **10:11 PM**).
* **Step-by-Step Math Inspector:** Interactive modal demonstrating the step-by-step arithmetic proof for the active equation.
* **Studio Lighting Switcher:** Toggle between an Obsidian Dark Luxury Studio and a Warm Ivory Gallery environment.
* **Seconds Hand Toggle:** Pause and resume the continuous seconds sweep for examination.

---

## 🧮 Mathematical Engine & Validation

The mathematical solver ([`src/engine/equationEngine.ts`](src/engine/equationEngine.ts)) uses a deterministic precomputed lookup table scored to maximize aesthetic variety, avoid trivial zeros, and maintain natural ascending factor order ($a \le b \le c$).

### Master Coverage Metrics

| Verification Metric | Target | Result | Status |
|---|---|---|---|
| **12-Hour Clock Coverage** | 720 / 720 minutes ($1\text{:}00$ – $12\text{:}59$) | 720 / 720 | **100% Pass** |
| **Continuous Integer Coverage** | 100 through 1259 (1,160 numbers) | 1,160 / 1,160 | **100% Pass** |
| **Reference Photo Equivalence** | $(4 \times 5 \times 7 + 4) \times 7 + 3 = 1011$ | Target $1011$ | **100% Pass** |
| **Midnight ($12\text{:}00\text{ AM}$)** | Target $1200$ | Target $1200$ | **100% Pass** |
| **Noon ($12\text{:}00\text{ PM}$)** | Target $1200$ | Target $1200$ | **100% Pass** |
| **Variable Bounds** | $a, b, c, d, e, f \in [0..9]$ | Single digits only | **100% Pass** |

Run tests locally:
```bash
npm test
```

---

## 📂 Project Structure

```
Equation-Watch/
├── public/
├── src/
│   ├── components/
│   │   ├── AmPmSubdial.tsx          # 12 o'clock subdial & flipping needle
│   │   ├── EquationDisplay.tsx      # Central cartouche window & rolling digit boxes
│   │   ├── GuillochePattern.tsx     # Procedural Grain d'Orge Canvas engine
│   │   ├── MathExplainerModal.tsx   # Step-by-step arithmetic proof modal
│   │   ├── SecondsSubdial.tsx       # 6 o'clock 60fps sweeping seconds subdial
│   │   ├── WatchCase.tsx            # Stainless steel case, stepped bezel & leather strap
│   │   ├── WatchControls.tsx        # Time travel simulator, presets & theme toggle
│   │   └── WatchDial.tsx            # Main dial face composition
│   ├── engine/
│   │   ├── equationEngine.ts        # Mathematical solver & lookup generator
│   │   └── equationEngine.test.ts   # Automated Vitest verification suite
│   ├── App.tsx                      # Root application & state synchronizer
│   ├── index.css                    # Luxury horology styles & keyframes
│   └── main.tsx                     # React application entrypoint
├── index.html                       # HTML5 template with Cinzel & Cormorant fonts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or later)
* `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TrishikSarkar/Equation-Watch.git
   cd Equation-Watch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:3000](http://localhost:3000).

4. **Run unit tests:**
   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎨 Color Palette

| Swatch | Name | Hex Code | Purpose |
|:---:|---|:---:|---|
| <img src="https://via.placeholder.com/20/E9DDBD/000000?text=+" width="20" height="20" /> | **Dial Base** | `#E9DDBD` | Core dial background tone |
| <img src="https://via.placeholder.com/20/F8F0DA/000000?text=+" width="20" height="20" /> | **Highlight** | `#F8F0DA` | Guilloché crests & subdial centers |
| <img src="https://via.placeholder.com/20/D4C49B/000000?text=+" width="20" height="20" /> | **Subtle Champagne** | `#D4C49B` | Borders, bezels & golden accents |
| <img src="https://via.placeholder.com/20/C7C6C0/000000?text=+" width="20" height="20" /> | **Metallic Silver** | `#C7C6C0` | 316L stainless-steel case & lugs |
| <img src="https://via.placeholder.com/20/171613/000000?text=+" width="20" height="20" /> | **Dark Typography** | `#171613` | High-contrast hands, markers & equation glyphs |
| <img src="https://via.placeholder.com/20/111111/000000?text=+" width="20" height="20" /> | **Deep Black** | `#111111` | Leather strap & deep shadow recesses |

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 💡 Acknowledgements & Credits

* Conceptual watch complication design inspired by **Nathan Clapp / Wraven Labs** ([@wravenlabs](https://www.youtube.com/@wravenlabs)).
* Built with passion for horology, mechanical design, and creative frontend engineering.
