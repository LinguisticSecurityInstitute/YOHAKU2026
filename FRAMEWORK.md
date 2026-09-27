**Seven Generations in Orbit: A Framework for Responsible Debris Prioritization**

By: Sahara Al-Madi, Linguistic Security Institute
Submitted to: YOHAKU Responsible AI for Space Debris Hackathon, Challenge 2
Led by James Rattling Leaf Sr., Diana Mastracci, and Phil Two Eagle
September 26, 2026

---

## Abstract

There are countless abandoned objects that orbit Earth daily, and yet we cannot remove them all. Deciding where to act first is therefore not only a technical question, but also a question about relationships, obligations, and who gets to decide. This framework is offered as a suggestion rather than a conclusion. It organizes that decision around seven questions drawn from the principles shared in the Challenge 2 materials and from NARETU, the obligation-based governance framework described by Chief Titus Letaapo in the participant booklet. Each question names what might be owed, to whom, and across what time. A companion prototype demonstrates the framework in practice by ranking six real tracked objects across multiple time horizons, showing its reasoning, carrying forward obligations it cannot yet fulfill, and declining to decide when standing has not been established. The framework does not aim to produce answers; instead, it aims to make obligations visible so that a person can weigh them responsibly. It is meant to be questioned, verified, and evolved over time.

---

## 1. Introduction

The difficult question is not simply how to remove orbital debris, but how to decide what deserves attention first when every choice carries consequences. Engineers can identify objects that are particularly massive, difficult to track, likely to collide with other spacecraft, or costly to remove. These claims are necessary for determining what can and should be considered for intervention. Yet they do not, on their own, establish whose interests should take priority or what responsibilities accompany the decision to act.

Choosing a target therefore involves more than calculating risk. A decision to remove one object rather than another can affect different countries, organizations, spacecraft, and future generations in unequal ways. It can also raise questions about authority, fairness, accountability, and the consequences of intervention. A technically optimal ranking may identify the objects that present the greatest measurable risk, but it cannot determine whether addressing those objects first is the most responsible course of action.

This framework addresses that gap. Rather than replacing technical models or producing another ranking system, it asks the questions that should accompany technical prioritization: *Who is affected? Who has the authority and responsibility to act? What obligations exist to future generations? Who bears the costs and risks? And what consequences might follow from intervention or inaction?* These questions are organized into seven principles drawn from the challenge materials. Together, they provide a structured way to make the responsibilities behind a debris-removal decision visible without reducing them to a single metric or claiming to resolve them in advance.

---

## 2. The Seven Questions

### 2.1 Present Danger

Škaŋ: Constant Motion and Change, as described in the participant booklet, emphasizes that objects in orbit are always moving and changing. A ranking based only on present conditions may therefore capture a moment rather than the object's broader trajectory. Responses range from lightly, giving limited weight to present day risk because it may change over time, to above all, giving greatest weight to dangers that are already unfolding. The tool records present day risk as one input and shows how it changes across the time horizons in Question 2.

### 2.2 Time Horizon

Seven Generations analysis: As shared in the challenge materials, asks how far ahead a decision should have to answer for itself. For example, an object removed or left this decade is a fact seven generations will inherit. Possible responses range from this decade to seven generations. The tool produces a separate ranking for each horizon, side by side, and shows shifts rather than collapsing them into a single answer.

### 2.3 Relationships

Mitákuye Oyás'iŋ: Interrelatedness, as described in the participant booklet, reminds us that no object travels alone. If this object collides, who is affected first, who is affected last, and who is never asked. Possible responses range from judging the object alone to treating relationships as the decision. The tool draws relationships as a visible map, including cluster, neighbours, shared orbits, launching states, and affected communities, so that an object cannot be evaluated as if it stood alone.

### 2.4 Natural Decay

Škaŋ: Natural Cycles, asks whether intervention is necessary when natural processes are already moving an object toward reentry. Atmospheric drag is more effective at lower altitudes: NASA estimates debris around 700 km may take decades to decay, while debris around 1,000 km can remain for centuries. Škaŋ places natural decay timelines alongside collision risk and removal difficulty, asking whether the expected timescale of reentry should affect the urgency of intervention.

### 2.5 Harm of Acting

NARETU: What our action owes, as described by Chief Titus Letaapo, asks whether removal creates new risk elsewhere. Because removal can fragment an object and multiply danger, possible responses range from little restraint to first, do not multiply. Before suggesting removal, the tool runs the removal through the same relationship map as Question 3 and shows what new risks appear.

### 2.6 Feasibility

NARETU: Obligation to act, asks what we might owe the generations who will have to deal with an object we cannot currently reach. Because an obligation we cannot carry out may be a promise rather than a plan, possible responses range from barely to decisively. The tool separates what is owed from what is possible and, where an object is owed action but cannot be reached, records the obligation and passes it forward with a note on what future capability would be required.

### 2.7 Authority

NARETU: Standing to decide, asks who should be at the table and whether those affected have been consulted. This question is offered as a limit rather than a weight. Without standing, the tool does not suggest intervention; instead, it suggests convening. If standing is not established, the tool declines to produce a ranking and outputs a single instruction: convene the affected parties.

---

## 3. What Lakota Scientific Principles Might Change

The challenge materials name four documented Lakota principles and invite participants to treat them as starting points for co-design rather than fixed translations. This framework attempts to follow that instruction literally. Mitákuye Oyás'iŋ is why no object is scored in isolation. Škaŋ is why the tool never freezes the present into a verdict. Relationship with the stars is why orbit is treated as a shared environment. Seven Generations analysis is why the final view is not today's ranking but today's ranking beside the ranking seven generations from now. Nothing in this framework converts a Lakota teaching into a variable; authority over how these principles are represented remains with Lakota knowledge holders.

---

## 4. Limitations

This framework has several limitations. It is a suggestion rather than a settled method, and the seven questions are drawn from principles shared in the participant booklet and from NARETU as described there. The author is not Lakota and does not speak for Lakota knowledge holders. The framework is written in English and does not yet support community translation or dialect review. It is not community-authorized, and although the authority question is built in, the prototype cannot yet bring affected communities to the table. The prototype is a single-page web tool intended to make the framework felt rather than to replace it. Its dataset is small, drawing on six tracked objects from the Challenge 2 materials, and its response options are illustrative rather than empirically validated. These limitations are not reasons to discard the framework; instead, they mark the boundary within which it can be useful and the direction in which it might grow.

---

## 5. Future Inspiration for Expansion

The limitations in Section 4 point toward four possible extensions. First, community-translatable questions, so decisions about shared orbit are not gated by fluency in one language. Second, community-level impact reporting, so consequences are visible by the affected community rather than reduced to a global average. Third, community authority protocols, allowing knowledge holders and affected communities to review, revise, or reject how their knowledge is represented, consistent with the CARE Principles for Indigenous Data Governance. Future versions would require review and direction from the knowledge holders whose principles inform the framework, including the ability to revise, reject, or withdraw how those principles are represented. Fourth, auditable decision records, written in plain, translatable language and preserved so future communities can understand and question decisions made before them. These are not features of the current prototype; they are directions suggested by its own commitments to relationship, authority, reciprocity, and responsibility across generations.

---

## 6. The Companion Prototype

The framework is accompanied by a working prototype: a single-page web tool, no build step, runnable by opening one file. It renders the six tracked objects from the challenge dataset as a slow night sky. The user meets each object and its relationships, answers the seven questions, and arrives at a ranking that shows its reasoning per question, marks fragile verdicts, carries forward obligations it cannot yet fulfill, and recomputes itself across a horizon slider from today to seven generations from now. If Question 7 says standing has not been established, the ranking is withheld and the tool outputs one instruction: convene the affected parties. The prototype exists to make the framework felt, not to replace it.

---

## 7. Positionality and AI-Use Disclosure

The author is not Lakota and does not speak for Lakota knowledge holders. The Lakota principles referenced here are drawn from the Challenge 2 materials, where they were shared by the challenge leads as starting points for co-design. They are used here as design commitments, not as claims to represent Lakota knowledge or authority.

AI tools (Kimi Moonshot AI, Deepseek) were used to support the implementation of the author's ideas, including developing the user interface, creating and coding the demo, organizing the repository, and editing and structuring this document. The framework's core ideas, principles, and decision-making approach were developed by the author. Dataset facts were independently verified against the Challenge 2 materials, which draw on McKnight et al. (2021) and the ESA Space Environment Report 2026. References to Lakota principles and NARETU were verified against the Participant Booklet. The author remains responsible for the framework, its interpretations, data verification, and the prototype's outputs.

---

## 8. How to Use the Demo

The companion demo is a single-page web tool that requires no installation. It can be opened directly in a browser at the following link.

https://almadilsitask2yohaku.kimi.page

The tool is designed to be used in sequence. The steps below outline a suggested path through it.

**Step 1. Select an object.** Begin by selecting an object from the list on the left side of the screen. The list contains six tracked objects drawn from the Challenge 2 dataset. Selecting an object opens its relationship map, which shows the cluster, neighbours, shared orbits, and affected communities connected to it.

**Step 2. Answer the seven questions.** Once an object is selected, the tool presents seven questions in sequence. Each question is drawn from a principle shared in the Challenge 2 materials. For each question, choose the response that best reflects your judgment. There are no correct answers. The purpose is to make your reasoning visible.

**Step 3. Review the ranking.** After all seven questions have been answered, the tool produces a ranking of the six objects. The ranking is shown at two time horizons side by side: today and seven generations from now. The shift between the two horizons is part of the output and should be read as carefully as the ranking itself.

**Step 4. Adjust the horizon and weighting.** The tool includes a horizon slider that ranges from today to seven generations from now. Moving the slider recomputes the ranking and shows how the order changes over time. The weighting toggle allows you to shift emphasis between equal weighting and obligation weighting. Obligation weighting gives more voice to time horizon, relationships, and authority, which are the three questions closest to the named principles.

**Step 5. Revisit your answers.** You may return to any question and change your response. The ranking will update immediately. This is intended to make the deliberative process visible rather than to produce a fixed verdict.

**Step 6. Observe the authority gate.** If your answer to Question 7 says standing has not been established, the tool will not produce a ranking. Instead, it will output a single instruction: convene the affected parties. This is not an error. It is the framework working as intended. Authority is treated as a limit rather than a weight.

**Step 7. Read what the tool cannot decide.** At the end of the demo, the tool lists five things it cannot decide, including whether Lakota principles can be converted into numbers, whether an intervention is lawful, and whether the data is complete. These limitations are part of the framework, not disclaimers added afterward.

---

## 9. Conclusion

NARETU begins with obligations rather than rights alone. This framework carries that starting point into orbital decision-making by asking not only what can be done, but what is owed. Considering those affected today, to those who have the authority to decide, and to generations who will inherit the consequences. Its purpose is not to produce a final ranking, but to make the reasoning, relationships, uncertainties, and obligations behind a ranking visible.

The framework therefore ends where the challenge ends: not with an answer, but with questions. *If protecting orbit today leaves a worse environment for those who come after, what does responsible action require? And what might we owe to the generations who will live beneath the orbit we leave them?*

---

## References

European Space Agency. (2026, September 14). ESA Space Environment Report 2026. https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2026

European Space Agency. (n.d.). *About space debris*. https://www.esa.int/Space_Safety/Space_Debris/About_space_debris

McKnight, D., Witner, R., Letizia, F., Lemmens, S., Anselmo, L., Pardini, C., Rossi, A., Kunstadter, C., Kawamoto, S., Aslanov, V., Dolado Perez, J. C., Ruch, V., Lewis, H., Nicolls, M., Jing, L., Dan, S., Dongfang, W., Baranov, A., & Grishko, D. (2021). Identifying the 50 statistically-most-concerning derelict objects in LEO. *Acta Astronautica*, 181, 282–291. https://doi.org/10.1016/j.actaastro.2021.01.021

YOHAKU Responsible AI for Space Debris Hackathon, Participant Booklet, 2026.
