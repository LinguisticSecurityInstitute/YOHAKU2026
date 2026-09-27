/* ============================================================
   Seven Generations in Orbit — scoring engine

   Design commitments (the "framework"):
   1. Every score is explainable — the per-question contribution
      is returned so the UI can show WHY a rank is what it is.
   2. Concerns are emphasised, never erased — an answer of 0
      still leaves a 0.4 multiplier. No value is traded to zero.
   3. Authority is a constraint, not a weight — if standing to
      decide has not been established (Q7 < 2), the tool refuses
      to issue a directive ranking and recommends convening.
   4. Rankings are dynamic — they recompute across a time
      horizon from today to seven generations (~175 years).
   5. Rankings are honest about fragility — if a small change of
      mind would reorder the result, the tool says so.
   ============================================================ */

const Scoring = (() => {

  const GENERATION_YEARS = 25;

  // Base weights. The obligation-weighted scheme gives more weight to
  // time horizon (2), relationships (3) and authority (7) — the
  // three questions most directly grounded in the named principles.
  const WEIGHT_SCHEMES = {
    equal: {
      label: "Equal weights",
      weights: { immediate: 1, timeHorizon: 1, exclusion: 1, decay: 1, counterproductive: 1, feasibility: 1, authority: 1 }
    },
    obligation: {
      label: "Obligation-weighted",
      weights: { immediate: 1, timeHorizon: 1.5, exclusion: 1.5, decay: 1, counterproductive: 1, feasibility: 1, authority: 1.5 }
    }
  };

  // An answer of 0 does not erase a concern; it quiets it.
  function answerMultiplier(a) {
    return 0.4 + 0.4 * a; // 0.4 – 1.6
  }

  // How the orbital environment shifts across generations.
  // generation: 0 (today) .. 7 (seven generations from now)
  function environmentAt(obj, generation) {
    const yearsAhead = generation * GENERATION_YEARS;
    // Persistence: what fraction of the object's natural lifetime
    // remains. Low-altitude objects shed burden; high ones barely move.
    const persistence = Math.max(0.1, 1 - yearsAhead / obj.naturalDecayYears);
    // Congestion: crowded clusters get more dangerous as the
    // environment fills; quiet orbits change less.
    const clusterFactor = CLUSTER_FACTOR[obj.clusterDensity] || 1;
    const congestion = 1 + 0.18 * generation * clusterFactor;
    return { persistence, congestion, yearsAhead };
  }

  // Effective dimension scores for an object at a given generation.
  function effectiveDims(obj, generation) {
    const env = environmentAt(obj, generation);
    const clamp = (v) => Math.min(4.5, Math.max(0, v));
    return {
      immediate: clamp(obj.dims.immediate * (0.7 + 0.3 * env.congestion)),
      timeHorizon: clamp(obj.dims.timeHorizon * env.persistence * env.congestion),
      exclusion: clamp(obj.dims.exclusion * env.congestion),
      decay: clamp(obj.dims.decay * env.persistence),
      counterproductive: obj.dims.counterproductive, // physics of removal does not age
      feasibility: obj.dims.feasibility,             // reachability does not age
      authority: obj.dims.authority                  // standing is granted, not computed
    };
  }

  // Score one object. Returns the full explanation ledger.
  function scoreObject(obj, answers, weights, generation) {
    const dims = effectiveDims(obj, generation);
    const contributions = {};
    let total = 0;

    for (const q of QUESTIONS) {
      const emphasis = weights[q.id] * answerMultiplier(answers[q.id]);
      // Feasibility is a credit; the other six are burdens or restraints.
      // Counterproductive risk subtracts: the danger of acting lowers priority.
      let c;
      if (q.id === "feasibility") {
        c = emphasis * dims.feasibility;
      } else if (q.id === "counterproductive") {
        c = -0.5 * emphasis * dims.counterproductive;
      } else {
        c = emphasis * dims[q.id];
      }
      contributions[q.id] = { emphasis, dim: dims[q.id], contribution: c };
      total += c;
    }

    // Dominant concern: the largest positive contribution.
    let dominantConcern = null, best = -Infinity;
    for (const q of QUESTIONS) {
      const c = contributions[q.id].contribution;
      if (c > best) { best = c; dominantConcern = q.id; }
    }

    return { total, contributions, dominantConcern };
  }

  // Fragility: would the score drop by more than a third if the two
  // answers with the greatest pull on this object were changed to their
  // mildest option? A rank that collapses on two softened convictions
  // is flagged as fragile rather than projected as certain.
  function fragility(obj, answers, weights, generation) {
    const base = scoreObject(obj, answers, weights, generation).total;
    const byExposure = QUESTIONS.map((q) => ({
      id: q.id,
      exposure: weights[q.id] * (answerMultiplier(answers[q.id]) - answerMultiplier(0))
    })).sort((a, b) => b.exposure - a.exposure).slice(0, 2);
    const shaken = Object.assign({}, answers);
    for (const e of byExposure) shaken[e.id] = 0;
    const alt = scoreObject(obj, shaken, weights, generation).total;
    const drop = base > 0 ? (base - alt) / base : 0;
    return { fragile: drop > 0.33, drop, threshold: 0.33 };
  }

  // Authority gate: a limit, not a weight.
  function authorityGate(answers) {
    return { open: answers.authority >= 2, answer: answers.authority };
  }

  // Rank all six objects at a given generation.
  function rank(answers, schemeId, generation) {
    const weights = WEIGHT_SCHEMES[schemeId].weights;
    const rows = DEBRIS_OBJECTS.map((obj) => {
      const s = scoreObject(obj, answers, weights, generation);
      const f = fragility(obj, answers, weights, generation);
      return {
        object: obj,
        score: s.total,
        contributions: s.contributions,
        dominantConcern: s.dominantConcern,
        fragile: f.fragile,
        fragilityDrop: f.drop
      };
    });
    const max = Math.max(...rows.map((r) => r.score), 0.0001);
    rows.forEach((r) => { r.normalized = Math.max(0, (r.score / max) * 100); });
    rows.sort((a, b) => b.score - a.score);
    return { rows, gate: authorityGate(answers) };
  }

  return { WEIGHT_SCHEMES, answerMultiplier, environmentAt, effectiveDims, scoreObject, fragility, authorityGate, rank, GENERATION_YEARS };
})();
