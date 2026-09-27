/* ============================================================
   Seven Generations in Orbit — the seven questions
   Framework: "Seven Generations in Orbit — A Framework for
   Responsible Debris Prioritization" (S. Al-Madi, LSI, 2026).

   Each question is drawn from a principle shared in the
   Challenge 2 materials (Mitákuye Oyás'iŋ, Škaŋ, relationship
   with the stars, Seven Generations analysis) and from NARETU
   (Chief Titus Letaapo). Each names who is owed, carries a
   provocation, and commits the tool to a behavior. The
   principles are design commitments — they shaped what the
   tool asks and what it refuses to ignore. They are not
   translations of Lakota knowledge into variables.

   Each option carries a value 0–3. The value never deletes a
   concern from the decision; it only shifts emphasis
   (multiplier 0.4–1.6). No value is traded away to zero.
   ============================================================ */

const QUESTIONS = [
  {
    id: "immediate",
    numeral: "1",
    principle: "Škaŋ · constant motion and change",
    owed: "Owed to: everyone under this sky, today",
    short: "Present danger",
    text: "Everything in orbit is in motion. How strongly should the danger an object poses today count in the decision?",
    why: "A ranking that only sees the present mistakes a moment of motion for the whole trajectory.",
    options: [
      { value: 0, label: "Lightly", hint: "Today is one moment in a longer movement." },
      { value: 1, label: "Moderately", hint: "Present danger matters, but does not lead." },
      { value: 2, label: "Strongly", hint: "Clear and present danger deserves real weight." },
      { value: 3, label: "Above all", hint: "Act first where the danger is already here." }
    ]
  },
  {
    id: "timeHorizon",
    numeral: "2",
    principle: "Seven Generations analysis",
    owed: "Owed to: the seventh generation",
    short: "Time horizon",
    text: "How far ahead should this decision have to answer for itself? Will this object be more dangerous in ten years? In one hundred years? In seven generations?",
    why: "An object removed or left this decade is a fact seven generations will inherit.",
    options: [
      { value: 0, label: "This decade", hint: "Decide for the horizon we can see." },
      { value: 1, label: "One generation", hint: "About twenty-five years." },
      { value: 2, label: "Three generations", hint: "The lifetime of a child born today." },
      { value: 3, label: "Seven generations", hint: "The decision must still make sense to them." }
    ]
  },
  {
    id: "exclusion",
    numeral: "3",
    principle: "Mitákuye Oyás'iŋ · interrelatedness",
    owed: "Owed to: all who share this orbit, including those never asked",
    short: "Relationships",
    text: "No object travels alone. If this object collides, who is affected first? Who is affected last? Who is never asked? How much should an object's connections shape its priority?",
    why: "Evaluating each object in isolation makes its relationships invisible.",
    options: [
      { value: 0, label: "Each object alone", hint: "Judge the object, not its neighbourhood." },
      { value: 1, label: "Some attention", hint: "Connections noted, but secondary." },
      { value: 2, label: "Real weight", hint: "What it is connected to changes what it is." },
      { value: 3, label: "Central", hint: "Relationships are the decision." }
    ]
  },
  {
    id: "decay",
    numeral: "4",
    principle: "Škaŋ · natural cycles",
    owed: "Owed to: those who would inherit what nature could have carried",
    short: "Natural decay",
    text: "The sky is already in motion toward decay. How much should we rely on nature to carry what it can, and act only where nature cannot?",
    why: "At 700 km the atmosphere helps within centuries. At 1,000 km it will not help for millennia.",
    options: [
      { value: 0, label: "Ignore decay", hint: "Treat every object as permanent." },
      { value: 1, label: "Note it", hint: "Decay acknowledged, not decisive." },
      { value: 2, label: "Let it guide", hint: "Act where nature cannot finish the work." },
      { value: 3, label: "Follow it", hint: "Persistence passed forward is the core harm." }
    ]
  },
  {
    id: "counterproductive",
    numeral: "5",
    principle: "NARETU · what our action owes",
    owed: "Owed to: those who would inherit the debris of our remedy",
    short: "Harm of acting",
    text: "If we remove this object, does it create a new risk somewhere else? Removal can fragment an object and multiply the danger. How much should the risk that acting makes things worse restrain us?",
    why: "Removing one object can reduce risk here while increasing risk somewhere else, or disturb something that should be preserved.",
    options: [
      { value: 0, label: "Little restraint", hint: "The risk of acting is acceptable." },
      { value: 1, label: "Some restraint", hint: "Weighed, but rarely decisive." },
      { value: 2, label: "Real restraint", hint: "A dangerous removal lowers priority." },
      { value: 3, label: "First, do not multiply", hint: "An action that seeds new debris fails its purpose." }
    ]
  },
  {
    id: "feasibility",
    numeral: "6",
    principle: "NARETU · obligation to act",
    owed: "Owed to: those who need a plan, not a promise",
    short: "Feasibility",
    text: "Is removal possible today? If not, what do we owe the generations who will have to deal with it? How much should our actual ability to reach and remove an object matter?",
    why: "An obligation we cannot carry out is a promise, not a plan.",
    options: [
      { value: 0, label: "Barely", hint: "Decide what is right; ability follows." },
      { value: 1, label: "Somewhat", hint: "A factor among others." },
      { value: 2, label: "Strongly", hint: "Prefer what we can actually do." },
      { value: 3, label: "Decisively", hint: "Only reachable objects should lead." }
    ]
  },
  {
    id: "authority",
    numeral: "7",
    principle: "NARETU · standing to decide",
    owed: "Owed to: everyone affected, before anything is done",
    short: "Authority",
    text: "Who created this object? Who is responsible for it now? Who should be at the table when we decide what to do with it — and have those affected been consulted?",
    why: "This question is a limit, not a weight. Without standing, the tool will not recommend intervention. It will recommend convening.",
    gate: true,
    options: [
      { value: 0, label: "Standing not established", hint: "Those affected have not been consulted." },
      { value: 1, label: "A single operator", hint: "The launching party decides alone." },
      { value: 2, label: "Operators together", hint: "Affected operators decide jointly." },
      { value: 3, label: "A convened body", hint: "A recognised international process, with affected parties present." }
    ]
  }
];

/* ============================================================
   Relationship map — Question 3 made visible.
   Nodes: the six objects, plus what they are connected to.
   Edges are qualitative, drawn from the challenge booklet's
   notes. Not orbital mechanics — a deliberation aid.
   ============================================================ */

const RELATIONSHIP_NODES = {
  "envisat":      { links: ["sl8-8344", "n-active", "n-esa"] },
  "sl16-28353":   { links: ["sl16-19120", "n-cluster", "n-russia"] },
  "sl16-19120":   { links: ["sl16-28353", "n-cluster", "n-russia"] },
  "h2-24279":     { links: ["n-japan", "n-future"] },
  "sl8-16292":    { links: ["sl8-8344", "n-cluster", "n-russia"] },
  "sl8-8344":     { links: ["sl8-16292", "envisat", "n-russia"] }
};

const RELATIONSHIP_LABELS = {
  "n-active":  "Active satellites nearby",
  "n-cluster": "A crowded shared cluster",
  "n-russia":  "Operator: Russia",
  "n-esa":     "Operator: Europe (ESA)",
  "n-japan":   "Operator: Japan",
  "n-future":  "Those who inherit a 2,000-year orbit"
};
