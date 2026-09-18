# ExcelT design system

## Theme tokens

| Token | Value | Use |
|---|---:|---|
| `brand` | `#107C41` | App title band, primary action, active output tab |
| `brandDark` | `#185C37` | Strong emphasis and selected state |
| `selection` | `#217346` | Active cell/range border and selection affordance |
| `text` | `#252423` | Body text and calculated outputs |
| `muted` | `#605E5C` | Units, timestamps, helper text |
| `panel` | `#FFFFFF` | Main workspace and table body |
| `section` | `#F3F6F4` | Section headers, table headers, helper areas |
| `soft` | `#F8F8F8` | Secondary surfaces and empty states |
| `grid` | `#DCDEDD` | Light structural borders and grid lines |
| `separator` | `#E1DFDD` | Stronger section separators |
| `hover` | `#F2F8F4` | Hover/preview state |
| `hoverBorder` | `#CFE7D7` | Hovered input or control border |
| `up` | `#A34D4D` | Positive market movement in Korean-market context |
| `down` | `#3F6F9F` | Negative market movement in Korean-market context |
| `link` | `#3567B3` | Links and supporting series |
| `warning` | `#B08A28` | Caution, commodity, or special state |
| `error` | `#C00000` | Invalid input or failed calculation |

## Typography and density

- Preferred UI stack: `Aptos, Segoe UI, Noto Sans KR, 맑은 고딕, Arial, sans-serif`.
- Body: 11–12px web or 10–11pt Excel.
- Section label: 11–12px / semibold.
- Dashboard title: 16–18px / bold.
- KPI value: 18–24px / bold.
- Default row height: 24px web equivalent; compact controls 22–24px.
- Control radius: 3px. Panel radius: 6px. Pill radius only for status badges.
- Prefer thin borders and whitespace over large shadows.

## Semantic styles

| State | Visual treatment | Interaction |
|---|---|---|
| Editable input | Blue/linked text or pale yellow/green input fill; visible focus border | Click, keyboard entry, paste, validation |
| Same-view formula | Black/dark text, read-only cursor | Show calculation on request |
| Cross-view link | Green text in working/build areas; dark text in reader-facing output | Follow dependency to source |
| Selected cell | `#217346` border plus subtle fill | Keyboard navigation and range actions |
| Hover | `#F2F8F4` fill and `#CFE7D7` border | Preview without committing |
| Positive market movement | `#A34D4D` text and light red tint | Use only for directionality |
| Negative market movement | `#3F6F9F` text and light blue tint | Use only for directionality |
| Missing/unavailable | Muted text with `n.a.` or blank | Never replace with zero |
| Validation error | Light red fill, `#C00000` text, specific message | Block commit if required |

## Default layout

Use a 12-column content grid:

- Row 1: concise title and workbook context.
- Row 3: controls and input selectors.
- Rows 5–8: up to four KPI values.
- Rows 10–25: main table and/or chart.
- Rows 27–38: detail, news, or audit trail.
- Bottom status: refresh time, record count, filter state, and warnings.

For a dense three-pane view, use approximately `35% / 35% / 30%` widths. On smaller screens, collapse the secondary pane before shrinking the primary input/table below usable width.

## Application shell chrome

Use these regions when a web dashboard must feel like the Excel application shown in the reference screens. The values are starting points, not a requirement to reproduce every desktop pixel.

| Region | Starting height | Required behavior |
|---|---:|---|
| Title bar | 36–40px | Brand, save state, workbook name, search, account/settings actions |
| Ribbon tabs | 32–36px | Active tab, keyboard focus, overflow on narrow screens |
| Ribbon commands | 72–116px | Grouped commands, labels/tooltips, disabled/pressed states, collapse control |
| Formula/name bar | 28–34px | Address/name, raw/formatted value, formula or calculation detail |
| Dashboard tabs | 28–34px | Product-level views separate from worksheet tabs |
| Notice bar | 22–28px | Optional announcement; dismissible when appropriate |
| Worksheet tabs | 28–34px | Sheet arrows, active sheet, add/overflow controls |
| Status bar | 22–28px | Refresh, record count, filter, connection, zoom, view mode |

Treat these as semantic regions with stable DOM landmarks or component names. The workspace owns the main scroll, while shell controls remain visible or become intentionally docked. Do not use a fixed footer that covers the last editable row.

## Navigation hierarchy

Excel-like products often have three navigation levels:

1. **Application/ribbon navigation**: commands that change the available actions.
2. **Dashboard navigation**: product views such as 시세, 뉴스, 종목토론방, or 포트폴리오.
3. **Worksheet navigation**: data or analysis sheets within the current view.

Each level must have its own active indicator. A dashboard tab change may change the source view, while a worksheet tab change should preserve the application shell and update only the workbook surface. Document any exception.

## Theme catalog and onboarding

Use a theme object rather than component-local colors. The baseline catalog is:

| ID | Label | Mode | Accent |
|---|---|---|---|
| `m365-gray` | 최신 M365 회색 | light | `#107C41` |
| `google-blue` | Google 스프레드시트 | light | `#1A73E8` |
| `excel-green` | 다채로운 녹색 | light | `#107C41` |
| `excel-white` | 흰색 | light | `#107C41` |
| `dark-gray` | 어두운 회색 | dark | `#6EBB8A` |
| `black` | 검정 | dark | `#8BD3A6` |

The picker should show preview cards, a clear selected state, and `나중에`/`다음` actions. Store `themeId`, `ribbonCollapsed`, and `doNotMimicExcel` separately so a theme can change without changing data or navigation. Persist settings in the product's normal preference store; `localStorage` is acceptable for a dependency-free prototype.

Theme acceptance checks:

- Switching themes updates shell chrome, controls, tables, selected cells, chart accents, and status surfaces together.
- Reloading preserves the selected theme and onboarding choices.
- The selected theme does not mutate values, formulas, filters, active view, or selected cell.
- Dark themes meet readable contrast for text, borders, focus rings, and validation messages.
- A user can reopen the picker from settings after dismissing onboarding.

## Shell state matrix

For each reusable shell component, define at least: default, hover, focus-visible, active/selected, pressed, disabled, loading, stale, warning, and error. For editable grid cells also define: empty, input, formula/read-only, selected, invalid, and unavailable. The selected cell must remain visible after theme changes, refresh, and panel collapse.

## Component acceptance checks

### Workbook shell

- Title, save/refresh state, search, and settings are visible without competing with the main data.
- Commands are grouped by task and have labels/tooltips.

### Grid/table

- Column headers remain visible while scrolling.
- Row identity and selection remain stable after sort/filter/refresh.
- Numeric columns are right-aligned and formatted by type.
- Paste handles rectangular data and reports cell-level validation errors.

### Formula surface

- Selected cell label and raw/formatted value are visible.
- Formula or calculation details can be inspected.
- Calculated cells cannot be overwritten accidentally.

### Charts

- Every chart is linked to a source table or helper range.
- Title and units are plain and visible.
- Series colors are consistent across table and chart.
- Market up/down colors are not reused as generic category colors.

### Responsive behavior

- Preserve the primary input/table surface first.
- Collapse or dock secondary panels instead of overlaying them on editable cells.
- Keep keyboard focus visible after panel changes.

### Application shell

- Title bar, ribbon, formula bar, dashboard tabs, workspace, worksheet tabs, and status bar are visually distinguishable.
- Application, dashboard, and worksheet navigation do not share ambiguous active styling.
- Ribbon collapse does not remove access to the active dashboard or worksheet.
- Notice and status bars do not cover editable rows or keyboard focus.
- Secondary panes can dock or collapse on narrow screens while the main input/table remains usable.

### Theme picker

- Six baseline themes can be previewed and selected.
- First-run actions and settings re-entry work without data reset.
- Theme persistence survives reload and applies to every shell region.
