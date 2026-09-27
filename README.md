# Seven Generations in Orbit

**A Framework for Responsible Debris Prioritization** — with a companion interactive prototype.

Built for **YOHAKU Challenge 2: Seven Generations in Orbit**, led by James Rattling
Leaf Sr., Phil Two Eagle & Diana Mastracci (GEO Indigenous Alliance, Peta Omniciye, Inc. ×
Space4Innovation). Author: Sahara Al-Madi, Linguistic Security Institute.

## What this is

The main deliverable is **`FRAMEWORK.md`** — a framework that organizes debris
prioritization around seven questions drawn from the principles shared in the
Challenge 2 materials (Mitákuye Oyás'iŋ, Škaŋ, relationship with the stars,
Seven Generations analysis) and from NARETU, the obligation-based governance
framework developed by Chief Titus Letaapo. Each question names what is owed,
to whom, across what time — and commits a decision tool to a behavior.

The companion prototype (`index.html`) puts the framework into practice:

- Six real tracked objects from the challenge dataset, each shown with a
  **relationship map** — cluster, neighbours, operators, affected communities.
- The seven questions, one at a time, each carrying its principle and its obligation.
- A ranking that **shows its reasoning per question**, marks fragile verdicts,
  and **carries forward obligations** it cannot yet fulfill instead of dropping them.
- **One decision, two horizons** — today's ranking beside the ranking seven
  generations from now, with the shifts named in plain language.
- An **authority gate**: if standing to decide has not been established
  (Question 7), the tool refuses to produce a ranking. One instruction:
  convene the affected parties. No score, no recommendation, no workaround.

The tool is a helper, not a decider. The obligations remain visible. The human
remains accountable.

## How to run

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server   # → http://localhost:8000
```

## Repository layout

```
seven-generations-orbit/
├── FRAMEWORK.md      ← the framework (main deliverable)
├── README.md         ← this file
├── LICENSE           ← MIT (code only; ICIP carve-out)
├── index.html        ← the companion prototype
├── styles.css
└── js/
    ├── data.js       ← six objects, verbatim from the Challenge 2 booklet
    ├── questions.js  ← the seven questions + relationship map data
    ├── scoring.js    ← emphasis, horizon model, fragility, authority gate
    ├── sky.js        ← canvas: Earth, starfield, debris, gathering future
    └── app.js        ← four screens, all framework commitments kept
```

## The dataset

Six objects from the challenge booklet — ENVISAT (27386), SL-16 R/B (28353),
SL-16 R/B (19120), H-2 R/B (24279), SL-8 R/B (16292), SL-8 R/B (8344) — drawn
from McKnight et al. (2021, *Acta Astronautica*) as provided in the Challenge 2
materials, cross-checked against the ESA Space Environment Report. Dimension
scores and decay estimates are deliberation starters, not measurements.

## AI-use disclosure

Per the YOHAKU booklet's four points:

- **Tools used:** Kimi (Moonshot AI) , Deepseek
- **What for:** organizing this repository (folders, files, documentation
  structure); editing and structuring the framework document; scaffolding the
  prototype's user interface; testing the demo.
- **Independently checked:** all dataset facts against the Challenge 2
  materials (McKnight et al., 2021; ESA Space Environment Report); all
  references to Lakota principles and NARETU against the Participant Booklet.
- **Did AI contribute directly to the solution or decision-making system?**
  No. The framework's ideas — the seven questions, the principle mappings, the
  constraint-based treatment of authority, the decision to end in deliberation
  rather than verdict — are the author's original work at the Linguistic
  Security Institute. AI contributed execution support, not decision logic.

AI was not used to fabricate sources or community positions, reconstruct
restricted or unshared Indigenous knowledge, imitate or speak for an Indigenous
person or community, or upload Indigenous knowledge to AI systems without
explicit authority and consent.

---

## Appendix · Deploy to GitHub Pages (5 minutes)

```bash
cd seven-generations-orbit
git init && git add . && git commit -m "Seven Generations in Orbit"
git branch -M main
git remote add origin git@github.com:<you>/seven-generations-orbit.git
git push -u origin main
```

Then: repo **Settings → Pages → Source: Deploy from a branch → main / root**.
Live at `https://<you>.github.io/seven-generations-orbit/`.

## Appendix · 2-minute video outline (required for submission)

1. **0:00–0:20** — The problem: thousands of derelict objects; deciding where
   to act first is a decision about obligations, not just engineering.
2. **0:20–0:50** — Screen-record: six objects, the relationship map, the seven
   questions with their obligations.
3. **0:50–1:20** — The ledger: every rank explains itself; fragile verdicts are
   marked; owed-but-unreachable objects are carried forward.
4. **1:20–1:45** — The two moments: move the horizon slider (the order changes
   across seven generations), then answer Question 7 with "standing not
   established" — the tool refuses and asks you to convene.
5. **1:45–2:00** — The closing NARETU question, spoken over the sky.
