import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType, convertInchesToTwip, TableLayoutType
} from 'docx';
import { readFileSync, writeFileSync } from 'fs';

const md = readFileSync(new URL('./seo-audit.md', import.meta.url), 'utf8');
const lines = md.split('\n');

// Brand colours (as hex)
const GREEN  = '3D5A1E'; // --col-primary approximated
const CREAM  = 'F5EFD6'; // --col-base-100 approximated
const DARK   = '262318'; // --col-base-900 approximated
const GREY   = '6B6B5A'; // --col-base-600 approximated
const WHITE  = 'FFFFFF';
const CODE_BG = 'F0EDE4';

// ── Inline parser ─────────────────────────────────────────────────────────────
// Returns an array of TextRun objects from a markdown-inline string.
function parseInline(text) {
  const runs = [];
  // Strip trailing backslash-pipe escapes used in md tables
  text = text.replace(/\\[|]/g, '|');

  const re = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      runs.push(new TextRun({ text: text.slice(last, m.index), color: DARK }));
    }
    const token = m[0];
    if (token.startsWith('`')) {
      runs.push(new TextRun({
        text: token.slice(1, -1),
        font: 'Courier New',
        size: 18,
        color: GREEN,
        shading: { type: ShadingType.SOLID, color: CODE_BG, fill: CODE_BG },
      }));
    } else {
      runs.push(new TextRun({
        text: token.replace(/^\*\*|\*\*$|^__|__$/g, ''),
        bold: true,
        color: DARK,
      }));
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    runs.push(new TextRun({ text: text.slice(last), color: DARK }));
  }
  return runs.length ? runs : [new TextRun({ text, color: DARK })];
}

// ── Table builder ─────────────────────────────────────────────────────────────
function buildTable(tableLines) {
  const rows = tableLines
    .filter(l => !/^\s*\|[-| :]+\|\s*$/.test(l)) // drop separator rows
    .map(l => l.replace(/^\||\|$/g, '').split('|').map(c => c.trim()));

  if (!rows.length) return null;

  const colCount = rows[0].length;
  const colWidth = Math.floor(9000 / colCount); // twips, page width ~9000

  return new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map((cells, ri) => {
      const isHeader = ri === 0;
      return new TableRow({
        tableHeader: isHeader,
        children: cells.map(cell => new TableCell({
          shading: isHeader
            ? { type: ShadingType.SOLID, color: GREEN, fill: GREEN }
            : { type: ShadingType.SOLID, color: ri % 2 === 0 ? WHITE : CREAM, fill: ri % 2 === 0 ? WHITE : CREAM },
          width: { size: colWidth, type: WidthType.DXA },
          margins: {
            top: convertInchesToTwip(0.04),
            bottom: convertInchesToTwip(0.04),
            left: convertInchesToTwip(0.08),
            right: convertInchesToTwip(0.08),
          },
          borders: {
            top:    { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
            left:   { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
            right:  { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
          },
          children: [new Paragraph({
            children: isHeader
              ? [new TextRun({ text: cell.replace(/\*\*/g, ''), bold: true, color: WHITE, size: 18 })]
              : parseInline(cell),
            spacing: { before: 40, after: 40 },
          })],
        })),
      });
    }),
  });
}

// ── Main parse loop ───────────────────────────────────────────────────────────
const children = [];
let i = 0;

// Title block spacer
children.push(new Paragraph({ spacing: { before: 0, after: 200 } }));

while (i < lines.length) {
  const raw = lines[i];
  const line = raw.trimEnd();

  // ── Heading 1
  if (/^# /.test(line)) {
    children.push(new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { before: 0, after: 200 },
      children: [new TextRun({ text: line.replace(/^# /, ''), color: GREEN, bold: true, size: 52 })],
    }));
    i++; continue;
  }

  // ── Heading 2
  if (/^## /.test(line)) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN, space: 4 } },
      children: [new TextRun({ text: line.replace(/^## /, ''), color: GREEN, bold: true, size: 28 })],
    }));
    i++; continue;
  }

  // ── Heading 3
  if (/^### /.test(line)) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 80 },
      children: [new TextRun({ text: line.replace(/^### /, ''), color: DARK, bold: true, size: 24 })],
    }));
    i++; continue;
  }

  // ── Heading 4
  if (/^#### /.test(line)) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 240, after: 60 },
      children: [new TextRun({ text: line.replace(/^#### /, ''), color: GREY, bold: true, size: 22, italics: true })],
    }));
    i++; continue;
  }

  // ── Horizontal rule → thin spacer
  if (/^---+$/.test(line)) {
    children.push(new Paragraph({
      spacing: { before: 120, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC', space: 2 } },
      children: [],
    }));
    i++; continue;
  }

  // ── Code block
  if (/^```/.test(line)) {
    i++; // skip opening fence
    const codeLines = [];
    while (i < lines.length && !/^```/.test(lines[i])) {
      codeLines.push(lines[i]);
      i++;
    }
    i++; // skip closing fence
    codeLines.forEach(cl => {
      children.push(new Paragraph({
        spacing: { before: 0, after: 0 },
        shading: { type: ShadingType.SOLID, color: CODE_BG, fill: CODE_BG },
        indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
        children: [new TextRun({
          text: cl || ' ',
          font: 'Courier New',
          size: 16,
          color: '2D2D2D',
        })],
      }));
    });
    // small gap after code block
    children.push(new Paragraph({ spacing: { before: 80, after: 0 }, children: [] }));
    continue;
  }

  // ── Table block
  if (/^\|/.test(line)) {
    const tableLines = [];
    while (i < lines.length && /^\|/.test(lines[i].trim())) {
      tableLines.push(lines[i]);
      i++;
    }
    const tbl = buildTable(tableLines);
    if (tbl) {
      children.push(tbl);
      children.push(new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }));
    }
    continue;
  }

  // ── Bullet list item
  if (/^- /.test(line)) {
    const text = line.replace(/^- /, '');
    children.push(new Paragraph({
      bullet: { level: 0 },
      spacing: { before: 40, after: 40 },
      children: parseInline(text),
    }));
    i++; continue;
  }

  // ── Numbered list item
  if (/^\d+\. /.test(line)) {
    const text = line.replace(/^\d+\. /, '');
    children.push(new Paragraph({
      numbering: { reference: 'default-numbering', level: 0 },
      spacing: { before: 40, after: 40 },
      children: parseInline(text),
    }));
    i++; continue;
  }

  // ── Empty line
  if (line.trim() === '') {
    children.push(new Paragraph({ spacing: { before: 0, after: 80 }, children: [] }));
    i++; continue;
  }

  // ── Regular paragraph (handles **bold** inline)
  children.push(new Paragraph({
    spacing: { before: 60, after: 60 },
    children: parseInline(line),
  }));
  i++;
}

// ── Build document ────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [{
      reference: 'default-numbering',
      levels: [{
        level: 0,
        format: 'decimal',
        text: '%1.',
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 20, color: DARK },
        paragraph: { spacing: { line: 276 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top:    convertInchesToTwip(1),
          bottom: convertInchesToTwip(1),
          left:   convertInchesToTwip(1.1),
          right:  convertInchesToTwip(1.1),
        },
      },
    },
    children,
  }],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(new URL('./seo-audit.docx', import.meta.url), buffer);
console.log('✓ docs/seo-audit.docx generated');
