#!/usr/bin/env python3
"""Generate public/og.png for OpenGraph previews (1200x630).

Uses PIL + Syne/DM Sans. Run whenever name or tagline changes:

    python scripts/generate_og.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'og.png'

# Fonts - expects TTFs at /tmp/fonts-og or you can point these at your local copy.
SYNE = Path('/tmp/fonts-og/Syne-Bold.ttf')
DMSANS = Path('/tmp/fonts-og/DMSans.ttf')

W, H = 1200, 630

BG = (12, 15, 20)           # var(--color-bg) dark
ACCENT = (126, 184, 247)    # var(--color-accent)
ACCENT_GLOW = (126, 184, 247, 40)
TEXT = (232, 237, 245)
MUTED = (146, 164, 191)
BORDER = (30, 42, 58)


def main() -> None:
    img = Image.new('RGB', (W, H), BG)
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)

    # Dot grid background
    for x in range(0, W, 24):
        for y in range(0, H, 24):
            draw_overlay.ellipse((x, y, x + 1, y + 1), fill=(*BORDER, 255))

    # Gradient orb - radial glow, top-left
    orb_size = 700
    orb = Image.new('RGBA', (orb_size, orb_size), (0, 0, 0, 0))
    orb_draw = ImageDraw.Draw(orb)
    for r in range(orb_size // 2, 0, -4):
        alpha = int(30 * (r / (orb_size / 2)) ** 2)
        orb_draw.ellipse(
            (orb_size // 2 - r, orb_size // 2 - r, orb_size // 2 + r, orb_size // 2 + r),
            fill=(*ACCENT, alpha),
        )
    overlay.alpha_composite(orb, (-220, -220))
    overlay.alpha_composite(orb, (W - 500, H - 500))

    img.paste(overlay, (0, 0), overlay)
    draw = ImageDraw.Draw(img)

    syne_big   = ImageFont.truetype(str(SYNE),   96) if SYNE.exists()   else ImageFont.load_default()
    syne_med   = ImageFont.truetype(str(SYNE),   34) if SYNE.exists()   else ImageFont.load_default()
    dmsans_reg = ImageFont.truetype(str(DMSANS), 28) if DMSANS.exists() else ImageFont.load_default()
    dmsans_sm  = ImageFont.truetype(str(DMSANS), 22) if DMSANS.exists() else ImageFont.load_default()

    pad_x = 80
    y = 120

    draw.text((pad_x, y), 'HELLO, I\'M', fill=ACCENT, font=dmsans_sm, spacing=8)
    y += 48

    draw.text((pad_x, y), 'Savyasachi', fill=TEXT, font=syne_big)
    y += 112
    draw.text((pad_x, y), 'Jagadeeshan', fill=TEXT, font=syne_big)
    y += 130

    draw.text(
        (pad_x, y),
        'Technical Lead  ·  Senior Software Engineer  ·  Backend',
        fill=MUTED,
        font=syne_med,
    )
    y += 54

    draw.text(
        (pad_x, y),
        '8 years building backend systems & APIs. Bay Area.',
        fill=MUTED,
        font=dmsans_reg,
    )

    # Corner brand mark - small URL in bottom right
    url = 'savyasachi.dev'
    bbox = draw.textbbox((0, 0), url, font=dmsans_reg)
    url_w = bbox[2] - bbox[0]
    draw.text((W - pad_x - url_w, H - 80), url, fill=ACCENT, font=dmsans_reg)

    img.save(OUT, 'PNG', optimize=True)
    print(f'wrote {OUT} ({OUT.stat().st_size} bytes)')


if __name__ == '__main__':
    main()
