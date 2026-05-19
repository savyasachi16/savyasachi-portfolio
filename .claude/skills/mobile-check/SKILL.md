---
name: mobile-check
description: Audit the running folio site at iPhone viewport for the mobile UI issues that have repeatedly surfaced - text truncation with ellipsis, off-center modals, tap targets smaller than 44px, horizontal overflow, and elements stacking awkwardly. Triggers on "check mobile", "is this mobile-friendly", "the tip jar isn't centered on mobile", "text getting truncated", "mobile responsive check", "audit mobile UI". Spins up Playwright at the iPhone 14 viewport against the local dev server, runs the audit checks below, and reports a punch list of issues with selectors and a screenshot path.
allowed-tools: Bash Read Write
---

# mobile-check

Catch the mobile UI regressions that keep surfacing in folio (centering bugs in the tip-jar modal, truncated text in cards, drop-down arrows too small, horizontal real estate eaten by margins). Run before declaring a UI change done.

## Workflow

1. **Confirm the dev server is running.** If the `devserver` skill is available, use it. Otherwise check `lsof -nP -iTCP:4321 -sTCP:LISTEN || lsof -nP -iTCP:3000 -sTCP:LISTEN`. If neither is up, start `npm run dev` in the background and wait for the URL to return 2xx.

2. **Pick the URL(s) to audit.** Default: the home page. If the user named a section ("the tip jar", "the experience section"), audit the relevant route or anchor.

3. **Write the audit script** to `.tmp/mobile-check.mjs` (gitignored by global rule):

   ```js
   import { chromium, devices } from 'playwright';

   const URL = process.env.MOBILE_CHECK_URL || 'http://localhost:4321';
   const browser = await chromium.launch();
   const ctx = await browser.newContext({ ...devices['iPhone 14'] });
   const page = await ctx.newPage();
   await page.goto(URL, { waitUntil: 'networkidle' });
   await page.screenshot({ path: '.tmp/mobile-check.png', fullPage: true });

   const issues = await page.evaluate(() => {
     const out = [];
     const vw = window.innerWidth;

     // 1. Horizontal overflow on body
     if (document.documentElement.scrollWidth > vw + 1) {
       out.push({ kind: 'horizontal-overflow', detail: `body scrollWidth ${document.documentElement.scrollWidth} > viewport ${vw}` });
     }

     // 2. Elements wider than viewport
     document.querySelectorAll('*').forEach(el => {
       const r = el.getBoundingClientRect();
       if (r.width > vw + 1 && r.height > 0) {
         out.push({ kind: 'element-overflow', selector: cssPath(el), width: r.width });
       }
     });

     // 3. Truncated text with ellipsis (text-overflow: ellipsis active)
     document.querySelectorAll('*').forEach(el => {
       const cs = getComputedStyle(el);
       if (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1) {
         out.push({ kind: 'text-truncated', selector: cssPath(el), text: el.textContent.trim().slice(0, 60) });
       }
     });

     // 4. Tap targets smaller than 44x44 (interactive elements)
     document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach(el => {
       const r = el.getBoundingClientRect();
       if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
         out.push({ kind: 'tap-target-small', selector: cssPath(el), width: r.width, height: r.height });
       }
     });

     // 5. Off-center modal (any element with role=dialog or class containing 'modal')
     document.querySelectorAll('[role="dialog"], [class*="modal" i]').forEach(el => {
       const r = el.getBoundingClientRect();
       if (r.width === 0) return;
       const center = r.left + r.width / 2;
       if (Math.abs(center - vw / 2) > 8) {
         out.push({ kind: 'modal-off-center', selector: cssPath(el), centerOffset: center - vw / 2 });
       }
     });

     function cssPath(el) {
       if (!(el instanceof Element)) return '';
       const path = [];
       while (el && el.nodeType === 1 && path.length < 5) {
         let sel = el.nodeName.toLowerCase();
         if (el.id) { sel += '#' + el.id; path.unshift(sel); break; }
         if (el.className && typeof el.className === 'string') {
           const cls = el.className.trim().split(/\s+/).slice(0, 2).join('.');
           if (cls) sel += '.' + cls;
         }
         path.unshift(sel);
         el = el.parentElement;
       }
       return path.join(' > ');
     }

     return out;
   });

   console.log(JSON.stringify({ url: URL, viewport: '390x844 (iPhone 14)', issues }, null, 2));
   await browser.close();
   ```

4. **Run it:**

   ```bash
   mkdir -p .tmp
   npx -y playwright@latest install chromium >/dev/null 2>&1 || true
   node .tmp/mobile-check.mjs
   ```

   First run installs the chromium browser to `~/Library/Caches/ms-playwright/`. Subsequent runs are fast.

5. **Group issues by kind and report.** Format:

   ```
   Mobile audit: http://localhost:4321 @ iPhone 14 (390x844)
   Screenshot: .tmp/mobile-check.png

   horizontal-overflow: 1
   - body scrollWidth 412 > viewport 390

   tap-target-small: 3
   - a.dropdown-arrow (24x24)
   - button.theme-toggle.icon-btn (32x32)
   - a.social-link (28x28)

   modal-off-center: 1
   - div.modal.tip-jar (centerOffset: 42px)

   text-truncated: 2
   - p.experience-bullet "Built systems at Google for distributed cach..."
   - a.project-title "Tata Varnam - traditional Indi..."
   ```

6. **Triage.** For each issue, suggest one fix line. Do not auto-fix - the user wants to decide which trade-offs to make (some truncation is intentional, some tap targets have visual weight from a parent).

## Common folio-specific patterns to flag

- **Tip jar modal off-center.** Recurring bug. Centering logic must work after viewport rotation.
- **Card text getting truncated with ellipsis.** Often the card width is fine but `text-overflow: ellipsis` is on a child that doesn't need it on mobile.
- **Dropdown arrows tiny.** SVG/icon buttons that meet the design but not the 44px tap rule.
- **Crypto link bar eating horizontal space.** Stacks awkwardly on narrow viewports.
- **Hero / banner truncating "Technical Lead" highlight.** Long label, narrow viewport.

## Anti-patterns

- **Auditing at desktop viewport "to be quick".** The bugs only show at mobile widths. Run at iPhone 14 size minimum; iPhone SE (375x667) for the narrow case.
- **Skipping the screenshot.** The screenshot is the artifact the user can scroll through. Always write it.
- **Auto-fixing.** Report, don't fix. The user reviews and decides.
- **Running against the deployed Vercel URL.** Iterate against `localhost`; Vercel deploys are for final verification only.

## Hard rules

- Always start with `npm run dev` confirmed running.
- Always write the screenshot. Path in the output.
- Always include selectors. "There's a tap target issue" is useless without `a.dropdown-arrow`.
- Default viewport: iPhone 14 (390x844). Override via env var if needed.
- Output JSON-shaped report so an agent can re-consume it for follow-up fixes.
