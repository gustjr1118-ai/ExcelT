import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/Users/ghs11/OneDrive/문서/ChatGPT/배포형 에이전트 만들기/outputs/excelT-example";
const brand = "#107C41";
const brandDark = "#185C37";
const selection = "#217346";
const text = "#252423";
const muted = "#605E5C";
const panel = "#FFFFFF";
const section = "#F3F6F4";
const soft = "#F8F8F8";
const grid = "#DCDEDD";
const separator = "#E1DFDD";
const up = "#A34D4D";
const down = "#3F6F9F";
const link = "#3567B3";
const warning = "#B08A28";
const error = "#C00000";
const font = "Aptos";

await fs.mkdir(outputDir, { recursive: true });
const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const raw = workbook.worksheets.add("원본데이터");
const settings = workbook.worksheets.add("설정");
const guide = workbook.worksheets.add("사용안내");

for (const sheet of [dashboard, raw, settings, guide]) {
  sheet.showGridLines = false;
  sheet.getRange("A1:N60").format.font = { name: font, size: 11, color: text };
  sheet.getRange("A1:N60").format.verticalAlignment = "center";
}

// Settings and design tokens.
settings.tabColor = brandDark;
settings.getRange("A1:D12").values = [
  ["설정", "값", "설명", "입력 방식"],
  ["시장 선택", "KOSPI", "대시보드 KPI와 선택 상태 기준", "목록 선택"],
  ["KOSPI", "KOSPI", "국내 대표 지수", "목록"],
  ["KOSDAQ", "KOSDAQ", "코스닥 지수", "목록"],
  ["기준일", new Date("2026-09-18T00:00:00"), "표시용 기준일", "날짜"],
  ["갱신 주기", "수동", "새 데이터 반영 방식", "상태"],
  ["", "", "", ""],
  ["토큰", "색상", "사용처", "상태"],
  ["Brand green", brand, "제목 밴드와 주요 액션", "브랜드"],
  ["Up", up, "한국 시장 상승", "의미색"],
  ["Down", down, "한국 시장 하락", "의미색"],
  ["Grid", grid, "얇은 구조 선", "구조"]
];
settings.getRange("A1:D1").format = { fill: brand, font: { name: font, size: 11, bold: true, color: panel } };
settings.getRange("A8:D8").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
settings.getRange("B5").format.numberFormat = "yyyy-mm-dd";
settings.getRange("B9:B12").format.font = { name: font, size: 11, color: text };
settings.getRange("B9").format.fill = brand;
settings.getRange("B9").format.font = { name: font, size: 11, color: panel, bold: true };
settings.getRange("B10").format.fill = up;
settings.getRange("B10").format.font = { name: font, size: 11, color: panel, bold: true };
settings.getRange("B11").format.fill = down;
settings.getRange("B11").format.font = { name: font, size: 11, color: panel, bold: true };
settings.getRange("B12").format.fill = grid;
settings.getRange("A1:D12").format.borders = { preset: "all", style: "thin", color: grid };
settings.getRange("A1:D12").format.autofitColumns();
settings.getRange("A1:D12").format.autofitRows();

// Raw input and calculation layer. Blue values are editable; black cells are formulas.
raw.tabColor = link;
raw.getRange("A1:J8").values = [
  ["종목/지수", "유형", "현재가", "전일 종가", "등락", "등락률", "거래량", "외인 순매수(억원)", "기관 순매수(억원)", "상태"],
  ["KOSPI", "지수", 6871.01, 6715.24, null, null, 0, 695, 2422, "정상"],
  ["KOSDAQ", "지수", 830.43, 822.21, null, null, 0, 134, 10, "정상"],
  ["삼성전자", "주식", 260000, 252500, null, null, 2180000, 0, 0, "정상"],
  ["SK하이닉스", "주식", 1826000, 1745000, null, null, 500000, 0, 0, "정상"],
  ["LG전자", "주식", 199400, 197900, null, null, 61000, 0, 0, "정상"],
  ["현대차", "주식", 368500, 363000, null, null, 55000, 0, 0, "정상"],
  ["TIGER 200IT레버리지", "ETF", 323615, 302880, null, null, 24000, 0, 0, "정상"]
];
raw.getRange("E2").formulas = [["=C2-D2"]];
raw.getRange("E2:E8").fillDown();
raw.getRange("F2").formulas = [["=IF(D2=0,\"n.a.\",E2/D2)"]];
raw.getRange("F2:F8").fillDown();
raw.getRange("A1:J1").format = { fill: brand, font: { name: font, size: 11, bold: true, color: panel } };
raw.getRange("A2:D8").format.font = { name: font, size: 11, color: link };
raw.getRange("G2:J8").format.font = { name: font, size: 11, color: link };
raw.getRange("E2:F8").format.font = { name: font, size: 11, color: text };
raw.getRange("C2:E8").format.numberFormat = "#,##0.00";
raw.getRange("F2:F8").format.numberFormat = "0.00%";
raw.getRange("G2:G8").format.numberFormat = "#,##0";
raw.getRange("H2:I8").format.numberFormat = "#,##0";
raw.getRange("A1:J8").format.borders = { preset: "all", style: "thin", color: grid };
raw.getRange("E2:E8").conditionalFormats.add("cellIs", { operator: "greaterThan", formula: 0, format: { font: { color: up, bold: true }, fill: "#F5E9E9" } });
raw.getRange("E2:E8").conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { font: { color: down, bold: true }, fill: "#E8EEF7" } });
raw.getRange("F2:F8").conditionalFormats.add("cellIs", { operator: "greaterThan", formula: 0, format: { font: { color: up, bold: true }, fill: "#F5E9E9" } });
raw.getRange("F2:F8").conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { font: { color: down, bold: true }, fill: "#E8EEF7" } });
raw.tables.add("A1:J8", true, "tblMarket");
raw.getRange("K1:M7").values = [
  ["기준일", "KOSPI", "KOSDAQ"],
  [new Date("2026-09-14T00:00:00"), 6625.81, 815.31],
  [new Date("2026-09-15T00:00:00"), 6680.32, 820.10],
  [new Date("2026-09-16T00:00:00"), 6702.42, 824.55],
  [new Date("2026-09-17T00:00:00"), 6715.24, 822.21],
  [new Date("2026-09-18T00:00:00"), 6871.01, 830.43],
  ["", "", ""]
];
raw.getRange("K1:M1").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
raw.getRange("K2:K6").format.numberFormat = "yyyy-mm-dd";
raw.getRange("L2:M6").format.numberFormat = "#,##0.00";
raw.getRange("K1:M6").format.borders = { preset: "all", style: "thin", color: grid };
raw.getRange("A1:M8").format.autofitColumns();
raw.freezePanes.freezeRows(1);

// Dashboard output and interaction cues.
dashboard.tabColor = brand;
dashboard.getRange("A1:N2").merge();
dashboard.getRange("A1").values = [["시장 브리핑"]];
dashboard.getRange("A1:N2").format = { fill: brand, font: { name: font, size: 18, bold: true, color: panel } };
dashboard.getRange("A1:N2").format.horizontalAlignment = "left";
dashboard.getRange("A3:N3").merge();
dashboard.getRange("A3").values = [["ExcelT 예시 · 숫자 입력과 계산 흐름을 먼저 이해하는 시장 대시보드"]];
dashboard.getRange("A3:N3").format = { fill: soft, font: { name: font, size: 10, color: muted } };

dashboard.getRange("A5:N5").values = [["기준일", null, "시장 선택", null, "입력 안내", "파란 글자는 입력값", "갱신 상태", "수동", "", "", "", "", "", ""]];
dashboard.getRange("A5:N5").format = { fill: section, font: { name: font, size: 10, color: text } };
dashboard.getRange("B5").values = [[new Date("2026-09-18T00:00:00")]];
dashboard.getRange("D5").values = [["KOSPI"]];
dashboard.getRange("B5").format.numberFormat = "yyyy-mm-dd";
dashboard.getRange("B5").format.fill = "#FFF2CC";
dashboard.getRange("D5").format.fill = "#FFF2CC";
dashboard.getRange("B5:D5").format.borders = { preset: "outside", style: "thin", color: selection };
dashboard.getRange("D5").dataValidation = { rule: { type: "list", formula1: "설정!$A$3:$A$4" } };

const kpiBlocks = [
  { range: "A7:C9", label: "선택 지수", formula: "=$D$5", fmt: "@" },
  { range: "D7:F9", label: "현재가", formula: "=IF($D$5=\"KOSPI\",'원본데이터'!$C$2,'원본데이터'!$C$3)", fmt: "#,##0.00" },
  { range: "G7:I9", label: "일간 변동률", formula: "=IF($D$5=\"KOSPI\",'원본데이터'!$F$2,'원본데이터'!$F$3)", fmt: "0.00%" },
  { range: "J7:L9", label: "외인 순매수", formula: "=IF($D$5=\"KOSPI\",'원본데이터'!$H$2,'원본데이터'!$H$3)", fmt: "#,##0\"억\"" }
];
for (const block of kpiBlocks) {
  const top = block.range.split(":")[0];
  const [start, end] = block.range.split(":");
  const labelRange = `${start}:${end.replace(/\d+$/, "7")}`;
  const valueRange = `${start.replace(/\d+$/, "8")}:${end.replace(/\d+$/, "9")}`;
  dashboard.getRange(labelRange).merge();
  dashboard.getRange(valueRange).merge();
  dashboard.getRange(labelRange).values = [[block.label]];
  dashboard.getRange(valueRange).formulas = [[block.formula]];
  dashboard.getRange(labelRange).format = { fill: section, font: { name: font, size: 10, bold: true, color: muted } };
  dashboard.getRange(valueRange).format = { fill: panel, font: { name: font, size: 20, bold: true, color: text } };
  dashboard.getRange(labelRange).format.borders = { preset: "outside", style: "thin", color: grid };
  dashboard.getRange(valueRange).format.borders = { preset: "outside", style: "thin", color: grid };
  dashboard.getRange(valueRange).format.numberFormat = block.fmt;
}
dashboard.getRange("G8:I9").conditionalFormats.add("cellIs", { operator: "greaterThan", formula: 0, format: { font: { color: up, bold: true }, fill: "#F5E9E9" } });
dashboard.getRange("G8:I9").conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { font: { color: down, bold: true }, fill: "#E8EEF7" } });

dashboard.getRange("A11:G11").merge();
dashboard.getRange("A11").values = [["시장 현황"]];
dashboard.getRange("A11:G11").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
dashboard.getRange("A12:G19").values = [
  ["종목/지수", "유형", "현재가", "전일 종가", "등락", "등락률", "상태"],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
];
for (let row = 13; row <= 19; row++) {
  const sourceRow = row - 11;
  dashboard.getRange(`A${row}:G${row}`).formulas = [[
    `='원본데이터'!A${sourceRow}`,
    `='원본데이터'!B${sourceRow}`,
    `='원본데이터'!C${sourceRow}`,
    `='원본데이터'!D${sourceRow}`,
    `='원본데이터'!E${sourceRow}`,
    `='원본데이터'!F${sourceRow}`,
    `='원본데이터'!J${sourceRow}`
  ]];
}
dashboard.getRange("A12:G12").format = { fill: brand, font: { name: font, size: 10, bold: true, color: panel } };
dashboard.getRange("A13:G19").format = { fill: panel, font: { name: font, size: 10, color: text } };
dashboard.getRange("A13:B19").format.font = { name: font, size: 10, color: link };
dashboard.getRange("C13:E19").format.numberFormat = "#,##0.00";
dashboard.getRange("F13:F19").format.numberFormat = "0.00%";
dashboard.getRange("A12:G19").format.borders = { preset: "all", style: "thin", color: grid };
dashboard.getRange("E13:F19").conditionalFormats.add("cellIs", { operator: "greaterThan", formula: 0, format: { font: { color: up, bold: true }, fill: "#F5E9E9" } });
dashboard.getRange("E13:F19").conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { font: { color: down, bold: true }, fill: "#E8EEF7" } });
dashboard.tables.add("A12:G19", true, "tblDashboardMarket");

dashboard.getRange("I11:N11").merge();
dashboard.getRange("I11").values = [["지수 흐름"]];
dashboard.getRange("I11:N11").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
dashboard.getRange("P2:R7").formulas = [
  ["=\"기준일\"", "='원본데이터'!L1", "='원본데이터'!M1"],
  ["=TEXT('원본데이터'!K2,\"mm-dd\")", "='원본데이터'!L2", "='원본데이터'!M2"],
  ["=TEXT('원본데이터'!K3,\"mm-dd\")", "='원본데이터'!L3", "='원본데이터'!M3"],
  ["=TEXT('원본데이터'!K4,\"mm-dd\")", "='원본데이터'!L4", "='원본데이터'!M4"],
  ["=TEXT('원본데이터'!K5,\"mm-dd\")", "='원본데이터'!L5", "='원본데이터'!M5"],
  ["=TEXT('원본데이터'!K6,\"mm-dd\")", "='원본데이터'!L6", "='원본데이터'!M6"]
];
dashboard.getRange("Q3:R7").format.numberFormat = "#,##0.00";
const chart = dashboard.charts.add("line", dashboard.getRange("P2:R7"));
chart.title = "최근 5거래일 지수 흐름";
chart.titleTextStyle.typeface = font;
chart.titleTextStyle.fontSize = 12;
chart.legend = { position: "top", textStyle: { typeface: font, fontSize: 10 } };
chart.xAxis = { axisType: "textAxis", textStyle: { typeface: font, fontSize: 9 } };
chart.yAxis = { numberFormatCode: "#,##0", numberFormatSourceLinked: false, textStyle: { typeface: font, fontSize: 9 } };
chart.setPosition("I12", "N25");
chart.series.items[0].line = { fill: brand, style: "solid", width: 2 };
chart.series.items[1].line = { fill: link, style: "solid", width: 2 };

dashboard.getRange("A21:N21").merge();
dashboard.getRange("A21").values = [["뉴스와 입력 흐름"]];
dashboard.getRange("A21:N21").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
dashboard.getRange("A22:D27").values = [
  ["시각", "분류", "헤드라인", "확인"],
  ["09:29", "시장", "코스피, 장 초반 2%대 반등", "읽음"],
  ["09:26", "반도체", "삼성전자와 SK하이닉스 동반 강세", "읽음"],
  ["09:24", "외국인", "국내 주식 외국인 순매매 추이", "확인"],
  ["09:17", "ETF", "커버드콜 ETF 수급 점검", "확인"],
  ["09:02", "시장", "코스피 6800선 회복 출발", "읽음"]
];
dashboard.getRange("A22:D22").format = { fill: brand, font: { name: font, size: 10, bold: true, color: panel } };
dashboard.getRange("A23:D27").format = { fill: panel, font: { name: font, size: 10, color: text } };
dashboard.getRange("A22:D27").format.borders = { preset: "all", style: "thin", color: grid };
dashboard.getRange("E22:N27").merge();
dashboard.getRange("E22").values = [["입력 흐름\n1. 노란 셀에서 기준일과 시장을 입력합니다.\n2. Enter 또는 Tab으로 다음 입력으로 이동합니다.\n3. 흰색 결과 셀은 원본데이터 계산식에서 연결됩니다.\n4. 상승/하락 색은 한국 시장 방향성에만 사용합니다."]];
dashboard.getRange("E22:N27").format = { fill: soft, font: { name: font, size: 10, color: muted }, wrapText: true };
dashboard.getRange("E22:N27").format.borders = { preset: "outside", style: "thin", color: grid };
dashboard.getRange("A29:N29").merge();
dashboard.getRange("A29").values = [["상태: 정상 · 데이터 기준일 2026-09-18 · 원본데이터 시트의 파란 글자 값을 수정하면 대시보드 계산 결과가 함께 변경됩니다."]];
dashboard.getRange("A29:N29").format = { fill: soft, font: { name: font, size: 9, color: muted } };

dashboard.getRange("A1:N29").format.autofitRows();
dashboard.getRange("A1:N29").format.verticalAlignment = "center";
dashboard.getRange("A1:N29").format.columnWidth = 13;
dashboard.getRange("A1").format.columnWidth = 18;
dashboard.getRange("C1").format.columnWidth = 15;
dashboard.getRange("D1").format.columnWidth = 15;
dashboard.getRange("E1").format.columnWidth = 18;
dashboard.getRange("F1").format.columnWidth = 15;
dashboard.getRange("G1").format.columnWidth = 14;
dashboard.getRange("H1").format.columnWidth = 14;
dashboard.getRange("I1").format.columnWidth = 14;
dashboard.getRange("J1").format.columnWidth = 14;
dashboard.getRange("K1").format.columnWidth = 14;
dashboard.getRange("L1").format.columnWidth = 14;
dashboard.getRange("M1").format.columnWidth = 14;
dashboard.getRange("N1").format.columnWidth = 14;

// User guide: keep the interaction model visible in the example.
guide.tabColor = warning;
guide.getRange("A1:H1").merge();
guide.getRange("A1").values = [["ExcelT 사용 안내"]];
guide.getRange("A1:H1").format = { fill: brand, font: { name: font, size: 16, bold: true, color: panel } };
guide.getRange("A3:D10").values = [
  ["구분", "표현", "의미", "사용자 행동"],
  ["입력값", "파란 글자 / 노란 셀", "사용자가 입력하거나 바꾸는 값", "클릭, 입력, 붙여넣기"],
  ["계산값", "검정 글자 / 흰 셀", "수식으로 계산된 결과", "읽기, 계산식 확인"],
  ["연결값", "초록 계열", "다른 시트 또는 원본에서 연결", "원본으로 이동"],
  ["상승", "Muted red", "한국 주식시장 상승", "조건부 서식으로 확인"],
  ["하락", "Muted blue", "한국 주식시장 하락", "조건부 서식으로 확인"],
  ["오류", "빨간 글자", "수정이 필요한 입력 또는 계산", "구체적인 오류 메시지 확인"],
  ["없음", "n.a. / 빈칸", "값이 없거나 적용되지 않음", "0으로 오해하지 않기"]
];
guide.getRange("A3:D3").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
guide.getRange("A4:D10").format = { fill: panel, font: { name: font, size: 10, color: text }, wrapText: true };
guide.getRange("A3:D10").format.borders = { preset: "all", style: "thin", color: grid };
guide.getRange("A4").format.font = { name: font, size: 10, color: link, bold: true };
guide.getRange("A7").format.font = { name: font, size: 10, color: up, bold: true };
guide.getRange("A8").format.font = { name: font, size: 10, color: down, bold: true };
guide.getRange("A9").format.font = { name: font, size: 10, color: error, bold: true };
guide.getRange("A12:D19").values = [
  ["키보드", "동작", "기대 결과", "비고"],
  ["Enter", "입력 확정", "다음 행으로 이동", "웹 구현 시 동일하게 유지"],
  ["Tab", "입력 확정", "다음 열로 이동", "Shift+Tab은 반대 방향"],
  ["Esc", "입력 취소", "직전 값 복원", "미확정 입력은 저장하지 않음"],
  ["Ctrl/Cmd+C", "복사", "원본 값과 수식 보존", "렌더링 문자열만 복사하지 않음"],
  ["Ctrl/Cmd+V", "붙여넣기", "직사각형 범위 입력", "셀 단위 오류 표시"],
  ["Delete", "값 지우기", "선택 범위의 값만 삭제", "행 삭제와 분리"],
  ["Ctrl/Cmd+Z", "실행 취소", "직전 입력/서식 되돌리기", "가능한 경우"]
];
guide.getRange("A12:D12").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
guide.getRange("A13:D19").format = { fill: panel, font: { name: font, size: 10, color: text }, wrapText: true };
guide.getRange("A12:D19").format.borders = { preset: "all", style: "thin", color: grid };
guide.getRange("F3:H12").values = [
  ["테마 토큰", "값", "주요 용도"],
  ["Brand", brand, "제목/주요 액션"],
  ["Brand dark", brandDark, "강조"],
  ["Selection", selection, "활성 셀/범위"],
  ["Text", text, "본문"],
  ["Section", section, "헤더"],
  ["Grid", grid, "선"],
  ["Up", up, "상승"],
  ["Down", down, "하락"],
  ["Link", link, "연결/보조색"]
];
guide.getRange("F3:H3").format = { fill: section, font: { name: font, size: 11, bold: true, color: text } };
guide.getRange("F4:H12").format = { fill: panel, font: { name: font, size: 10, color: text } };
guide.getRange("F3:H12").format.borders = { preset: "all", style: "thin", color: grid };
guide.getRange("G4").format.fill = brand;
guide.getRange("G4").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("G5").format.fill = brandDark;
guide.getRange("G5").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("G6").format.fill = selection;
guide.getRange("G6").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("G7").format.fill = text;
guide.getRange("G7").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("G8").format.fill = section;
guide.getRange("G9").format.fill = grid;
guide.getRange("G10").format.fill = up;
guide.getRange("G10").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("G11").format.fill = down;
guide.getRange("G11").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("G12").format.fill = link;
guide.getRange("G12").format.font = { name: font, size: 10, color: panel, bold: true };
guide.getRange("A1:H20").format.autofitColumns();
guide.getRange("A1:H20").format.autofitRows();

workbook.recalculate();

const dashboardCheck = await workbook.inspect({
  kind: "table",
  range: "Dashboard!A1:N29",
  include: "values,formulas",
  tableMaxRows: 29,
  tableMaxCols: 14,
  maxChars: 10000,
});
console.log(dashboardCheck.ndjson);
const errorCheck = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 100 },
  summary: "ExcelT example formula error scan",
});
console.log(errorCheck.ndjson);

const preview = await workbook.render({ sheetName: "Dashboard", range: "A1:N29", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/ExcelT_예시_대시보드.png`, new Uint8Array(await preview.arrayBuffer()));
const guidePreview = await workbook.render({ sheetName: "사용안내", range: "A1:H20", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/ExcelT_사용안내.png`, new Uint8Array(await guidePreview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/ExcelT_예시_대시보드.xlsx`);
console.log(`EXPORTED ${outputDir}/ExcelT_예시_대시보드.xlsx`);
