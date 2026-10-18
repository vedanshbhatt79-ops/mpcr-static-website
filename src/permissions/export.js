import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import html2pdf from "html2pdf.js";
import { letterToBlocks } from "./templates";

const WORD_FONT_EN = "Times New Roman";
const WORD_FONT_MR = "Nirmala UI";
const HTML_FONT_EN = '"Times New Roman", Times, serif';
const HTML_FONT_MR =
  '"Noto Sans Devanagari", "Nirmala UI", "Mangal", sans-serif';
const BODY_SIZE = 12;

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

const DOCX_ALIGN = {
  left: AlignmentType.LEFT,
  center: AlignmentType.CENTER,
  right: AlignmentType.RIGHT,
  justify: AlignmentType.JUSTIFIED,
};

const DOCX_SPACING = {
  letterhead: 60,
  date: 240,
  to: 40,
  subject: 240,
  salutation: 160,
  paragraph: 160,
  fromto: 160,
  closing: 120,
  signature: 240,
};

function blockToParagraph(block, lang) {
  const isMr = lang === "mr";

  if (block.type === "rule") {
    return new Paragraph({
      spacing: { after: 120 },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    });
  }

  const size = (block.size || BODY_SIZE) * 2;

  return new Paragraph({
    alignment: DOCX_ALIGN[block.align] || AlignmentType.LEFT,
    spacing: { after: DOCX_SPACING[block.type] ?? 160 },
    children: block.runs.map((run) => {
      const options = { text: run.text, bold: run.bold, size };
      if (isMr) {
        options.font = WORD_FONT_MR;
        options.sizeComplexScript = size;
        options.boldComplexScript = run.bold;
        options.language = { value: "mr-IN" };
      } else {
        options.font = WORD_FONT_EN;
      }
      return new TextRun(options);
    }),
  });
}

export async function downloadWord(letter, filename) {
  const lang = letter.lang || "en";
  const blocks = letterToBlocks(letter);
  const doc = new Document({
    sections: [
      {
        properties: {
          page: { margin: { top: 720, right: 1440, bottom: 1440, left: 1440 } },
        },
        children: blocks.map((block) => blockToParagraph(block, lang)),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, filename);
}

const HTML_SPACING = {
  letterhead: "0 0 2pt",
  date: "0 0 14pt",
  to: "0",
  subject: "10pt 0",
  salutation: "0 0 8pt",
  paragraph: "0 0 8pt",
  fromto: "0 0 8pt",
  closing: "0",
  signature: "12pt 0 0",
};

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function runsToHtml(runs) {
  return runs
    .map((run) =>
      run.bold
        ? `<strong>${escapeHtml(run.text)}</strong>`
        : escapeHtml(run.text),
    )
    .join("");
}

function blockToHtml(block) {
  if (block.type === "rule") {
    return '<hr style="border:0;border-top:1px solid #000;margin:6px 0 12px;" />';
  }
  const fontSize = block.size === 14 ? "14pt" : "12pt";
  const margin = HTML_SPACING[block.type] || "0 0 8pt";
  return `<p style="margin:${margin};text-align:${block.align || "left"};font-size:${fontSize};page-break-inside:avoid;">${runsToHtml(block.runs)}</p>`;
}

export async function downloadPdf(letter, filename) {
  const lang = letter.lang || "en";
  const isMr = lang === "mr";
  const blocks = letterToBlocks(letter);

  // Wrapper: hidden from the user, NOT captured
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.opacity = "0";
  wrapper.style.pointerEvents = "none";
  wrapper.style.zIndex = "-1";

  // Container: this is what gets captured, plain styles only
  const container = document.createElement("div");
  container.setAttribute("lang", isMr ? "mr" : "en");
  container.style.width = "164mm";
  container.style.background = "#ffffff";
  container.style.color = "#000000";
  container.style.fontFamily = isMr ? HTML_FONT_MR : HTML_FONT_EN;
  container.style.fontSize = "12pt";
  container.style.lineHeight = isMr ? "1.6" : "1.5";
  container.innerHTML = blocks.map(blockToHtml).join("");

  wrapper.appendChild(container);
  document.body.appendChild(wrapper);

  try {
    await document.fonts.ready;
    if (isMr) {
      await Promise.all([
        document.fonts.load('400 12pt "Noto Sans Devanagari"'),
        document.fonts.load('700 12pt "Noto Sans Devanagari"'),
      ]);
    }
    await new Promise((r) => setTimeout(r, 150));

    const blob = await html2pdf()
      .set({
        margin: [20, 23, 20, 23],
        html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(container)
      .outputPdf("blob");

    saveBlob(blob, filename);
  } finally {
    wrapper.remove();
  }
}
