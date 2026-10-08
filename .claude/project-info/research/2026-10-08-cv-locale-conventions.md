# CV locale conventions: en / pl / es (2026)

> **Question:** What do English, Polish and Spanish CV conventions expect in 2026 for Mateusz Muszarski's
> designed 2-page PDF CV? Covers photo, personal data, consent clause, headings, dates, language levels and
> how to name the technikum and the INF exams.
> **Method:** WebFetch (and curl where WebFetch was blocked) of primary pages: UODO, AEPD, EURES, Europass,
> MEN/ORE/ZPE, RAE, PWN, RJP, GOV.UK, Bundesagentur für Arbeit. Also job-board and recruiter guides:
> Pracuj.pl, theprotocol.it, RocketJobs, Indeed España, InfoJobs, Jobscan, Harvard. PDFs were extracted
> locally with PyMuPDF. About 20 web searches. Builds on `2026-10-05-software-house-hiring.md` §6 and
> `2026-10-05-legal-compliance.md` (KP art. 22¹ text), without redoing them.
> **Date:** 2026-10-08. Facts, not legal advice.
> **Tags:** [official] = authority or law. [expert] = job board, recruiter or career service. [anecdote] = blog
> claim without data. [inference] = my reasoning. [convention] = common practice, no source read this session.
> **Dated** = the source is older than 2020. No [data] source exists for any question here: no survey we
> found measures photo or clause use on IT CVs.

## Poland

### Consent clause (klauzula RODO)

- **Law.** Under KP art. 22¹ § 1, the employer may ask a candidate for name, date of birth, "dane kontaktowe
  wskazane przez taką osobę", education, qualifications and work history. Other data rests on consent
  (art. 22¹ᵃ) [official, S2].
- **UODO:** "Dotychczasowa praktyka zamieszczenia w liście motywacyjnym CV zgody na przetwarzanie danych w
  celach rekrutacyjnych nie jest właściwa." [official, dated 2018, S1 p. 11]
- **UODO on extra data.** When a candidate sends more than the KP list (a photo, interests), it is processed on
  consent "która przejawia się przez działanie, polegające np. na przesłaniu pracodawcy życiorysu i listu
  motywacyjnego" [official, dated, S1 p. 11]. So even the photo needs no written line in strict law.
- **UODO on future recruitments.** May the employer reuse the data later? "Nie, jeżeli kandydat nie wyraził na
  to zgody." [official, dated, S1 p. 12]. Only this part truly needs a written consent.
- **The market still asks for the clause in 2026:**
  - EURES Poland (updated 2026-07-03): the consent "should be included underneath the CV", "confirmed with a
    handwritten signature" [official, S3].
  - Pracuj.pl's CV guide lists the clause as an "obowiązkowy element" [expert, S5]. Its clause guide says it is
    needed when the employer asks for it, and that clicking "Aplikuj" can stand in for it [expert, S4].
  - theprotocol.it (an IT job board, updated 2026-04-29) lists "brak zgody na przetwarzanie danych osobowych
    (RODO)" among critical CV errors [expert, S8].
  - Just Join IT's apply form shows its own consent line (measured 2026-10-05) [S38].
- **Conclusion:** the clause is legally optional for the KP data. Many PL recruiters still expect it, IT boards
  included. Keep one short footer line [inference].

**Exact wordings found (verbatim):**

| Use | Wording | Source |
| --- | --- | --- |
| Current recruitment, generic | „Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji” | S6 (S7 has the same text plus a citation of the 2018 Polish act) |
| Current recruitment, named company | „Wyrażam zgodę na przetwarzanie moich danych osobowych przez (nazwa firmy) w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.” | S4 |
| Future recruitments, add-on to the named line | „Wyrażam również zgodę na przetwarzanie moich danych osobowych w celu prowadzenia przyszłych rekrutacji przez wyżej wskazaną firmę.” | S4 |
| Future recruitments, UODO's own example (needs a firm name and a period) | „Wyrażam zgodę na przetwarzanie danych w celu wykorzystania ich w kolejnych naborach prowadzonych przez X przez okres najbliższych 6 miesięcy.” | S1 p. 12 |
| Future recruitments, generic (fragment as the page quotes it) | consent to „przetwarzanie moich danych osobowych w zakresie przyszłych procesów rekrutacyjnych.” | S7 |
| **Current + future, generic, one line** | „Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w aplikacji dla potrzeb niezbędnych do realizacji obecnego oraz przyszłych procesów rekrutacyjnych” | S6 |

**Recommendation [inference]:**

- PL CV footer: the S6 combined line, with a final period. It needs no company name. "Zawartych w aplikacji"
  covers the photo and interests too. It also covers future recruitments.
- Skip legal citations in the clause. UODO's own example cites none, and UODO says consent is not the basis for
  the KP data anyway.
- Placement: Pracuj.pl puts it "na dole strony", on each page (S4). On a 2-page PDF, the footer of the last
  page is the usual minimum.
- B2B hiring is outside the Labour Code; the basis there is steps before a contract, art. 6(1)(b) RODO
  [assumption from S38, not legal advice]. The same line does no harm.

### Photo

- Not required. The KP list has no image. UODO lists "wizerunek" as ordinary data (S1, S2) [official].
- theprotocol.it: "W polskim IT zdjęcie jest **opcjonalne** i coraz częściej pomijane." [expert, S8]
- Recommendation: optional on the PL CV [inference]. If used, the same photo as LinkedIn. The S6 line covers it.

### Phone, date of birth, address

- **Phone:** expected. Pracuj.pl includes it (S5); theprotocol.it lists "telefon, mail" (S8) [expert]. Write it
  as +48 xxx xxx xxx [convention].
- **Date of birth:** omit. theprotocol.it: "Nie. Zgodnie z trendami DEI...wiek nie jest informacją niezbędną na
  etapie selekcji CV." [expert, S8]. Pracuj.pl lists it as optional (S5). The employer may ask for it later
  under KP art. 22¹ (S2).
- **Address:** the KP asks only for contact data the candidate chooses (S2). EURES PL still lists "address"
  (S3). City or region is enough, e.g. "Pomorskie, Polska" [inference].
- **PESEL:** never on a CV. It is not in the candidate list of art. 22¹ § 1 (S2) [inference].

### Section headings

- Pracuj.pl (S5) [expert]: „Dane osobowe i kontaktowe”, „Doświadczenie zawodowe”, „Wykształcenie”,
  „Umiejętności”, „Kursy i certyfikaty”, „Zainteresowania”, „Klauzula o zgodzie na przetwarzanie danych”.
- theprotocol.it (S8) [expert]: „Stack technologiczny” for the tech list.
- Not found in a source this session: „Podsumowanie zawodowe”, „Profil”, „O mnie”, „Projekty”, „Języki obce”.
  All are common [convention].
- Which headings Polish ATSs (Traffit, eRecruiter and others) parse: **Unknown**. No source found.
- Recommended set: **Podsumowanie zawodowe · Doświadczenie zawodowe · Projekty · Wykształcenie · Umiejętności
  (or Stack technologiczny) · Języki obce · Kursy i certyfikaty · Zainteresowania** [inference].

### Dates

- PWN (prof. Bańko, 2007): month abbreviations "są mniej rozpowszechnione, gdyż w zamian używa się liczb ...
  Trzeba się jednak liczyć z tym, że czytelnik ich nie zrozumie" [expert, dated, S13].
- RJP PAN (2005): four proposed sets, e.g. "STY, LUT, MAR, KWI, MAJ, CZE, LIP, SIE, WRZ, PAŹ (lub PAZ), LIS,
  GRU". RJP notes each set conflicts with abbreviation rules in some way [expert, dated, S14].
- So write **"06.2026 – obecnie"** (numbers), or the full month in lowercase nominative: "czerwiec 2026 –
  obecnie". Avoid "cze. 2026" [inference].
- Present word: **"obecnie"** [convention].

### Technikum, technik programista, INF exams

- Occupation „technik programista”, code 351406. Its PRK level is "PIĄTY". It has two qualifications, INF.03
  and INF.04. It is taught "w pięcioletnim technikum" or in vocational courses [official, S9].
- INF.02 belongs to a different occupation, „technik informatyk” (351203), which is INF.02 + INF.03
  [official, S10].
- Documents: one „certyfikat kwalifikacji zawodowej” per qualification. The „dyplom zawodowy” needs every
  qualification of the occupation plus secondary education [official, S11].
- Official full names (S9, S10):
  - INF.02. Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych
  - INF.03. Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych
  - INF.04. Projektowanie, programowanie i testowanie aplikacji
- Suggested PL entry [inference]. Claim the diploma only if it was issued:
  `Technikum [nazwa], [miasto] · [lata]` / `Tytuł: technik programista (dyplom zawodowy, PRK 5)` /
  `Kwalifikacje zawodowe: INF.02, INF.03, INF.04` with the short names.
- **Owner to confirm:** which certificates and diplomas he holds (programista, and informatyk too?), whether he
  has the matura („świadectwo dojrzałości”), the school name and the years.

### Availability line, name of the document, length

- PL IT ads label contracts "B2B" and "UoP" (umowa o pracę) (S38). Suggested line: "Dostępność: od [data] ·
  B2B lub UoP · zdalnie lub hybrydowo (Pomorskie)" [inference].
- "CV" is the standard term in every PL source read. UODO uses "CV" and "życiorys" side by side (S1). Title the
  document "CV" [inference].
- Length: EURES PL says "one, maximum two A4 pages" [official, S3]. theprotocol.it: "Dla Juniora 1 strona, dla
  Seniora maksymalnie 2 strony konkretów" [expert, S8]. Pracuj.pl accepts 2–3 pages [expert, S5]. Two pages
  is fine.

## Spain

### Data protection clause

- AEPD guide (updated December 2025): "El tratamiento de datos personales durante el proceso de selección no
  exige el consentimiento de la persona candidata. La base jurídica es la del art. 6.1.b) del RGPD."
  [official, S15 p. 20]
- The duty to inform belongs to the employer. For unsolicited CVs the company must set up "procedimientos de
  información" [official, S15 p. 20].
- After the process: "sería necesario su consentimiento para un futuro tratamiento (por ejemplo, incorporación
  a una bolsa de trabajo), salvo que el empleador pueda demostrar un interés legítimo" [official, S15 p. 25].
- No Spanish guide read (EURES ES, Indeed ES, InfoJobs) mentions a clause on the CV. No standard wording was
  found.
- Recommendation: **no clause on the ES CV** [inference]. There is no sourced text for a "bolsa de trabajo"
  consent, so leave it out.

### Photo

- EURES Spain (updated 2026-07-03): "It is not compulsory to attach a photograph, although this may be useful
  for some jobs." [official, S16]
- Indeed España, on photo, date of birth and DNI/NIE: "si no te los solicitan, es recomendable no incluir estos
  datos" [expert, S17].
- KeepCoding (a tech-school blog, 2025): "En España, aunque no es obligatorio, es bastante común incluir una
  foto en el currículum". It also claims a CV with a photo gets 3× more views, without a source [anecdote, S36].
- No IT-specific Spanish evidence found. Recommendation: optional [inference].

### Personal data

- **DNI/NIE:** "no se considera necesario y la recomendación general es obviarlo" [expert, S17]. He has neither.
- **Age / date of birth:** omit. "la edad no es un requisito para una oferta de trabajo" [S17]. "No hace falta
  ponerla" [expert, dated 2014, S21].
- **Nationality:** "Este es otro dato que no necesitas incluir en tu currículum" [S17]. InfoJobs (2014):
  "Quizá solo se debiera especificar en caso de trabajar para la UE y de tener permiso de trabajo." [dated,
  S21]. For a foreign applicant, "Ciudadano de la UE" answers the work-permit question (S35) [inference].
- **Address:** "ha perdido importancia en los últimos años" [S17]. Xataka (2025) calls the postal address
  pointless in 2025 [anecdote, S37]. City and country are enough.
- **Phone:** "únicamente tienes que poner tu número de teléfono móvil". Indeed tells Spaniards to add "+34" for
  international applications [S17]; by analogy he writes +48 [inference].

### Section headings

- Indeed ES (S18): „Datos personales”, „Perfil profesional”, „Experiencia laboral”, „Formación”,
  „Habilidades”, „Idiomas”, „Información adicional”.
- Indeed ES (S19): „Formación académica”, „Formación complementaria”, „Idiomas”, „Informática”.
- InfoJobs (S22, dated 2012): „DATOS PERSONALES”, „PERFIL PROFESIONAL”, „FORMACIÓN ACADÉMICA”,
  „EXPERIENCIA LABORAL”, „OTROS CONOCIMIENTOS”, „OTROS DATOS DE INTERÉS”.
- Indeed ES (S20): under „Otros datos de interés” go availability and the driving licence.
- Recommended set: **Perfil profesional · Experiencia laboral · Proyectos · Formación académica · Habilidades
  (técnicas) · Idiomas · Formación complementaria · Otros datos de interés**. "Experiencia profesional" and
  "Proyectos" are common too [convention].

### Dates

- Indeed ES examples: "Septiembre 2018 - Septiembre 2019", "Septiembre 2015 - Actualidad" (S19); "Enero 2019 –
  Actualidad" (S18) [expert].
- RAE: months are lowercase "Salvo que la mayúscula venga exigida por la puntuación (a comienzo de texto o
  después de punto)" [official, S26]. In running text: "13 de julio de 2008". In numeric dates, no leading zero
  in common use ("5.7.99" rather than "05.07.99") [official, S25].
- The RAE list of abbreviations has no month entries (checked, S27). Short forms such as "jun." follow the
  general rules; no official list exists [inference].
- Recommendation: **"junio 2026 – actualidad"** (full, lowercase). If space is tight, "jun. 2026 – actualidad".
  Present word: **"actualidad"** (S18, S19).

### Foreign education

- Homologación "supone la declaración de la equivalencia con los títulos del sistema educativo español vigente"
  [official, S23]. Foreign titles can be homologated to Técnico (grado medio) or Técnico Superior (grado
  superior) FP titles [official, S24].
- So, without a homologación, do not write "equivalente a Técnico Superior" [inference]. Give the original name,
  a Spanish description and the EQF level.
- Europass in Spanish calls the EQF "El Marco Europeo de Cualificaciones (MEC)" [official, S28]. The Polish
  framework "has eight levels corresponding to the EQF levels" [official, dated, S12]. So PRK 5 = MEC 5.
- No Spanish recruiter source on describing foreign education was found; Indeed (S19) is silent. **Unknown.**
- Suggested entry [inference]: `Technikum [nombre], [ciudad] (Polonia) · [años]` / `Técnico programador
  (technik programista), título profesional polaco, nivel 5 del MEC` / `Exámenes estatales de cualificación
  profesional: INF.02, INF.03, INF.04`.

### Languages, availability, length

- Indeed ES: put your best language first. Name official certificates, or else the MCER level. Examples:
  "Inglés: B2. Escuela Oficial de Idiomas." (S20); "Inglés profesional, certificado C2 por la Universidad de
  Cambridge." (S19) [expert].
- Europass ES grid: A1–A2 "Usuario básico", B1–B2 "Usuario independiente", C1–C2 "Usuario competente"
  [official, S29].
- Recommendation: **"Polaco: lengua materna · Inglés: C1 · Español: A2"** [inference]. Claim a certificate
  only if he has one.
- Availability: "tu disponibilidad para entrar a trabajar puede resultar interesante": immediate start, travel,
  change of residence, set schedules [expert, S20]. Example line: "Disponibilidad: incorporación a partir de
  [fecha] · trabajo en remoto desde Polonia (UE)" [inference].
- Length: EURES ES says two A4 pages at most [official, S16]. InfoJobs (2012) allows "máximo tres" [dated, S22].
- EURES ES: "both the letter and CV must be drafted in Spanish" to work in Spain [official, S16]. That
  justifies a real ES version.

## English / international

### Photo and personal data

- **US:** Harvard says "Don't: Include a picture" and "Don't: Include age or gender" [expert, S32]. Jobscan:
  a photo is "generally discouraged ... in countries like the U.S. and Canada, as it could lead to bias"
  [expert, S33].
- **UK:** GOV.UK National Careers Service: "You should not include your age, your date of birth, whether you're
  married or your nationality." Include "Your name, phone number, email address and a link to your work network
  profile, if you have one, such as LinkedIn." [official, S31]. That page does not mention photos.
- **Ireland:** no source read. **Unknown** (usually grouped with the UK) [inference].
- **Germany:** Bundesagentur für Arbeit (01/2026): "Ein Bewerbungsfoto ist nicht zwingend erforderlich, wird
  aber immer noch von den meisten Arbeitgebern erwartet." Date and place of birth go at the top. "Familienstand
  und religiöse Zugehörigkeit sind in einem Lebenslauf nicht erforderlich." Maximum two pages [official, S34].
  Austria and Switzerland were not checked.
- **Benelux, Nordics:** no source read. **Unknown.**
- Recommendation: the EN CV has no photo and no date of birth. Make a separate variant only for a German-language
  application to a German employer [inference].

### Right to work

- Your Europe: "As an EU national, you're entitled to work — for an employer or as a self-employed person — in
  any EU country without needing a work permit." [official, S35]
- GOV.UK advises against listing nationality (S31). For cross-border remote roles, though, "EU citizen · no work
  permit needed in the EU" answers a screening question [inference].
- Do not imply a right to work in the UK. UK post-Brexit rules were not verified this session.

### Technikum and INF exams in English

- The official referencing report (2013) uses these English terms: "technical upper secondary school
  (technikum)", "vocational diploma", "vocational certificate", "matura certificate", and "Polish Qualifications
  Framework (PQF)". The PQF "has eight levels corresponding to the EQF levels" [official, dated, S12]. In 2013
  the technikum was four years; it is five years now (S9).
- No official English title for "technik programista" was found. A descriptive one: "Programmer technician
  (technik programista)" [inference].
- No official English names for the INF exams were found. Descriptive translations of the official Polish names
  [inference]:
  - INF.02: Administration and operation of computer systems, peripheral devices and local computer networks
  - INF.03: Creating and administering websites, web applications and databases
  - INF.04: Designing, programming and testing applications
- Suggested entry: `Technical upper secondary school (technikum), [city], Poland · [years]` / `Programmer
  technician (technik programista), vocational diploma, EQF level 5` / `Polish state vocational qualification
  exams: INF.02, INF.03, INF.04`.
- The exam board is the CKE (Centralna Komisja Egzaminacyjna). Its English name was not verified.

### Languages

- Europass EN grid: A1–A2 "Basic User", B1–B2 "Independent user", C1–C2 "Proficient user" [official, S29].
  The C1 descriptor says you can "Express myself fluently and spontaneously without much obvious searching for
  expressions" [official, S30].
- "Fluent" is not a CEFR level. Use codes: **"Polish — native · English — C1 · Spanish — A2"** [inference].

### Headings, dates, length

- Jobscan's essential sections: Contact Information, Professional Summary, Work Experience, Education, Skills
  [expert, S33].
- Harvard: "List headings (such as Experience) in order of importance", and "Don't: Start each line with a date"
  [expert, S32].
- NCS sections: contact details, introduction, education history, work history, references [official, S31].
  On a 2-page design CV, skip "References" [inference].
- Recommended set: **Summary · Experience · Projects · Education · Skills · Languages · Certifications ·
  Interests** [inference].
- Dates: **"Jun 2026 – Present"** [convention]. Put dates after the role, aligned right, not at the start of the
  line (S32).
- Length: no EN rule found. Germany caps it at 2 pages (S34). Two pages is fine.

## Cross-locale table

| Item | en | pl | es |
| --- | --- | --- | --- |
| **Photo** | No (US/UK norm: S32, S33). DE expects one (S34). IE, Benelux, Nordics: Unknown | Optional; "coraz częściej pomijane" in IT (S8) | Optional; "not compulsory" (S16); Indeed: leave it out unless asked (S17) |
| **Phone** | Yes, +48 (S31) | Yes, +48 xxx xxx xxx (S5, S8) | Mobile only, with country prefix (S17) → +48 |
| **Date of birth** | Omit (S31, S32). DE variant: include (S34) | Omit (S8). Employer may ask later (S2) | Omit (S17, S21) |
| **Address** | City/region + country | City/region ("Pomorskie, Polska"). KP asks only for chosen contact data (S2) | City + country. Postal address has "perdido importancia" (S17) |
| **Clause** | None by default. If the same EN PDF goes to PL firms: the S6 English line (below) | One footer line: the S6 combined current + future wording | None. AEPD: no consent needed for selection (S15) |
| **Section headings** | Summary · Experience · Projects · Education · Skills · Languages · Certifications · Interests | Podsumowanie zawodowe · Doświadczenie zawodowe · Projekty · Wykształcenie · Umiejętności · Języki obce · Kursy i certyfikaty · Zainteresowania | Perfil profesional · Experiencia laboral · Proyectos · Formación académica · Habilidades · Idiomas · Formación complementaria · Otros datos de interés |
| **Date format** | Jun 2026 – Present | 06.2026 – obecnie (or "czerwiec 2026 – obecnie"); no month abbreviations (S13, S14) | junio 2026 – actualidad (or "jun. 2026"); lowercase months (S26) |
| **Present word** | Present | obecnie | actualidad (S18, S19) |
| **Language levels** | CEFR codes: Polish — native · English — C1 · Spanish — A2 (S29) | polski — ojczysty · angielski — C1 · hiszpański — A2 (PL grid: "Poziom podstawowy / samodzielności / biegłości", S29) | Polaco: lengua materna · Inglés: C1 · Español: A2 (MCER, S19, S20, S29) |
| **Length** | 1–2 pages; DE max 2 (S34) | 1 page junior, max 2 (S3, S8) | Max 2 A4 (S16) |

English clause lines found (for PL employers reading the EN CV):

- S6: "I hereby consent to my personal data being processed for the purposes of the recruitment process in
  accordance with Regulation (EU) 2016/679". This one is generic and short.
- S4: "I hereby give consent for my personal data to be processed by [company name] for the purpose of
  conducting recruitment for the position for which I am applying."
- S3 (EURES): a long version that cites the Polish 2018 act and the GDPR.
- No sourced English wording for future recruitments was found.

## Sources

All accessed 2026-10-08 unless noted.

| id | URL | Title | Date |
| --- | --- | --- | --- |
| S1 | https://uodo.gov.pl/file/1469 | UODO, "Ochrona danych osobowych w miejscu pracy. Poradnik dla pracodawców" (PDF; pp. 10–12 used) | October 2018 (**dated**). Predates the 2019 KP amendment that added art. 22¹ᵃ |
| S2 | `.claude/project-info/research/2026-10-05-legal-compliance.md` (KP t.j. Dz.U. 2026 poz. 1245, art. 22¹, 22¹ᵃ) | Kodeks pracy, quoted from ISAP in the earlier note | t.j. 2026 |
| S3 | https://eures.europa.eu/living-and-working/living-and-working-conditions/living-and-working-conditions-poland_en | EURES, Living and working conditions: Poland (CV and consent section) | updated 2026-07-03 |
| S4 | https://cv.pracuj.pl/poradniki/klauzula-o-przetwarzaniu-danych-w-cv | Pracuj.pl, "Klauzula RODO do CV. Wzór zgody na przetwarzanie danych osobowych" | 2024-10-29 |
| S5 | https://cv.pracuj.pl/poradniki/jak-napisac-dobre-cv | Pracuj.pl, "Jak napisać CV do pracy? Praktyczne porady" | 2024-11-04 |
| S6 | https://rocketjobs.pl/blog/klauzula-cv-2026-aktualne-wzory-zgodne-z-rodo | RocketJobs.pl (Just Join IT group), "Klauzula CV 2026 – Aktualne Wzory Zgodne z RODO" | 2026-07-27 |
| S7 | https://muptorun.praca.gov.pl/rynek-pracy/aktualnosci/-/asset_publisher/8VCc6CLiHUaO/content/9310739-nowa-klauzula-w-cv/pop_up | Powiatowy Urząd Pracy Toruń (Wortal PSZ), "Nowa klauzula w CV" | undated (written for the 2018 change) |
| S8 | https://blog.theprotocol.it/artykul/jak-napisac-skuteczne-cv-wzor-i-przyklady | theprotocol.it, "CV w branży IT" (A. Sudnik) | 2024-10-29, updated 2026-04-29 |
| S9 | https://infozawodowe.men.gov.pl/uploads/pdf/998853917c78967540060a3a49909f91.pdf | MEN infozawodowe sheet "Technik programista", "Poziom PRK: PIĄTY" | undated (2019+ classification) |
| S10 | https://ore.edu.pl/wp-content/uploads/2020/03/technik-informatyk.pdf | Core curriculum "Technik informatyk 351203" (Dz.U. 2019 poz. 991) | 2019 |
| S11 | https://zpe.gov.pl/a/drogi-do-zawodu/DAqW3yTr5 | ZPE, "Możliwości kształcenia w zawodzie technik programista" | undated |
| S12 | https://europass.europa.eu/system/files/2022-05/Polish_Referencing_Report%5B1%5D.pdf | "Referencing the Polish Qualifications Framework for Lifelong Learning to the EQF" (via the Europass library) | 2013 (**dated**); uploaded 2022-05 |
| S13 | https://sjp.pwn.pl/poradnia/haslo/skroty-nazw-miesiecy;8648.html | PWN Poradnia Językowa, "skróty nazw miesięcy" (M. Bańko) | 2007-11-10 (**dated**) |
| S14 | https://rjp.pan.pl/skroty-nazw-miesiecy/ | Rada Języka Polskiego PAN, "Skróty nazw miesięcy" (T. Karpowicz) | 2005 (**dated**) |
| S15 | https://www.aepd.es/guias/la-proteccion-de-datos-en-las-relaciones-laborales.pdf | AEPD, "La protección de datos en las relaciones laborales" (pp. 20, 25) | updated December 2025 |
| S16 | https://eures.europa.eu/living-and-working/living-and-working-conditions/living-and-working-conditions-spain_en | EURES, Living and working conditions: Spain | updated 2026-07-03 |
| S17 | https://es.indeed.com/orientacion-laboral/cv-cartas-presentacion/datos-personales-curriculum-ejemplos | Indeed España, "Ejemplos de datos personales en el currículum" | undated ("más de 1 año") |
| S18 | https://es.indeed.com/orientacion-laboral/cv-cartas-presentacion/curriculum-vitae-estructura | Indeed España, "Curriculum vitae: estructura de 3 tipos de currículums habituales" | undated ("más de 1 año") |
| S19 | https://es.indeed.com/orientacion-laboral/cv-cartas-presentacion/formacion-academica-curriculum | Indeed España, "Cómo incluir la formación académica en el CV" | updated 2026-06-16 |
| S20 | https://es.indeed.com/orientacion-laboral/cv-cartas-presentacion/otros-datos-interes-cv | Indeed España, "Qué otros datos de interés puedes añadir en tu CV" | undated ("más de 1 año") |
| S21 | https://orientacion-laboral.infojobs.net/datos-personales-cv/ | InfoJobs, "Cómo se hace un buen currículum: los datos personales" | 2014-12-15 (**dated**) |
| S22 | https://orientacion-laboral.infojobs.net/estructura-contenido-un-cv/ | InfoJobs, "Cómo se hace un buen currículum: estructura y contenido" | 2012-03-20 (**dated**) |
| S23 | https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/general/05/051270/ficha/051270.html | Ministerio de Educación, FP y Deportes, "Homologación y convalidación de títulos y estudios extranjeros no universitarios" | undated |
| S24 | https://www.todofp.es/convalidaciones-equivalencias-homologaciones/homologaciones/titulos-extranjeros-homologables.html | TodoFP (Ministerio), "¿Qué títulos extranjeros no universitarios pueden homologarse por un título español de FP?" | undated |
| S25 | https://www.rae.es/ortograf%C3%ADa/uso-de-palabras-o-cifras-en-la-escritura-de-la-fecha | RAE, Ortografía: "Uso de palabras o cifras en la escritura de la fecha" | Ortografía 2010 (**dated**, still the current norm) |
| S26 | https://www.rae.es/espanol-al-dia/mayuscula-o-minuscula-en-los-meses-los-dias-de-la-semana-y-las-estaciones-del-ano | RAE, Español al día: "Mayúscula o minúscula en los meses..." | undated |
| S27 | https://www.rae.es/buen-uso-espa%C3%B1ol/lista-de-abreviaturas | RAE, "Lista de abreviaturas" (no month entries) | undated |
| S28 | https://europass.europa.eu/es/european-qualifications-framework-eqf ; https://europass.europa.eu/en/europass-tools/european-qualifications-framework | Europass, "El Marco Europeo de Cualificaciones (MEC)" / EQF page | undated |
| S29 | https://europass.europa.eu/system/files/2020-05/CEFR%20self-assessment%20grid%20EN.pdf (also `PL.pdf`, `ES.pdf`) | Europass CEFR self-assessment grids in EN, PL and ES | © 2004–2020 |
| S30 | https://europass.europa.eu/en/common-european-framework-reference-language-skills | Europass, "Common European Framework of Reference for Language Skills" | undated |
| S31 | https://nationalcareers.service.gov.uk/careers-advice/cv-sections | GOV.UK National Careers Service, "CV sections" | undated |
| S32 | https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/ | Harvard FAS Mignone Center for Career Success, "Create a Strong Resume" | © 2026 |
| S33 | https://www.jobscan.co/blog/resume-sections/ | Jobscan, resume sections guide (H. Short) | 2025-05-05 |
| S34 | https://www.arbeitsagentur.de/vor-ort/zav/working-and-living-in-germany/newsletter-iss/01-2026/bewerbung | Bundesagentur für Arbeit (ZAV), "Bewerbungsverfahren in Deutschland" | newsletter 01/2026 |
| S35 | https://europa.eu/youreurope/citizens/work/work-abroad/index_en.htm | Your Europe, "Working abroad" | checked 2026-09-30 |
| S36 | https://keepcoding.io/blog/curriculum-con-foto-o-sin-foto | KeepCoding, "¿Currículum con foto o sin foto?" (L. Gómez Salgado) | modified 2025-04-07 |
| S37 | https://www.xataka.com/empresas-y-economia/nadie-pone-que-sabe-leer-curriculum-mantener-estos-tres-datos-tampoco-tiene-sentido-2025/amp | Xataka (R. Andrés), CV data that no longer makes sense | 2025-01-28 |
| S38 | `.claude/project-info/research/2026-10-05-software-house-hiring.md` §6 and offers O1–O31 | Earlier note: JJIT apply consent line, B2B/UoP in PL ads | 2026-10-05 |

Not reached or not found:

- Pracuj.pl help center (pomoc.pracuj.pl): HTTP 403.
- Bulldogjob: HTTP 403.
- No Fluff Jobs: blocked for the crawler.
- Make it in Germany: bot wall.
- The ZRK record for technik programista renders only with JavaScript.
- No official English names exist online for the INF exams or for "technik programista".
- No Polish ATS heading data was found.
- No Benelux, Nordic or Irish source was read.
