# OpenPOSN (`pblphyexe`) — สอวน. ฟิสิกส์ เพื่อทุกคน

A 100% free, open-access, mobile-first web learning platform for **Thailand POSN Physics Olympiad (สอวน. ฟิสิกส์)** students, built with an academic LaTeX monograph aesthetic (**Computer Modern** + **Noto Serif Thai**, crisp KaTeX typesetting, Archival Paper light mode, and Slate Blackboard dark mode).

---

## Core Mission & Learning Design

OpenPOSN bridges standard Thai high school physics and Olympiad-level first-principles reasoning without hiding behind superficial formula shortcuts:

- **3-Level Drill-Down Navigation:** Browse chapters in the Table of Contents -> open a dedicated **Chapter Subsections Page** -> study individual lessons with interactive visual labs, step-by-step derivations, and Olympiad problems.
- **Step-by-Step Derivation Engine:** Calculus and algebraic derivations broken into bite-sized steps with collapsible **Physical Intuition**, **Math Technique**, and **Guided Step-by-Step** controls.
- **3-Tier Scaffolded POSN Problems:** Every practice problem includes progressive hints (*Physical Model -> Governing Equations -> Mathematical Trick*), complete worked solutions, and self-verification MCQ checks.
- **Study Companion & Formula Sheet:** Resume next unstudied lessons, review key concepts with the `QuickReviewDeck` flashcards, bookmark derivations offline (IndexedDB / `zustand`), and browse the searchable 44-formula quick reference modal.

---

## Dual-Track Curriculum

**Total Platform Coverage:** 12 Chapters • 36 Lessons • 45 Step-by-Step Derivations • 33 Scaffolded Problems • 13 Interactive Physics Labs

### Track 1: Pre-Camp 1 Entrance (`pre-camp-1`)
Covers all **28 official POSN Camp 1 Entrance Exam syllabus items** using intuitive visual physics and algebra:
- **4 Chapters • 14 Lessons • 14 Derivations • 14 Entrance Problems**
  1. **Mechanics (`pre-mechanics`)**: SI unit conversions, Newton's laws, static vs kinetic friction wedges, independent-axis projectile kinematics, momentum & mechanical energy conservation, circular motion & static torque equilibrium.
  2. **Fluids & Thermodynamics (`pre-fluids-thermo`)**: Hydrostatics & Bernoulli's equation, steady-state thermal conduction & linear expansion, ideal gas kinetic theory, equipartition theorem, and the 1st Law of Thermodynamics.
  3. **Electricity & Magnetism (`pre-em`)**: Electrostatics, parallel-plate capacitors & field energy density, DC circuits & $R$-$C$ limits ($t = 0^+$, $t \to \infty$), magnetic fields from wires & circular arcs, Faraday–Lenz induction, inductors, and Maxwell waves.
  4. **Geometrical Optics (`pre-optics`)**: Reflection & spherical mirrors, Snell's law, total internal reflection & Brewster's angle, thin lenses, and combined multi-element mirror–lens optical systems.
- **9 Interactive SVG Labs (`src/components/interactive/PreCampVisualLabs.tsx`):** `incline-wedge`, `projectile-collision`, `circular-equilibrium`, `bernoulli-pipe`, `temperature-box`, `electric-capacitor`, `rc-circuit-box`, `magnetic-wire`, and `optics-ray-tracer` — each paired with exam observations & shortcuts.

### Track 2: Camp 1 -> Camp 2 Calculus Mechanics (`camp-1-2`)
Full calculus-based Olympiad mechanics modeled after POSN Camp 1–2 curricula and Kleppner & Kolenkow (*An Introduction to Mechanics*):
- **8 Chapters • 22 Lessons • 31 Derivations • 19 Olympiad Problems**
  1. Mathematical Tools & Vector Calculus (`math-tools`)
  2. Kinematics in Polar & Curvilinear Coordinates (`kinematics-calculus`)
  3. Newton's Laws, Constraints & Capstan Friction (`newton-constraints`)
  4. Linear Momentum, Collisions & Variable Mass Rockets (`momentum-variable-mass`)
  5. 3D Work–Energy Theorem, Potential Wells & Reduced Mass (`work-energy-potentials`)
  6. Rigid Body Rotation, Moment of Inertia & Euler/Gyroscope Dynamics (`rotation-dynamics`)
  7. Non-Inertial Frames, Coriolis Forces & Central Force Orbits (`non-inertial-central-force`)
  8. Simple Harmonic, Damped & Coupled Oscillations (`shm-differential-eq`)
- **4 Interactive Calculus Micro-Labs** (`derivative-slope`, `integral-work`, `potential-well`, `shm-resonance`) plus the **Interactive Rigid Body Rotation Simulation Lab** (`src/components/simulation/RigidBodySimulationView.tsx`).

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 with Archival Paper / Slate Blackboard CSS theme tokens
- **Math Rendering:** KaTeX (`katex`) with custom `AcademicMarkdown` and `FormattedMathText` components
- **State Persistence:** Zustand (`zustand`) + IndexedDB (`idb-keyval`)
- **Icons:** `lucide-react`

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build
npm run start
```
