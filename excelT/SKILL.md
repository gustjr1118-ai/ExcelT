---
name: excel-t
description: Apply an MS Excel-like visual and interaction system to new or existing web dashboards, including spreadsheet-style numeric input, cell navigation, formula visibility, table workflows, filters, charts, and ExcelKospi-inspired theming. Use for Excel-inspired dashboard transformation or new dashboard construction; do not use for ordinary marketing pages.
metadata:
  short-description: Build dashboards that feel like Excel
---

# ExcelT

Use this skill when the user wants a web dashboard to feel familiar to an Excel user or wants a new dashboard built with Excel-like interaction patterns. This includes both the workbook interaction model and the surrounding application shell: title bar, ribbon, formula surface, dashboard tabs, sheet tabs, status bar, and theme onboarding.

The success criterion is not visual imitation alone. The dashboard must preserve the user's spreadsheet mental model: values are entered into visible cells, calculated values are distinguishable from inputs, keyboard movement is predictable, formulas or calculation logic are inspectable, and tables can be sorted, filtered, copied, and extended without losing numeric meaning.

## Modes

Choose one mode before implementation:

- **Transform**: inspect an existing web dashboard, map its current panels and data flows into Excel-like regions, then preserve existing business logic while changing the interaction model.
- **Build**: design a new dashboard from the user's data and workflow using the ExcelT shell, input/calculation/output separation, and the default grid system.
- **Theme-only**: apply the ExcelT visual tokens and component states without rebuilding the data workflow. Use only when the user explicitly asks for styling only.

If the request is ambiguous, default to Transform for an existing dashboard and Build for a new dashboard.

When the user references an Excel screenshot, distinguish between the **workbook layer** (cells, tables, formulas, charts) and the **application shell layer** (top bar, ribbon, navigation, footer, theme selector). A workbook file such as `.xlsx` can model the workbook layer, but a web dashboard must implement the shell layer separately with HTML/CSS/JS or the host framework.

## Non-negotiable UX rules

1. **Numbers remain numbers.** Store and transport numeric values as numbers, not display strings. Keep raw value, formatted value, and calculation result separate.
2. **Input vs calculation is visible.** Use a stable visual distinction for editable cells, same-view formulas, linked values, warnings, and unavailable values. Never make a calculated value look like an editable input.
3. **Keyboard-first navigation.** Support Enter, Tab, Shift+Tab, Arrow keys, Escape, Delete/Backspace, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+Z, and Ctrl/Cmd+Y where the target environment permits them. Do not trap focus inside decorative cards.
4. **Selected cell is obvious.** Show an active-cell border, row/column context, and a name-box or equivalent address/label. The selection must survive data refresh unless the selected record was removed.
5. **Formula logic is inspectable.** Provide a formula bar, calculation details drawer, or an explicit “show calculation” affordance. Do not hide important business rules inside opaque chart tooltips or backend-only transformations.
6. **Tables behave like tables.** Headers, filters, sorting, row insertion, copy/paste, column resizing, and empty states must be predictable. Do not replace a data table with a grid of unrelated KPI cards when the user needs to enter or compare records.
7. **Display formatting never changes meaning.** Currency, percent, date, unit, and negative-value formats are presentation rules. Keep the underlying value and unit explicit.
8. **Refresh states are honest.** Show last updated time, loading state, stale state, unavailable data, and failed calculation separately. Do not turn missing or failed values into zero.

## Excel-like screen anatomy

Use the smallest set of regions that serves the workflow:

1. **Workbook shell**: title, file/workbook name, save/refresh status, search, settings.
2. **Command surface**: compact ribbon or command bar with grouped actions. Use labels and tooltips; do not rely on icons alone.
3. **Formula/name surface**: selected-cell label, formula/value display, unit, and validation status.
4. **Primary workspace**: table or grid with clear row/column structure. Keep the main data-entry view left-aligned and dense.
5. **Analysis area**: charts and summary outputs linked to the same source data. Place analysis beside or above the table it explains.
6. **Sheet/view navigation**: tabs for distinct reader workflows, not one tab per component. Preserve active tab state.
7. **Status surface**: row count, filter state, selected aggregate, refresh time, and warnings.

For a screenshot-level Excel experience, use the expanded shell below. Do not collapse all navigation into one generic tab strip:

1. **Application title bar**: product mark, autosave/save state, undo/redo, workbook name, search, settings, notifications, account, and window actions where the host supports them.
2. **Ribbon navigation**: top-level commands such as File, Home, Insert, Data, Formulas, Review, and View. The active command tab must be visually obvious.
3. **Ribbon command area**: grouped commands, separators, labels/tooltips, disabled/pressed/hover states, and a collapse/expand control.
4. **Formula/name surface**: name box, formula/value field, unit, and validation state.
5. **Dashboard navigation**: product-level views such as market, news, chat, bulletin board, or portfolio. This is separate from worksheet tabs.
6. **Workbook workspace**: the primary grid plus linked analysis panes. Secondary panels may dock or collapse, but must not cover editable cells.
7. **Notice bar**: optional service notice or announcement row above worksheet navigation.
8. **Worksheet navigation**: sheet arrows, add-sheet control, active worksheet tab, and overflow behavior.
9. **Status bar**: refresh time, row/record count, filter state, warnings, connection/user state, zoom, view mode, and mobile/app actions when relevant.

The shell is a reusable template layer. Keep its semantic regions stable while allowing dashboard-specific data panels inside the workspace.

## Application shell and theme system

When the user asks for the Excel application look, read [`references/excelT-design-system.md`](references/excelT-design-system.md) and implement these contracts:

- Build the shell as a stack of semantic regions, not one large decorative header.
- Separate application navigation, dashboard navigation, and worksheet navigation. Each has its own active state and keyboard/focus behavior.
- Use a theme object to drive title bar, ribbon, surfaces, text, selection, grid, market direction, density, and control states. Do not hard-code a new color in an individual component.
- Provide the six baseline themes when a theme picker is requested: M365 gray, Google blue, Excel green, Excel white, dark gray, and black. Excel green is the default unless the user specifies otherwise.
- The first-run theme picker must support preview, selected-card state, “later”, “next”, persistence, and re-entry from settings. Optional onboarding preferences such as collapsed ribbon and “do not mimic Excel” must be stored separately from the color theme.
- Theme changes are visual-only: preserve cell values, formulas, filters, selected view, and user inputs.
- Every shell control needs default, hover, focus, pressed/active, disabled, loading, stale, and error states where applicable.
- On smaller screens, preserve the primary input/table surface first; collapse ribbon groups and dock or collapse secondary panes before reducing editable content below usable width.

If only the workbook is requested, do not invent an application shell. If a web dashboard is being transformed or built, prefer the shell template when the reference includes top or bottom Excel chrome.

For a compact dashboard, combine regions rather than adding decorative panels. A good default is a 12-column layout with a title row, input/control row, KPI strip, main table, and one or two linked charts.

## ExcelKospi theme tokens

Read [`references/excelT-design-system.md`](references/excelT-design-system.md) for the complete token table and component states. Default brand and structural tokens:

- Brand green: `#107C41`
- Dark green: `#185C37`
- Selection green: `#217346`
- Text: `#252423`
- Muted text: `#605E5C`
- Panel: `#FFFFFF`
- Section/header fill: `#F3F6F4`
- Grid/border: `#DCDEDD`
- Hover: `#F2F8F4`
- Korean-market up: `#A34D4D`
- Korean-market down: `#3F6F9F`

Use Excel green for product identity, not for every positive value. Use the muted red/blue pair for Korean-market directionality. Use neutral or palette colors for ordinary chart series.

## Interaction contract

When implementing a spreadsheet-like input surface, define these behaviors before coding:

- **Click** selects a cell; a second click or F2-like action enters edit mode.
- **Enter** commits the value and moves down; **Tab** commits and moves right. If the product has another convention, document it and apply it consistently.
- **Escape** cancels the current edit and restores the last committed value.
- **Paste** parses tabular clipboard data into the selected range and validates each cell.
- **Delete/Backspace** clears values only after the user has a selected range; do not delete the row accidentally.
- **Copy** preserves raw numeric values and supported formulas, not only rendered text.
- **Sort/filter** keeps row-level identifiers and selection state stable.
- **Validation** appears at the cell and form level with a specific message, such as `필수 입력: 기준일` or `숫자 입력 필요`.
- **Calculated cells** are read-only by default and expose their source/formula on request.
- **Refresh** preserves user-entered inputs, selected view, and filters unless the refreshed dataset invalidates them.

## Implementation workflow

1. Identify the user's role, primary decision, input fields, calculations, outputs, data refresh boundary, and target environment.
2. Inspect the existing dashboard or reference site. Record layout regions, density, input affordances, table behaviors, states, and formulas/calculation responsibilities.
3. Produce a field map: `field → type → editable? → unit → source → calculation → display format → validation → dependency`.
4. Define the interaction contract above. Resolve ambiguous keyboard, paste, sorting, refresh, and missing-data behaviors before building.
5. Build the shell and grid first. Apply the token system to states, spacing, borders, typography, tables, controls, and charts.
6. Implement inputs and calculations with typed values and explicit intermediate steps. Keep business rules in one owning layer and link summaries to it.
7. Add tables, filters, charts, and navigation. Ensure every visual output is traceable to a source range or calculation.
8. Test representative input edits, blank vs zero, invalid numeric input, pasted ranges, filters, refresh, missing data, formula errors, and keyboard navigation.
9. Compare the result against the reference at normal zoom. Fix clipped values, weak selection states, excessive cards, hidden logic, inconsistent number formats, and misleading success states.
10. If an Excel application screenshot is part of the reference, verify shell regions independently: top bar, ribbon, formula surface, dashboard tabs, workspace panes, notice bar, worksheet tabs, and status bar.

## Definition of done

- A returning Excel user can identify where to type, what is calculated, and how to move through the data without instructions.
- Numeric input, copy/paste, filters, sorting, and refresh do not silently convert values to text or zero.
- The active cell/range, formula/value surface, input styles, warning states, and selected view are visible and consistent.
- The main table and charts share one source of truth and update together.
- The visual hierarchy uses Excel-like density, thin borders, restrained fills, and the ExcelT tokens.
- If shell mode is requested, top and bottom chrome, tab hierarchy, theme picker behavior, and ribbon collapse behavior are implemented and persist across reloads.
- The implementation includes a short user-facing note for any behavior that differs from desktop Excel.

## Supporting reference

- Read [`references/excelT-design-system.md`](references/excelT-design-system.md) for theme tokens, layout dimensions, semantic color rules, and component acceptance checks.
- For a reusable web shell example, start from [`assets/excelT-shell/index.html`](assets/excelT-shell/index.html). It is dependency-free and demonstrates the shell and theme contracts in one file.
- If producing an `.xlsx` example or modifying a workbook, also use the `Spreadsheets` skill and verify formulas, rendering, and export.
