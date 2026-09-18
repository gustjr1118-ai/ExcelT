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
- `excelkospi_엑셀테마_템플릿_기획서.md`: analysis and template plan
- `builders/build_excelT_example.mjs`: reproducible workbook builder

The Excel example uses typed inputs, formulas, dropdown validation, conditional formatting, a linked chart, and a usage guide sheet.
