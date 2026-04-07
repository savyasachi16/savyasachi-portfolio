#!/usr/bin/env python3
"""
Redacts phone numbers from a resume PDF and writes the result to public/resume.pdf.

Usage:
    python scripts/redact_resume.py <path/to/resume.pdf>

Requires PyMuPDF:
    pip install pymupdf
"""

import sys
import re
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not installed. Run: pip install pymupdf")
    sys.exit(1)

PHONE_PATTERN = re.compile(
    r'(\+?1[\s\-.]?)?\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}'
)

OUTPUT_PATH = Path(__file__).parent.parent / "public" / "resume.pdf"


def redact_pdf(input_path: str) -> None:
    src = Path(input_path)
    if not src.exists():
        print(f"File not found: {src}")
        sys.exit(1)

    doc = fitz.open(str(src))
    redacted = False

    for page in doc:
        # Search for phone number patterns across the whole page text
        text_instances = page.search_for(page.get_text())  # warm cache
        blocks = page.get_text("dict")["blocks"]

        for block in blocks:
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    text = span["text"]
                    if PHONE_PATTERN.search(text):
                        # Find the exact rect for this span and redact it
                        hits = page.search_for(text)
                        for rect in hits:
                            page.add_redact_annot(rect, fill=(1, 1, 1))
                            redacted = True

        page.apply_redactions()

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(OUTPUT_PATH))
    doc.close()

    if redacted:
        print(f"Redacted phone number(s) and saved to {OUTPUT_PATH}")
    else:
        print(f"No phone numbers found — saved clean copy to {OUTPUT_PATH}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <path/to/resume.pdf>")
        sys.exit(1)

    redact_pdf(sys.argv[1])
