# Resume Redaction

`scripts/redact_resume.py` strips phone numbers from a resume PDF before publishing it to the site. The redacted copy is written to `public/resume.pdf` — the file the Hero "Download Resume" button links to.

## Why

You don't want your personal phone number indexed by search engines or scraped from a publicly hosted PDF.

## Requirements

```bash
pip install pymupdf
```

## Usage

```bash
python scripts/redact_resume.py /path/to/your/full-resume.pdf
```

This writes the redacted version to `public/resume.pdf`, overwriting whatever was there. The original file is not modified.

## What it redacts

Phone numbers matching common US formats:
- `(555) 867-5309`
- `555-867-5309`
- `555.867.5309`
- `+1 555 867 5309`

Everything else (email, address, LinkedIn, etc.) is left untouched.

## Updating your resume

1. Run the script against your new PDF
2. Commit `public/resume.pdf`
3. Push → Vercel redeploys with the updated file
