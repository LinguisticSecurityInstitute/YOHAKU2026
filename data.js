/* ============================================================
   Seven Generations in Orbit — dataset
   Six real tracked objects from the YOHAKU Challenge 2 booklet.
   Source: McKnight et al., 2021, "Identifying the 50
   statistically-most-concerning derelict objects in LEO,"
   Acta Astronautica; cross-checked against the ESA Space
   Environment Report.

   Dimension scores (0–3) are qualitative judgments derived from
   the booklet's "why it's on the list" notes. They are starting
   points for deliberation, not measurements. Decay estimates are
   rough, altitude-based orders of magnitude.
   ============================================================ */

const CLUSTER_FACTOR = { low: 0.5, medium: 1.0, high: 1.6 };

const DEBRIS_OBJECTS = [
  {
    id: "envisat",
    name: "ENVISAT",
    catalog: "27386",
    type: "Defunct satellite",
    massKg: 8211,
    altitudeKm: 762,
    inclinationDeg: 98.3,
    launched: 2002,
    operator: "Europe (ESA)",
    why: "Large defunct satellite operating near other active satellites.",
    naturalDecayYears: 1000,        // rough, altitude-based
    clusterDensity: "medium",
    dims: {
      immediate: 2,        // massive, in a congested sun-synchronous region
      timeHorizon: 3,      // very large fragment source; centuries of persistence
      exclusion: 2,        // shares its orbital neighbourhood with active missions
      decay: 3,            // natural decay will not help on any human timescale
      counterproductive: 3,// a failed removal of 8 tonnes could be catastrophic
      feasibility: 1,      // heavy and uncooperative; hard to capture
      authority: 2         // operator identifiable; cooperative channels exist
    },
    sky: { radius: 0.34, speed: 0.00021, phase: 0.4, hue: "#CAA266" }
  },
  {
    id: "sl16-28353",
    name: "SL-16 R/B",
    catalog: "28353",
    type: "Rocket body",
    massKg: 9000,
    altitudeKm: 844,
    inclinationDeg: 71.0,
    launched: 2004,
    operator: "Russia",
    why: "Highest-risk object on the list; 345 close approaches in its cluster.",
    naturalDecayYears: 1500,
    clusterDensity: "high",
    dims: {
      immediate: 3,        // highest composite risk; hundreds of close approaches
      timeHorizon: 3,
      exclusion: 3,        // embedded in a dense cluster of related objects
      decay: 3,
      counterproductive: 3,// nine tonnes; fragmentation would seed its own cluster
      feasibility: 1,
      authority: 1         // operator identifiable; coordination channels uncertain
    },
    sky: { radius: 0.42, speed: 0.00017, phase: 2.2, hue: "#D9A441" }
  },
  {
    id: "sl16-19120",
    name: "SL-16 R/B",
    catalog: "19120",
    type: "Rocket body",
    massKg: 9000,
    altitudeKm: 827,
    inclinationDeg: 71.0,
    launched: 1988,
    operator: "Russia",
    why: "Same rocket family and cluster, in orbit 16 years longer.",
    naturalDecayYears: 1400,
    clusterDensity: "high",
    dims: {
      immediate: 2,
      timeHorizon: 3,
      exclusion: 3,        // same family; what happens to one affects the others
      decay: 3,
      counterproductive: 3,
      feasibility: 1,
      authority: 1
    },
    sky: { radius: 0.40, speed: 0.00018, phase: 4.1, hue: "#D9A441" }
  },
  {
    id: "h2-24279",
    name: "H-2 R/B",
    catalog: "24279",
    type: "Rocket body",
    massKg: 2700,
    altitudeKm: 1082,
    inclinationDeg: 98.7,
    launched: 1996,
    operator: "Japan",
    why: "Lower mass, but higher altitude means far slower natural decay.",
    naturalDecayYears: 2000,
    clusterDensity: "low",
    dims: {
      immediate: 1,        // lower consequence today
      timeHorizon: 2,
      exclusion: 1,        // relatively isolated
      decay: 3,            // the longest persistence of the six
      counterproductive: 1,
      feasibility: 2,      // smaller mass; capture is more tractable
      authority: 3         // operator with active debris-removal engagement
    },
    sky: { radius: 0.52, speed: 0.00012, phase: 1.1, hue: "#AABB87" }
  },
  {
    id: "sl8-16292",
    name: "SL-8 R/B",
    catalog: "16292",
    type: "Rocket body",
    massKg: 1435,
    altitudeKm: 974,
    inclinationDeg: 82.9,
    launched: 1985,
    operator: "Russia",
    why: "Smaller, but many objects of this type share similar orbits.",
    naturalDecayYears: 1800,
    clusterDensity: "high",
    dims: {
      immediate: 2,
      timeHorizon: 2,
      exclusion: 3,        // a swarm of near-identical companions shares its orbit
      decay: 3,
      counterproductive: 1,
      feasibility: 2,
      authority: 1
    },
    sky: { radius: 0.48, speed: 0.00014, phase: 3.3, hue: "#AABB87" }
  },
  {
    id: "sl8-8344",
    name: "SL-8 R/B",
    catalog: "8344",
    type: "Rocket body",
    massKg: 1435,
    altitudeKm: 757,
    inclinationDeg: 74.1,
    launched: 1975,
    operator: "Russia",
    why: "Same type as above; the oldest object here, at 50 years in orbit.",
    naturalDecayYears: 800,
    clusterDensity: "medium",
    dims: {
      immediate: 1,
      timeHorizon: 2,
      exclusion: 2,
      decay: 2,            // lower altitude; nature does part of the work
      counterproductive: 1,
      feasibility: 3,      // small and low; the most reachable of the six
      authority: 1
    },
    sky: { radius: 0.30, speed: 0.00024, phase: 5.4, hue: "#AABB87" }
  }
];
