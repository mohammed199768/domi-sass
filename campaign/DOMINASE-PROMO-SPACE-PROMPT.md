# DOMINASE — برومبت إنشاء Space وإنتاج الفيديو الترويجي

> انسخ كل ما تحت الخط إلى محادثة Claude المربوطة بـ Freepik.
> يُفترض أنك قرأت بريف الحملة مسبقاً في نفس المحادثة.

---

## الهدف

إنتاج **فيديو ترويجي واحد احترافي** لاستوديو DOMINASE — مدته 26–30 ثانية، عمودي 9:16، مبني من أربع لقطات متتابعة تُدمج في ملف واحد.

سنبنيه داخل **Space** كخط إنتاج، لا كأوامر متفرقة.

---

## القصة — أربع لقطات

الفيديو يحكي فكرة الحملة كاملة بلا كلمة واحدة:

| # | اللقطة | ما تقوله |
|---|---|---|
| 1 | **التشتت** | شغلك يعمل عبر أجزاء منفصلة لا يربطها شيء |
| 2 | **التسريب** | وهو يفقد العميل عند نقطة واحدة تحديداً |
| 3 | **التشخيص** | نحن نجد أين هي بالضبط |
| 4 | **النظام** | ونبنيها نظاماً واحداً متصلاً |

الثانيتان الأخيرتان تُترك **سوداء نظيفة تماماً** لوضع الشعار والـCTA لاحقاً في المونتاج.

---

## الخطوة 1 — أنشئ الـSpace

أنشئ Space باسم:

```
DOMINASE-Promo-Film
```

الوصف: `Hero promotional film — 4-shot cinematic sequence, dark emerald system identity, 9:16.`

شارك معي رابط الـSpace فور إنشائه.

---

## الخطوة 2 — ابنِ الجراف

ابنِ داخل الـSpace هذا الهيكل:

```
[Keyframe 1] → [Video 1] ┐
[Keyframe 2] → [Video 2] ├→ [Concatenate] → [الملف النهائي]
[Keyframe 3] → [Video 3] ┤
[Keyframe 4] → [Video 4] ┘
```

كل لقطة تُولَّد **صورة ثابتة أولاً**، ثم تُحوَّل إلى فيديو (image-to-video). ممنوع التوليد من النص مباشرة إلى فيديو — أغلى بكثير وأقل تحكماً.

---

## الخطوة 3 — الصور المفتاحية (4 صور، 9:16)

استخدم هذه الـprompts حرفياً:

**Keyframe 1 — THE SCATTER**
```
Cinematic dark void, deep green-tinted near-black background #020403 filling
85% of the frame. Suspended at varying depths: five or six disconnected
geometric planes and fragments, each rimmed with a faint thin emerald edge
light #2BBF89. Nothing links them — the space between them is empty and cold.
The fragments are inert, unlit from within, drifting apart. Volumetric haze,
subtle film grain, very high contrast, generous negative space. Lower third
completely empty unlit black. Vertical 9:16, architectural, restrained.
```

**Keyframe 2 — THE LEAK**
```
Same dark void and same fragments as before, but now partially connected by
thin precise luminous emerald lines #2BBF89 forming a system lattice, with
brighter highlights #74E6C9 tracing along them like current. One single
junction of the lattice is visibly fractured, and from that one break fine
particles of light bleed outward and fall into the darkness. The fracture is
the only bright focal point and must read instantly. Volumetric haze, film
grain, high contrast. Lower third completely empty unlit black. Vertical 9:16.
```

**Keyframe 3 — THE DIAGNOSIS**
```
Same emerald lattice structure in the same dark void, but now dimmed and
desaturated almost to darkness. A single horizontal plane of clean emerald
scanning light #74E6C9 cuts across the frame, thin and precise, like a
measurement instrument. Where the scan meets the fractured junction, that
junction flares bright while everything else stays dim. Clinical, exact,
diagnostic. Volumetric haze, film grain, extreme contrast. Lower third
completely empty unlit black. Vertical 9:16.
```

**Keyframe 4 — THE SYSTEM**
```
The same void, now resolved. The previously scattered fragments have locked
together into one coherent layered architecture — clean stacked planes forming
a single connected structure, edges lit with steady emerald #2BBF89, interior
lines glowing calm and even. No break, no leak, nothing drifting. Balanced,
finished, quiet, confident. Volumetric haze, film grain, high contrast.
Lower third completely empty unlit black. Vertical 9:16.
```

---

## الخطوة 4 — التحريك (image-to-video لكل لقطة، 6–7 ثوانٍ)

**Video 1 — THE SCATTER**
```
Extremely slow drift. The disconnected fragments float apart at different
speeds and depths with gentle parallax. The camera pushes forward almost
imperceptibly. Haze moves softly. Cold, inert, unresolved. No acceleration,
no snap.
```

**Video 2 — THE LEAK**
```
Pulses of light travel along the lattice lines like current through a circuit.
At the fractured junction, fine particles continuously bleed outward and fall
away into the dark, dissipating. Slow forward camera push with slight parallax.
Unhurried, constant pacing.
```

**Video 3 — THE DIAGNOSIS**
```
The thin horizontal plane of emerald scanning light sweeps slowly downward
through the entire structure at a steady unbroken pace. As it passes, the
lattice dims further, and the fractured junction flares brighter and holds.
Camera nearly static. Clinical, precise, deliberate.
```

**Video 4 — THE SYSTEM**
```
The drifting particles are slowly drawn back inward, the fracture closes, and
the fragments glide together and lock into one connected layered structure.
A single soft emerald pulse travels outward through the whole system once,
then settles into a steady calm glow. The camera slowly pulls back to reveal
the complete form, and comes to rest. The final two seconds are still and
quiet with the lower third clean and empty.
```

**Negative prompt لكل اللقطات:**
```
text, letters, arabic text, numbers, watermark, logo, human figures, faces,
hands, fast zoom, camera shake, whip pan, rainbow gradient, orange and teal,
neon cyberpunk, glossy 3d corporate render, cluttered background, low contrast,
blurry, jittery motion, strobing, cartoon
```

---

## الخطوة 5 — الدمج

ادمج اللقطات الأربع بالترتيب 1 → 2 → 3 → 4 في ملف واحد.
الناتج المطلوب: **9:16، 1080×1920، 24fps، 26–30 ثانية.**

---

## الصوت — اختياري، اسألني أولاً

لا تولّد صوتاً إلا بعد اعتماد الفيديو الصامت وموافقتي. إن وافقت، المطلوب موسيقى فقط بلا تعليق صوتي:

```
Slow cinematic ambient score, deep sub bass drone, sparse minimal synth,
one restrained rising swell arriving at the final section, no drums,
no melody hook, no vocals. Restrained, technical, confident. 30 seconds.
```

---

## قواعد الكريدت — ملزمة

1. قبل أي تشغيل، استخدم **`simulate_spaces`** واعرض عليّ التقدير. هي قراءة فقط ولا تخصم.
2. شغّل بوضع **`downstream`** أو **`singular`** فقط. **ممنوع `connected`.**
3. ولّد **الصور الأربع أولاً** واعرضها عليّ. لا تشغّل أي عقدة فيديو قبل موافقتي على الصور — الصور رخيصة والفيديو ليس كذلك.
4. بعد اعتماد الصور، ولّد **فيديو لقطة واحدة فقط** كاختبار، اعرضه، ثم أكمل الباقي.
5. أبلغني بالرصيد المتبقي بعد كل مرحلة.

---

## التسليم

1. رابط الـSpace
2. الصور المفتاحية الأربع
3. مقاطع الفيديو الأربعة منفردة
4. الملف النهائي المدموج
5. إجمالي الكريدت المستهلك والمتبقي

---

**ابدأ بالخطوة 1: أنشئ الـSpace وشارك الرابط، ثم اعرض تقدير الكلفة الكامل قبل توليد أي شيء.**
