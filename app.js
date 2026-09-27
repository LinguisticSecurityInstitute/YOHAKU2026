/* ============================================================
   Seven Generations in Orbit — application state
   Four screens: opening → objects → questions → comparison.

   Commitments kept by this file (from the framework):
   · Q1 — a current score is never presented as final.
   · Q2 — rankings shown per horizon, side by side.
   · Q3 — relationships drawn as a visible map.
   · Q6 — owed-but-unreachable objects are carried forward,
          not dropped.
   · Q7 — without standing, no ranking is produced at all.
          One instruction: convene the affected parties.
   ============================================================ */

(() => {
  const $ = (sel) => document.querySelector(sel);

  const state = {
    screen: "opening",
    answers: {},
    qIndex: 0,
    generation: 0,
    scheme: "equal",
    selectedObject: null,
    compareVisited: false
  };

  const SCREENS = ["opening", "objects", "questions", "comparison"];

  function show(screenId) {
    state.screen = screenId;
    for (const s of SCREENS) {
      $("#screen-" + s).classList.toggle("is-active", s === screenId);
    }
    window.scrollTo(0, 0);
  }

  /* ---------- screen 2 · objects + relationship map ---------- */

  function renderObjectList() {
    const ol = $("#object-list");
    ol.innerHTML = "";
    DEBRIS_OBJECTS.forEach((obj, i) => {
      const li = document.createElement("li");
      li.className = "object-row";
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.setAttribute("aria-label", `${obj.name}, catalogue ${obj.catalog}`);
      li.dataset.id = obj.id;
      li.innerHTML = `
        <span class="object-row__num">${String(i + 1).padStart(2, "0")}</span>
        <span class="object-row__name">${obj.name}<small>№ ${obj.catalog}</small></span>
        <span class="object-row__meta">${obj.altitudeKm} km · ${obj.massKg.toLocaleString()} kg</span>`;
      const pick = () => selectObject(obj.id);
      li.addEventListener("click", pick);
      li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
      ol.appendChild(li);
    });
  }

  // Relationship map: the selected object at center, its links
  // arranged around it, connected by hairlines.
  function renderRelationshipMap(obj) {
    const entry = RELATIONSHIP_NODES[obj.id];
    const links = Array.isArray(entry) ? entry : (entry && Array.isArray(entry.links) ? entry.links : []);
    if (links.length === 0) return "";
    const W = 460, H = 300, cx = W / 2, cy = H / 2;
    const nodeR = 7, ringR = 108;

    let svg = `<svg viewBox="0 0 ${W} ${H}" class="relmap" role="img"
      aria-label="Relationship map for ${obj.name}">`;

    // edges first, under the nodes
    links.forEach((lid, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / links.length;
      const x = cx + Math.cos(a) * ringR;
      const y = cy + Math.sin(a) * ringR * 0.78;
      svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="relmap__edge" />`;
    });

    // linked nodes
    links.forEach((lid, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / links.length;
      const x = cx + Math.cos(a) * ringR;
      const y = cy + Math.sin(a) * ringR * 0.78;
      const linkedObj = DEBRIS_OBJECTS.find((o) => o.id === lid);
      const label = linkedObj
        ? `${linkedObj.name} № ${linkedObj.catalog}`
        : (RELATIONSHIP_LABELS[lid] || lid);
      const isObject = !!linkedObj;
      const anchor = x > cx + 40 ? "start" : x < cx - 40 ? "end" : "middle";
      const tx = anchor === "start" ? x + 12 : anchor === "end" ? x - 12 : x;
      const ty = anchor === "middle" ? (y < cy ? y - 14 : y + 22) : y + 4;
      svg += `<circle cx="${x}" cy="${y}" r="${isObject ? 6 : 4.5}" class="relmap__node ${isObject ? "relmap__node--object" : ""}" />`;
      svg += `<text x="${tx}" y="${ty}" text-anchor="${anchor}" class="relmap__label">${label}</text>`;
    });

    // center node
    svg += `<circle cx="${cx}" cy="${cy}" r="${nodeR}" class="relmap__center" />`;
    svg += `<text x="${cx}" y="${cy - 18}" text-anchor="middle" class="relmap__label relmap__label--center">${obj.name} № ${obj.catalog}</text>`;
    svg += `</svg>`;
    return svg;
  }

  function selectObject(id) {
    state.selectedObject = id;
    Sky.setSelected(id);
    document.querySelectorAll(".object-row").forEach((r) =>
      r.classList.toggle("is-selected", r.dataset.id === id));
    const obj = DEBRIS_OBJECTS.find((o) => o.id === id);
    const yearsInOrbit = 2026 - obj.launched;
    $("#object-detail").innerHTML = `
      <h3>${obj.name} <small style="font-family:var(--sans);font-size:0.8rem;color:var(--parchment-faint)">№ ${obj.catalog}</small></h3>
      <p class="od-cat">${obj.type} · ${obj.operator}</p>
      <p>${obj.why}</p>
      ${renderRelationshipMap(obj)}
      <p class="od-note">Scores below are deliberation starters from the challenge booklet — not measurements.</p>
      <div class="od-facts">
        <div><span>Mass</span><strong>${obj.massKg.toLocaleString()} kg</strong></div>
        <div><span>Altitude / incl.</span><strong>${obj.altitudeKm} km · ${obj.inclinationDeg}°</strong></div>
        <div><span>In orbit for</span><strong>${yearsInOrbit} years</strong></div>
        <div><span>Natural decay</span><strong>~${obj.naturalDecayYears.toLocaleString()} yrs (rough)</strong></div>
        <div><span>Cluster density</span><strong>${obj.clusterDensity}</strong></div>
        <div><span>Launched</span><strong>${obj.launched}</strong></div>
      </div>`;
  }

  /* ---------- screen 3 · questions ---------- */

  function renderQuestion() {
    const q = QUESTIONS[state.qIndex];
    $("#q-count").textContent = `${q.numeral} / 7`;
    $("#q-fill").style.width = `${(state.qIndex / QUESTIONS.length) * 100}%`;
    $("#q-principle").textContent = q.principle;
    $("#q-owed").textContent = q.owed;
    $("#question-text").textContent = q.text;
    $("#q-why").textContent = q.why;

    const box = $("#q-options");
    box.innerHTML = "";
    q.options.forEach((opt) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "q-option" + (state.answers[q.id] === opt.value ? " is-chosen" : "");
      b.innerHTML = `
        <span class="q-option__marker" aria-hidden="true"></span>
        <span>
          <span class="q-option__label">${opt.label}</span>
          <span class="q-option__hint">${opt.hint}</span>
        </span>`;
      b.addEventListener("click", () => {
        state.answers[q.id] = opt.value;
        b.classList.add("is-chosen");
        setTimeout(nextQuestion, 260);
      });
      box.appendChild(b);
    });
    const first = box.querySelector(".q-option");
    if (first) first.focus({ preventScroll: true });
  }

  function nextQuestion() {
    state.qIndex += 1;
    if (state.qIndex < QUESTIONS.length) {
      renderQuestion();
    } else {
      $("#q-fill").style.width = "100%";
      enterComparison();
    }
  }

  /* ---------- screen 4 · comparison ---------- */

  function enterComparison() {
    show("comparison");
    if (!state.compareVisited) {
      state.compareVisited = true;
      document.body.classList.add("first-reveal");
      setTimeout(() => document.body.classList.remove("first-reveal"), 2600);
    }
    updateComparison(true);
  }

  function currentGenLabel() {
    if (state.generation === 0) return "Seven generations from now";
    const years = state.generation * Scoring.GENERATION_YEARS;
    return `Generation ${state.generation} — ${years} years from now`;
  }

  function updateComparison(firstRender) {
    const { gate } = Scoring.rank(state.answers, state.scheme, state.generation);

    // ---- Q7 hard refusal: no standing → no ranking, anywhere.
    const rankingWrap = $("#ranking-wrap");
    const convene = $("#convene-panel");
    const sideBySide = $("#side-by-side");
    if (!gate.open) {
      rankingWrap.hidden = true;
      sideBySide.hidden = true;
      convene.hidden = false;
      Sky.setRankOrder([]);
      $("#gen-label").textContent = currentGenLabel();
      return;
    }
    convene.hidden = true;
    rankingWrap.hidden = false;
    sideBySide.hidden = false;

    // sky + labels
    const now = Scoring.rank(state.answers, state.scheme, state.generation);
    Sky.setRankOrder(now.rows.map((r) => r.object.id));
    Sky.setGeneration(state.generation);
    $("#gen-label").textContent = currentGenLabel();

    renderRanking($("#ranking"), now, firstRender);

    // side-by-side: today vs generation 7, always computed fresh
    const today = Scoring.rank(state.answers, state.scheme, 0);
    const future = Scoring.rank(state.answers, state.scheme, 7);
    renderMiniRanking($("#sbs-today"), today);
    renderMiniRanking($("#sbs-future"), future);
    renderShifts(today, future);
  }

  /* main ranking list with ledgers */
  function renderRanking(ol, result, firstRender) {
    const prevTops = {};
    if (!firstRender) {
      ol.querySelectorAll(".rank-row").forEach((row) => {
        prevTops[row.dataset.id] = row.getBoundingClientRect().top;
      });
    }

    ol.innerHTML = "";
    result.rows.forEach((row, i) => {
      const obj = row.object;
      const q = QUESTIONS.find((x) => x.id === row.dominantConcern);
      // Owed but unreachable: hard to reach AND the user weighs feasibility
      // at least as a real factor — otherwise the marker would be noise.
      const carried = obj.dims.feasibility <= 1 && state.answers.feasibility >= 2;

      const li = document.createElement("li");
      li.className = "rank-row";
      li.dataset.id = obj.id;
      li.innerHTML = `
        <div class="rank-row__grid">
          <span class="rank-row__num">${i + 1}</span>
          <div>
            <div class="rank-row__name">${obj.name}<small>№ ${obj.catalog} · ${obj.altitudeKm} km</small></div>
            <div class="rank-row__bar"><div class="rank-row__bar-fill" style="width:${row.normalized.toFixed(1)}%"></div></div>
          </div>
          <p class="rank-row__why">Led by <span class="concern">${q.short}</span> — ${q.principle.split("·")[0].trim()}</p>
          <div class="rank-badges">
            ${row.fragile
              ? `<span class="badge badge--fragile" title="This rank rests heavily on two of your answers. Softening just those two to their mildest option would drop this score by ${(row.fragilityDrop * 100).toFixed(0)}%. A verdict this sensitive deserves deliberation, not confidence.">Fragile ranking</span>`
              : `<span class="badge badge--stable">Holds steady</span>`}
            ${carried
              ? `<span class="badge badge--carried" title="This object is owed action but cannot be reached today. The obligation is recorded and passed forward, with a note on the capability it would require.">Obligation carried forward</span>`
              : ""}
          </div>
        </div>
        <button class="rank-row__toggle" type="button" aria-expanded="false">Why this rank?</button>
        <div class="rank-detail"><div class="rank-detail__inner">
          ${contributionHtml(row)}
          ${counterfactualHtml(row)}
        </div></div>`;

      const toggle = li.querySelector(".rank-row__toggle");
      toggle.addEventListener("click", () => {
        const open = li.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.textContent = open ? "Close the ledger" : "Why this rank?";
      });
      ol.appendChild(li);
    });

    // FLIP animation on reorder
    if (!firstRender) {
      ol.querySelectorAll(".rank-row").forEach((row) => {
        const prev = prevTops[row.dataset.id];
        if (prev === undefined) return;
        const dy = prev - row.getBoundingClientRect().top;
        if (Math.abs(dy) > 4) {
          row.style.transition = "none";
          row.style.transform = `translateY(${dy}px)`;
          row.classList.add("is-rippling");
          requestAnimationFrame(() => {
            row.style.transition = "";
            row.style.transform = "";
          });
          setTimeout(() => row.classList.remove("is-rippling"), 700);
        }
      });
    }
  }

  /* per-question contribution ledger */
  function contributionHtml(row) {
    const maxAbs = Math.max(
      ...QUESTIONS.map((q) => Math.abs(row.contributions[q.id].contribution)), 0.0001);
    return QUESTIONS.map((q) => {
      const c = row.contributions[q.id].contribution;
      const pct = (Math.abs(c) / maxAbs) * 100;
      return `
        <div class="contrib">
          <span>${q.numeral} · ${q.short}</span>
          <span class="contrib__bar">
            <span class="contrib__fill ${c < 0 ? "is-negative" : ""}" style="width:${pct.toFixed(1)}%"></span>
          </span>
          <span class="contrib__val">${c >= 0 ? "+" : "−"}${Math.abs(c).toFixed(1)}</span>
        </div>`;
    }).join("") +
    `<p class="ledger-note">Sage bars raise priority; the blue bar is the restraint of
     Question 5 — the risk that acting makes things worse.</p>`;
  }

  /* counterfactual: what would change this rank */
  function counterfactualHtml(row) {
    const answers = state.answers;
    const scheme = state.scheme;
    const gen = state.generation;
    // find the two answers with the greatest pull on this object
    const pull = QUESTIONS.map((q) => ({
      id: q.id,
      exposure: Scoring.WEIGHT_SCHEMES[scheme].weights[q.id] *
        (Scoring.answerMultiplier(answers[q.id]) - Scoring.answerMultiplier(0))
    })).sort((a, b) => b.exposure - a.exposure).slice(0, 2);

    const shaken = Object.assign({}, answers);
    pull.forEach((p) => { shaken[p.id] = 0; });
    const alt = Scoring.rank(shaken, scheme, gen);
    const newIdx = alt.rows.findIndex((r) => r.object.id === row.object.id);
    const curIdx = Scoring.rank(answers, scheme, gen).rows.findIndex((r) => r.object.id === row.object.id);
    const qNames = pull.map((p) => {
      const q = QUESTIONS.find((x) => x.id === p.id);
      return `Question ${q.numeral}`;
    }).join(" and ");

    if (newIdx === curIdx) {
      return `<p class="counterfactual">If you had answered ${qNames} at their mildest,
        this object would hold its place at #${curIdx + 1}.</p>`;
    }
    return `<p class="counterfactual">If you had answered ${qNames} at their mildest,
      this object would move from #${curIdx + 1} to #${newIdx + 1}.</p>`;
  }

  /* mini rankings for the side-by-side view */
  function renderMiniRanking(el, result) {
    el.innerHTML = result.rows.map((row, i) => `
      <li class="mini-row">
        <span class="mini-row__num">${i + 1}</span>
        <span class="mini-row__name">${row.object.name} <small>№ ${row.object.catalog}</small></span>
      </li>`).join("");
  }

  /* what shifted between the two horizons */
  function renderShifts(today, future) {
    const el = $("#sbs-shift");
    const moves = [];
    today.rows.forEach((row, i) => {
      const j = future.rows.findIndex((r) => r.object.id === row.object.id);
      const d = i - j; // positive = rose in priority at gen 7
      if (Math.abs(d) >= 1) {
        moves.push({
          name: `${row.object.name} № ${row.object.catalog}`,
          d
        });
      }
    });
    if (moves.length === 0) {
      el.innerHTML = `<p>The order holds across seven generations. That steadiness is itself a finding.</p>`;
      return;
    }
    moves.sort((a, b) => b.d - a.d);
    el.innerHTML = moves.map((m) => m.d > 0
      ? `<p><strong>${m.name}</strong> rises ${m.d} place${m.d > 1 ? "s" : ""} — a low priority today becomes urgent in a crowded future.</p>`
      : `<p><strong>${m.name}</strong> falls ${-m.d} place${m.d < -1 ? "s" : ""} — nature or time relieves part of its burden.</p>`
    ).join("");
  }

  /* ---------- wiring ---------- */

  function init() {
    Sky.init($("#sky"));
    renderObjectList();

    // Selection is list-only: the sky is atmosphere, not interface.

    $("#btn-begin").addEventListener("click", () => show("objects"));
    $("#btn-to-questions").addEventListener("click", () => {
      state.qIndex = 0;
      show("questions");
      renderQuestion();
    });
    $("#btn-revisit").addEventListener("click", () => {
      state.qIndex = 0;
      show("questions");
      renderQuestion();
    });
    $("#btn-convene-revisit").addEventListener("click", () => {
      state.qIndex = 6; // return directly to Question 7
      show("questions");
      renderQuestion();
    });

    const slider = $("#time-slider");
    slider.addEventListener("input", () => {
      state.generation = parseInt(slider.value, 10);
      slider.setAttribute("aria-valuetext",
        state.generation === 0 ? "Today" : `${state.generation} generations from now`);
      updateComparison(false);
    });

    $("#w-equal").addEventListener("click", () => setScheme("equal"));
    $("#w-obligation").addEventListener("click", () => setScheme("obligation"));
  }

  function setScheme(id) {
    state.scheme = id;
    $("#w-equal").classList.toggle("is-on", id === "equal");
    $("#w-obligation").classList.toggle("is-on", id === "obligation");
    updateComparison(false);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
