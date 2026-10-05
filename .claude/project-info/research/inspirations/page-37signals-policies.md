# 37signals (Basecamp) + Plausible + Linear: readable privacy policies

Date: 2026-10-05 · Page type: /privacy

URLs:
- https://37signals.com/policies/privacy (and https://github.com/basecamp/policies)
- https://plausible.io/privacy
- https://linear.app/privacy

Screenshots: `img/page-legal-basecamp-privacy-1440.jpg`, `-390.jpg`, `img/page-legal-linear-privacy-1440.jpg`

## What works [measured]
- **37signals:**
  - H1 + "Last updated: September 16, 2026";
  - a two-sentence plain-English promise ("In this policy, we lay out: what data we collect and why; how your data is handled; and your rights… **We never sell your data.**");
  - a bulleted TOC of **question- or task-style headings** ("What we collect and why", "When we access or disclose your information", "Artificial intelligence", "What happens when you delete content…");
  - 22 px type at about 79 characters per line;
  - a "Changes and questions" section;
  - the policies are **maintained in a public GitHub repo** (`basecamp/policies`, last push 2026-10-04), so git history works as the change log.
- **Plausible:**
  - the page opens with a **"TL;DR: For plausible.io visitors, we do not use cookies and we do not collect any personal data…"**;
  - sections split by role ("As a visitor…", "As a customer…"), legal basis under GDPR, and subprocessors;
  - about 1.2k words. This is the closest model for a cookieless personal site.
- **Linear:**
  - a mono "EFFECTIVE DATE" line;
  - the key consent sentence set in **bold** in the intro;
  - a numbered mono TOC;
  - 17 px type at 76 characters per line;
  - an accessibility line: "**If you have a disability, you may access this Privacy Policy in an alternative format** by contacting…".

## Steal
- A "short version" box first.
- Headings phrased as the questions people actually ask.
- A numbered TOC.
- Keep the policy as Markdown in the repo and link to its history.
- The alternative-format line.
- Comfortable type (17–22 px, 70–80 characters per line).

## Skip
- A brand-colour full-page background (37signals' pink). It hurts long reading and print.
- Burying the controller identity. Under GDPR art. 13 it has to be stated clearly.
