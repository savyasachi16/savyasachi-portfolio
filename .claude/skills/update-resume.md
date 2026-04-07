You are helping update the portfolio site after a resume change.

## What to do

The user will invoke this skill with a path to a new resume PDF, e.g.:
`/update-resume ~/Downloads/Resume.pdf`

If no path is provided, ask the user for the PDF path.

### Step 1 — Read the PDF

Use the Read tool on the provided PDF path. Extract all content.

### Step 2 — Diff against current data files

Read the current state of:
- `src/data/experience.ts`
- `src/data/skills.ts`
- `src/data/education.ts`

Identify what has changed — new roles, updated accomplishments, new skills, changed dates, etc.

### Step 3 — Update data files

Update only what actually changed. Do not rewrite files that are unchanged.

Rules:
- Never fabricate content. Every entry must come verbatim or closely paraphrased from the PDF.
- Preserve the existing TypeScript interfaces and array structure exactly.
- PayPal has two roles under one company entry via `roles[]` — keep that structure.
- If a section in the PDF has no changes vs the data file, skip it.

### Step 4 — Redact and publish the PDF

Run the redaction script to strip the phone number and copy to public/:

```bash
python scripts/redact_resume.py <pdf_path>
```

This requires PyMuPDF. If it's not installed:
```bash
pip install pymupdf
```

Then re-run the script.

### Step 5 — Confirm

Tell the user:
- Which data files were updated and what changed
- Whether the redacted PDF was written to `public/resume.pdf`
- Whether a build check passed (`npm run build`)
