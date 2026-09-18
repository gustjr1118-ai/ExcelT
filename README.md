# ExcelT

ExcelT is a Codex skill for transforming existing web dashboards or building new dashboards with an MS Excel-like interaction model.

## Use

Invoke the skill with `$excelT`.

The skill focuses on:

- numeric input that remains numeric
- visible separation between inputs, calculations, linked values, and errors
- cell selection and keyboard navigation
- formula/value inspection
- table sorting, filtering, copy/paste, and refresh behavior
- ExcelKospi-inspired colors, density, borders, and chart styling

## Included files

- `excelT/SKILL.md`: skill instructions
- `excelT/references/excelT-design-system.md`: design tokens and interaction rules
- `excelT/assets/ExcelT_예시_대시보드.xlsx`: example market dashboard workbook
- `excelT/assets/excelT-shell/index.html`: dependency-free web shell example with top/bottom Excel chrome, theme picker, ribbon collapse, dashboard tabs, worksheet tabs, and a dockable chat pane
- `excelT/assets/excelT-theme-tokens.json`: shared visual tokens, shell dimensions, and six baseline themes
- `excelkospi_엑셀테마_템플릿_기획서.md`: analysis and template plan
- `builders/build_excelT_example.mjs`: reproducible workbook builder

The Excel example uses typed inputs, formulas, dropdown validation, conditional formatting, a linked chart, and a usage guide sheet.

## Web shell example

Open `excelT/assets/excelT-shell/index.html` in a browser to inspect the web dashboard template. It demonstrates the application shell separately from the `.xlsx` workbook: title bar, ribbon, formula bar, dashboard-level tabs, three-pane workspace, notice bar, worksheet tabs, status bar, and the first-run theme selector. Theme and onboarding preferences are persisted in `localStorage` in the prototype.
